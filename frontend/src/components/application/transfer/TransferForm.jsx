'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowRightLeft, Info } from 'lucide-react'

import {
	MOCK_ACCOUNTS_RESPONSE,
	MOCK_ACCOUNT_BALANCES,
	MOCK_TRANSACTION_RESPONSES,
} from './fund-transfer.data'

import {
	validateTransferAmount,
	validateTransferAccounts,
	validateAvailableBalance,
} from './fund-transfer.utils'

import AccountSelector from './AccountSelector'
import TransferSummary from './TransferSummary'
import TransferConfirmation from './TransferConfirmation'
import TransferStatus from './TransferStatus'

const SIMULATED_OUTCOME = 'completed'

export default function TransferForm() {
	// --------------------------------------------------
	// 1. Form state
	// --------------------------------------------------

	const [selectedAccountId, setSelectedAccountId] = useState('')
	const [destinationAccountId, setDestinationAccountId] = useState('')
	const [amount, setAmount] = useState('')

	const [errors, setErrors] = useState({})
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [isProcessing, setIsProcessing] = useState(false)

	const [transactionResult, setTransactionResult] = useState(null)

	// Preserve the same idempotency key for the current attempt.
	const idempotencyKeyRef = useRef(null)

	// --------------------------------------------------
	// 2. Prepare account data
	// --------------------------------------------------

	const accounts = useMemo(() => {
		if (MOCK_ACCOUNTS_RESPONSE.status !== 'success') {
			return []
		}

		return MOCK_ACCOUNTS_RESPONSE.accounts.map((account) => {
			const balanceResponse = MOCK_ACCOUNT_BALANCES[account._id]

			return {
				...account,
				currentBalance:
					balanceResponse?.balance?.currentBalance ?? null,
			}
		})
	}, [])

	const selectedAccount = accounts.find(
		(account) => account._id === selectedAccountId,
	)

	// --------------------------------------------------
	// 3. Validate form
	// --------------------------------------------------

	function validateForm() {
		const nextErrors = {}

		const accountError = validateTransferAccounts(
			selectedAccount,
			destinationAccountId,
		)

		const amountError = validateTransferAmount(amount)

		if (accountError) {
			nextErrors.account = accountError
		}

		if (amountError) {
			nextErrors.amount = amountError
		}

		if (
			selectedAccount &&
			selectedAccount.currentBalance !== null &&
			!amountError
		) {
			const balanceError = validateAvailableBalance(
				amount,
				selectedAccount.currentBalance,
			)

			if (balanceError) {
				nextErrors.amount = balanceError
			}
		}

		if (selectedAccount && selectedAccount.currency !== 'BDT') {
			nextErrors.account =
				'Only BDT accounts are supported for transfers.'
		}

		setErrors(nextErrors)

		return Object.keys(nextErrors).length === 0
	}

	// --------------------------------------------------
	// 4. Handle field changes
	// --------------------------------------------------

	function handleAccountChange(accountId) {
		setSelectedAccountId(accountId)

		setErrors((previousErrors) => ({
			...previousErrors,
			account: '',
			amount: '',
		}))
	}

	function handleDestinationChange(value) {
		setDestinationAccountId(value)

		setErrors((previousErrors) => ({
			...previousErrors,
			account: '',
		}))
	}

	function handleAmountChange(value) {
		setAmount(value)

		setErrors((previousErrors) => ({
			...previousErrors,
			amount: '',
		}))
	}

	// --------------------------------------------------
	// 5. Review transfer
	// --------------------------------------------------

	function handleReviewTransfer(event) {
		event.preventDefault()

		if (!validateForm()) {
			return
		}

		setShowConfirmation(true)
	}

	function handleCancelConfirmation() {
		if (isProcessing) {
			return
		}

		setShowConfirmation(false)
	}

	// --------------------------------------------------
	// 6. Simulate transaction processing
	// --------------------------------------------------

	function handleConfirmTransfer() {
		if (isProcessing || !validateForm()) {
			return
		}

		setIsProcessing(true)

		// Generate one key for this logical transfer attempt.
		// Reuse it if the same attempt needs to be retried.
		if (!idempotencyKeyRef.current) {
			idempotencyKeyRef.current = crypto.randomUUID()
		}

		const selectedResponse = MOCK_TRANSACTION_RESPONSES[SIMULATED_OUTCOME]

		const transaction = {
			...selectedResponse.transaction,
			fromAccount: selectedAccount._id,
			toAccount: destinationAccountId.trim(),
			amount: Number(amount),
			idempotencyKey: idempotencyKeyRef.current,
		}

		// Simulate network processing.
		setTimeout(() => {
			setTransactionResult({
				status: selectedResponse.transaction.status,
				message: selectedResponse.message,
				transaction,
			})

			setIsProcessing(false)
			setShowConfirmation(false)
		}, 1000)
	}

	// --------------------------------------------------
	// 7. Handle transaction actions
	// --------------------------------------------------

	function handleRetry() {
		if (isProcessing) {
			return
		}

		setTransactionResult(null)
		setShowConfirmation(true)
	}

	function handleNewTransfer() {
		setSelectedAccountId('')
		setDestinationAccountId('')
		setAmount('')

		setErrors({})
		setShowConfirmation(false)
		setIsProcessing(false)

		setTransactionResult(null)

		// A new logical transfer requires a new idempotency key.
		idempotencyKeyRef.current = null
	}

	// --------------------------------------------------
	// 8. Transaction result
	// --------------------------------------------------

	if (transactionResult) {
		return (
			<div className='space-y-5'>
				<TransferStatus
					status={transactionResult.status}
					transaction={transactionResult.transaction}
					message={transactionResult.message}
					onRetry={
						transactionResult.status === 'FAILED'
							? handleRetry
							: undefined
					}
					onNewTransfer={
						transactionResult.status === 'PENDING'
							? undefined
							: handleNewTransfer
					}
				/>

				{transactionResult.status === 'PENDING' && (
					<div className='rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4'>
						<p className='text-sm font-medium text-[#92400E]'>
							Do not submit this transfer again.
						</p>

						<p className='mt-1 text-xs leading-5 text-[#92400E]'>
							This is a simulated pending result. In the
							integrated application, verify the existing
							transaction before taking further action.
						</p>
					</div>
				)}
			</div>
		)
	}

	// --------------------------------------------------
	// 9. Transfer form and confirmation
	// --------------------------------------------------

	return (
		<div className='grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]'>
			{/* Main form */}
			<section className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm sm:p-7'>
				<div className='mb-6 flex items-center gap-3'>
					<div className='flex size-10 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
						<ArrowRightLeft
							size={20}
							aria-hidden='true'
						/>
					</div>

					<div>
						<h2 className='text-lg font-bold text-[#202B49]'>
							Transfer details
						</h2>

						<p className='mt-1 text-sm text-[#6B7280]'>
							Enter the information required for your transfer.
						</p>
					</div>
				</div>

				{!showConfirmation ? (
					<form
						onSubmit={handleReviewTransfer}
						noValidate
						className='space-y-6'
					>
						{/* Source account */}
						<div className='space-y-2'>
							<AccountSelector
								accounts={accounts}
								selectedAccountId={selectedAccountId}
								onAccountChange={handleAccountChange}
							/>

							{errors.account && (
								<p
									role='alert'
									className='text-xs font-medium text-[#DC2626]'
								>
									{errors.account}
								</p>
							)}
						</div>

						{/* Destination account */}
						<div className='space-y-2'>
							<label
								htmlFor='destination-account'
								className='block text-sm font-semibold text-[#202B49]'
							>
								Recipient account ID
							</label>

							<input
								id='destination-account'
								type='text'
								value={destinationAccountId}
								onChange={(event) =>
									handleDestinationChange(event.target.value)
								}
								placeholder='Enter recipient account ID'
								autoComplete='off'
								spellCheck={false}
								className='w-full rounded-xl border border-[#E2E5F0] bg-white px-4 py-3.5 text-sm text-[#202B49] outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10'
							/>

							<p className='text-xs leading-5 text-[#6B7280]'>
								Enter the recipient&apos;s exact bank account
								ID. Verify it carefully before proceeding.
							</p>
						</div>

						{/* Transfer amount */}
						<div className='space-y-2'>
							<label
								htmlFor='transfer-amount'
								className='block text-sm font-semibold text-[#202B49]'
							>
								Transfer amount
							</label>

							<div className='relative'>
								<span className='absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#6B7280]'>
									৳
								</span>

								<input
									id='transfer-amount'
									type='number'
									inputMode='decimal'
									min='100'
									step='0.01'
									value={amount}
									onChange={(event) =>
										handleAmountChange(event.target.value)
									}
									placeholder='0.00'
									className='w-full rounded-xl border border-[#E2E5F0] bg-white py-3.5 pl-9 pr-4 text-sm font-semibold text-[#202B49] outline-none transition-colors placeholder:font-normal placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10'
								/>
							</div>

							{errors.amount && (
								<p
									role='alert'
									className='text-xs font-medium text-[#DC2626]'
								>
									{errors.amount}
								</p>
							)}

							<p className='text-xs text-[#6B7280]'>
								Minimum transfer amount: ৳100.00
							</p>
						</div>

						{/* Information */}
						<div className='flex items-start gap-3 rounded-xl border border-[#E2E5F0] bg-[#F8FAFF] p-4'>
							<Info
								size={17}
								className='mt-0.5 shrink-0 text-[#4F46E5]'
								aria-hidden='true'
							/>

							<p className='text-xs leading-5 text-[#6B7280]'>
								Transfers are supported between different BDT
								accounts. The source account must be active and
								have sufficient available funds.
							</p>
						</div>

						{/* Submit */}
						<button
							type='submit'
							className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							Review transfer
							<ArrowRightLeft
								size={17}
								aria-hidden='true'
							/>
						</button>
					</form>
				) : (
					<TransferConfirmation
						sourceAccount={selectedAccount}
						destinationAccountId={destinationAccountId}
						amount={amount}
						onConfirm={handleConfirmTransfer}
						onCancel={handleCancelConfirmation}
						isProcessing={isProcessing}
					/>
				)}
			</section>

			{/* Transfer summary */}
			<aside className='space-y-4 xl:sticky xl:top-6 xl:self-start'>
				<TransferSummary
					sourceAccount={selectedAccount}
					destinationAccountId={destinationAccountId}
					amount={amount}
				/>

				<p className='px-1 text-xs leading-5 text-[#6B7280]'>
					Please review all transfer details carefully before
					confirming your transaction.
				</p>
			</aside>
		</div>
	)
}