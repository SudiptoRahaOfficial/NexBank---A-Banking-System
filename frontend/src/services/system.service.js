import axiosInstance from './axios'

const systemService = {
	// Add initial funds to a customer's bank account.
	async initialFund(fundingData) {
		const { receiverAccountId, amount, idempotencyKey } = fundingData || {}

		if (
			!receiverAccountId ||
			typeof receiverAccountId !== 'string' ||
			!receiverAccountId.trim()
		) {
			throw new Error('A valid receiver account ID is required.')
		}

		if (
			typeof amount !== 'number' ||
			!Number.isFinite(amount) ||
			amount < 1000
		) {
			throw new Error('The initial funding amount must be at least 1000.')
		}

		if (
			!idempotencyKey ||
			typeof idempotencyKey !== 'string' ||
			!idempotencyKey.trim()
		) {
			throw new Error('A valid idempotency key is required.')
		}

		const response = await axiosInstance.post('/api/system/initial-fund', {
			receiverAccountId,
			amount,
			idempotencyKey,
		})

		return response.data
	},
}

export default systemService