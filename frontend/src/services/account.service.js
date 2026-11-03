import axiosInstance from './axios'

const accountService = {
	// Create a new bank account.
	async createAccount() {
		const response = await axiosInstance.post(
			'/api/accounts/create-account',
		)

		return response.data
	},

	// Retrieve all accounts belonging to the authenticated user.
	async getAccounts() {
		const response = await axiosInstance.get('/api/accounts')

		return response.data
	},

	// Retrieve the balance of a specific account.
	async getAccountBalance(accountId) {
		if (!accountId || typeof accountId !== 'string') {
			throw new Error('A valid account ID is required.')
		}

		const response = await axiosInstance.get(
			`/api/accounts/balance/${encodeURIComponent(accountId)}`,
		)

		return response.data
	},
}

export default accountService