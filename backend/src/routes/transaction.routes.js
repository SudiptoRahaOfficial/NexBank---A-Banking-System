/*
    - file name: transaction.routes.js
    - responsibility: responsible for all transaction related api endpoints
 */

// importing dependencis
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const {
	createTransactionController,
	getTransactionDetailsController,
	getTransactionHistoryController,
} = require('../controllers/transaction.controllers')

// create-transaction : POST API - "/api/transactions/create-transaction"
router.post(
	'/create-transaction',
	authenticateUser,
	createTransactionController,
)

// get-transaction-details : GET API - "/api/transactions/:transactionId"
router.get('/:transactionId', authenticateUser, getTransactionDetailsController)

// get-transaction-history : GET API - "/api/transactions"
router.get('/', authenticateUser, getTransactionHistoryController)

// exporting router
module.exports = router