import axiosInstance from './axios'

const transactionService = {
	// Create a new fund transfer.
	async createTransaction(transactionData) {
		const { fromAccount, toAccount, amount, idempotencyKey } =
			transactionData || {}

		if (!fromAccount || typeof fromAccount !== 'string') {
			throw new Error('A valid source account ID is required.')
		}

		if (!toAccount || typeof toAccount !== 'string') {
			throw new Error('A valid destination account ID is required.')
		}

		if (fromAccount === toAccount) {
			throw new Error(
				'Source and destination accounts must be different.',
			)
		}

		if (
			typeof amount !== 'number' ||
			!Number.isFinite(amount) ||
			amount < 100
		) {
			throw new Error('The transfer amount must be at least 100.')
		}

		if (
			!idempotencyKey ||
			typeof idempotencyKey !== 'string' ||
			!idempotencyKey.trim()
		) {
			throw new Error('A valid idempotency key is required.')
		}

		const response = await axiosInstance.post(
			'/api/transactions/create-transaction',
			{
				fromAccount,
				toAccount,
				amount,
				idempotencyKey,
			},
		)

		return response.data
	},

	// Retrieve paginated transaction history.
	async getTransactions({ page = 1, limit = 10 } = {}) {
		if (!Number.isInteger(page) || page < 1) {
			throw new Error('Page must be a positive integer.')
		}

		if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
			throw new Error('Limit must be an integer between 1 and 50.')
		}

		const response = await axiosInstance.get('/api/transactions', {
			params: {
				page,
				limit,
			},
		})

		return response.data
	},

	// Retrieve details of a specific transaction.
	async getTransactionById(transactionId) {
		if (
			!transactionId ||
			typeof transactionId !== 'string' ||
			!transactionId.trim()
		) {
			throw new Error('A valid transaction ID is required.')
		}

		const response = await axiosInstance.get(
			`/api/transactions/${encodeURIComponent(transactionId)}`,
		)

		return response.data
	},
}

export default transactionService