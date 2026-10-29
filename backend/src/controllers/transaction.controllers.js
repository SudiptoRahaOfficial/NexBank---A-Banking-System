/**
    - file name: transaction.controllers.js
    - responsibility: responsible for all transaction related api controllers
 */

// importing dependencies
const { startSession, isObjectIdOrHexString } = require('mongoose')
const accountModel = require('../models/account.model')
const transactionModel = require('../models/transaction.model')
const ledgerModel = require('../models/ledger.model')
const {
	sendTransactionSuccessAlertEmail,
} = require('../services/email.service')

/**
    - create transaction controller
    - POST API - "/api/transactions/create-transaction"
 */
async function createTransactionController(req, res) {
	// extracting all data sent by client
	const { fromAccount, toAccount, amount, idempotencyKey } = req.body

	// validating required fields
	if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
		return res.status(400).json({
			message:
				'FromAccount, toAccount, amount & idempotencyKey are required',
			status: 'failed',
		})
	}

	// validating data types (also prevents NoSQL injection through objects)
	if (
		!isObjectIdOrHexString(fromAccount) ||
		!isObjectIdOrHexString(toAccount) ||
		typeof idempotencyKey !== 'string'
	) {
		return res.status(400).json({
			message:
				'FromAccount & toAccount must be valid ids and idempotencyKey must be a string',
			status: 'failed',
		})
	}

	// validating transaction amount
	if (
		typeof amount !== 'number' ||
		!Number.isFinite(amount) ||
		amount <= 99
	) {
		return res.status(400).json({
			message: 'Invalid amount! Minimum transaction amount is 100',
			status: 'failed',
		})
	}

	try {
		// validating fromAccount ownership & toAccount existence
		const [fromUserAccount, toUserAccount] = await Promise.all([
			accountModel
				.findOne({
					_id: fromAccount,
					user: req.user.id,
				})
				.populate('user', 'name email'),

			accountModel
				.findOne({
					_id: toAccount,
				})
				.populate('user', 'name email'),
		])

		// validating both accounts exists
		if (!fromUserAccount || !toUserAccount) {
			return res.status(400).json({
				message: 'Invalid fromAccount or toAccount',
				status: 'failed',
			})
		}

		// preventing transaction from an account to itself
		if (fromUserAccount._id.equals(toUserAccount._id)) {
			return res.status(400).json({
				message: 'FromAccount and toAccount must be different',
				status: 'failed',
			})
		}

		// validating idempotencyKey
		const isTransactionAlreadyExists = await transactionModel.findOne({
			idempotencyKey,
		})
		if (isTransactionAlreadyExists) {
			// preventing reuse of same idempotencyKey for a different transaction
			if (
				!isTransactionAlreadyExists.fromAccount.equals(
					fromUserAccount._id,
				) ||
				!isTransactionAlreadyExists.toAccount.equals(
					toUserAccount._id,
				) ||
				isTransactionAlreadyExists.amount !== amount
			) {
				return res.status(409).json({
					message:
						'Idempotency key is already used for a different transaction',
					status: 'failed',
				})
			}

			if (isTransactionAlreadyExists.status === 'COMPLETED') {
				return res.status(200).json({
					message: 'Transaction processed',
					status: 'success',
					transaction: isTransactionAlreadyExists,
				})
			}
			if (isTransactionAlreadyExists.status === 'PENDING') {
				return res.status(200).json({
					message: 'Transaction pending',
					status: 'pending',
				})
			}
			if (isTransactionAlreadyExists.status === 'FAILED') {
				return res.status(200).json({
					message: 'Transaction failed',
					status: 'failed',
				})
			}
			if (isTransactionAlreadyExists.status === 'REVERSED') {
				return res.status(200).json({
					message: 'Transaction reversed',
					status: 'reversed',
				})
			}
		}

		// validating related both accounts active or not
		if (
			fromUserAccount.status !== 'ACTIVE' ||
			toUserAccount.status !== 'ACTIVE'
		) {
			return res.status(400).json({
				message:
					'Both fromAccount & toAccount must be ACTIVE to process transaction',
				status: 'failed',
			})
		}

		// Declaring transaction related core operations
		let transaction
		let debitLedgerEntry
		let creditLedgerEntry

		// starting session
		const transactionSession = await startSession()

		try {
			transactionSession.startTransaction()

			// locking fromAccount - two parallel transactions can not update the same account,
			// so one of them fails & balance check below can not be fooled (double-spend protection)
			await accountModel.updateOne(
				{ _id: fromAccount },
				{ $set: { updatedAt: new Date() } },
				{ session: transactionSession },
			)

			// validating fromUserAccount has sufficient balance
			const fromUserAccountBalance =
				await fromUserAccount.getAccountBalance()
			if (fromUserAccountBalance < amount) {
				await transactionSession.abortTransaction()

				return res.status(400).json({
					message: 'Insufficient balance to make transaction',
					status: 'failed',
				})
			}

			// creating transaction - status: pending
			transaction = (
				await transactionModel.create(
					[
						{
							fromAccount,
							toAccount,
							amount,
							idempotencyKey,
							status: 'PENDING',
						},
					],
					{ session: transactionSession },
				)
			)[0]

			// creating debit-ledger-entry for fromAccount
			debitLedgerEntry = (
				await ledgerModel.create(
					[
						{
							transaction: transaction._id,
							account: fromAccount,
							amount,
							type: 'DEBIT',
						},
					],
					{ session: transactionSession },
				)
			)[0]

			// creating credit-ledger-entry for toAccount
			creditLedgerEntry = (
				await ledgerModel.create(
					[
						{
							transaction: transaction._id,
							account: toAccount,
							amount,
							type: 'CREDIT',
						},
					],
					{ session: transactionSession },
				)
			)[0]

			// after successful debit & credit updating transaction-status
			transaction = await transactionModel.findOneAndUpdate(
				{ _id: transaction._id },
				{ $set: { status: 'COMPLETED' } },
				{ returnDocument: 'after', session: transactionSession },
			)

			// saving all changes permanently
			await transactionSession.commitTransaction()
		} catch (transactionSessionError) {
			// rolling back everything (nothing is saved, so same idempotencyKey can be retried)
			if (transactionSession.inTransaction()) {
				await transactionSession.abortTransaction()
			}

			console.error('Transaction failed', {
				error: transactionSessionError.message,
				stack: transactionSessionError.stack,
			})

			return res.status(500).json({
				message: 'Transaction failed, please try again',
				status: 'failed',
			})
		} finally {
			// always closing session
			await transactionSession.endSession()
		}

		// sending transaction success alert emails to both users
		// allSettled makes sure one email failure does not stop the other one
		const emailResults = await Promise.allSettled([
			sendTransactionSuccessAlertEmail(
				fromUserAccount.user.email,
				fromUserAccount.user.name,
				transaction._id,
				transaction.amount,
				fromUserAccount.currency,
				debitLedgerEntry.type,
			),
			sendTransactionSuccessAlertEmail(
				toUserAccount.user.email,
				toUserAccount.user.name,
				transaction._id,
				transaction.amount,
				toUserAccount.currency,
				creditLedgerEntry.type,
			),
		])

		// logging failed emails (transaction is already completed, so no error response)
		emailResults.forEach((emailResult) => {
			if (emailResult.status === 'rejected') {
				console.error('Transaction alert email sending failed', {
					transactionId: transaction._id,
					error: emailResult.reason?.message,
				})
			}
		})

		// response back on success
		return res.status(201).json({
			message: 'Transaction completed successfully',
			status: 'success',
			transaction: {
				id: transaction._id,
				fromAccount: transaction.fromAccount,
				toAccount: transaction.toAccount,
				amount: transaction.amount,
				idempotencyKey: transaction.idempotencyKey,
				status: transaction.status,
			},
		})
	} catch (error) {
		// logging on unexpected server error
		console.error('Transaction failed', {
			error: error.message,
			stack: error.stack,
		})

		// response back on server error
		return res.status(500).json({
			message: 'Internal server error',
			status: 'failed',
		})
	}
}

/**
    - get transaction history controller
    - GET API - "/api/transactions"
    - query params (optional) - page (default 1), limit (default 10, max 50)
 */
async function getTransactionHistoryController(req, res) {
	// extracting pagination data sent by client
	const page = req.query.page === undefined ? 1 : Number(req.query.page)
	const limit = req.query.limit === undefined ? 10 : Number(req.query.limit)

	// validating pagination data
	if (
		!Number.isInteger(page) ||
		!Number.isInteger(limit) ||
		page < 1 ||
		limit < 1 ||
		limit > 50
	) {
		return res.status(400).json({
			message:
				'Page must be a positive integer & limit must be between 1 and 50',
			status: 'failed',
		})
	}

	try {
		// finding all accounts of the authenticated user
		const userAccounts = await accountModel
			.find({ user: req.user.id })
			.select('_id')
			.lean()
		const userAccountIds = userAccounts.map((account) => account._id)

		// filter - transactions where user is either sender or receiver
		const transactionFilter = {
			$or: [
				{ fromAccount: { $in: userAccountIds } },
				{ toAccount: { $in: userAccountIds } },
			],
		}

		// getting current page transactions & total transactions count
		const [transactions, totalTransactions] = await Promise.all([
			transactionModel
				.find(transactionFilter)
				.select('fromAccount toAccount amount status createdAt')
				.sort({ createdAt: -1, _id: -1 })
				.skip((page - 1) * limit)
				.limit(limit)
				.lean(),

			transactionModel.countDocuments(transactionFilter),
		])

		// preparing user's account ids for fast direction checking
		const userAccountIdSet = new Set(
			userAccountIds.map((accountId) => accountId.toString()),
		)

		// preparing transaction history with direction - SENT or RECEIVED
		const transactionHistory = transactions.map((transaction) => ({
			id: transaction._id,
			fromAccount: transaction.fromAccount,
			toAccount: transaction.toAccount,
			amount: transaction.amount,
			status: transaction.status,
			direction: userAccountIdSet.has(transaction.fromAccount.toString())
				? 'SENT'
				: 'RECEIVED',
			createdAt: transaction.createdAt,
		}))

		// calculating total pages
		const totalPages = Math.ceil(totalTransactions / limit)

		// response back on success
		return res.status(200).json({
			message: 'Transaction history fetched successfully',
			status: 'success',
			transactions: transactionHistory,
			pagination: {
				currentPage: page,
				limit,
				totalTransactions,
				totalPages,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			},
		})
	} catch (error) {
		// logging on unexpected server error
		console.error('Get transaction history failed', {
			error: error.message,
			stack: error.stack,
		})

		// response back on server error
		return res.status(500).json({
			message: 'Internal server error',
			status: 'failed',
		})
	}
}

/**
    - get transaction details controller
    - GET API - "/api/transactions/:transactionId"
 */
async function getTransactionDetailsController(req, res) {
	// extracting transactionId sent by client
	const { transactionId } = req.params

	// validating transactionId
	if (!isObjectIdOrHexString(transactionId)) {
		return res.status(400).json({
			message: 'Invalid transactionId',
			status: 'failed',
		})
	}

	try {
		// finding all accounts of the authenticated user
		const userAccounts = await accountModel
			.find({ user: req.user.id })
			.select('_id')
			.lean()
		const userAccountIds = userAccounts.map((account) => account._id)

		// finding transaction - only if user is either sender or receiver
		const transaction = await transactionModel
			.findOne({
				_id: transactionId,
				$or: [
					{ fromAccount: { $in: userAccountIds } },
					{ toAccount: { $in: userAccountIds } },
				],
			})
			.populate([
				{
					path: 'fromAccount',
					select: 'currency user',
					populate: { path: 'user', select: 'name' },
				},
				{
					path: 'toAccount',
					select: 'currency user',
					populate: { path: 'user', select: 'name' },
				},
			])
			.lean()

		// same response for "not exists" & "not yours" - so ids can not be guessed
		if (!transaction) {
			return res.status(404).json({
				message: 'Transaction not found',
				status: 'failed',
			})
		}

		// finding transaction direction - SENT or RECEIVED
		const isSentByUser = userAccountIds.some((accountId) =>
			accountId.equals(transaction.fromAccount._id),
		)
		const direction = isSentByUser ? 'SENT' : 'RECEIVED'

		// preparing transaction details
		const transactionDetails = {
			id: transaction._id,
			amount: transaction.amount,
			status: transaction.status,
			direction,
			fromAccount: {
				id: transaction.fromAccount._id,
				currency: transaction.fromAccount.currency,
				ownerName: transaction.fromAccount.user?.name,
			},
			toAccount: {
				id: transaction.toAccount._id,
				currency: transaction.toAccount.currency,
				ownerName: transaction.toAccount.user?.name,
			},
			createdAt: transaction.createdAt,
			updatedAt: transaction.updatedAt,
		}

		// idempotencyKey belongs to the sender's request, so only sender can see it
		if (direction === 'SENT') {
			transactionDetails.idempotencyKey = transaction.idempotencyKey
		}

		// response back on success
		return res.status(200).json({
			message: 'Transaction details fetched successfully',
			status: 'success',
			transaction: transactionDetails,
		})
	} catch (error) {
		// logging on unexpected server error
		console.error('Get transaction details failed', {
			error: error.message,
			stack: error.stack,
		})

		// response back on server error
		return res.status(500).json({
			message: 'Internal server error',
			status: 'failed',
		})
	}
}

// exporting controllers
module.exports = {
	createTransactionController,
	getTransactionHistoryController,
	getTransactionDetailsController,
}