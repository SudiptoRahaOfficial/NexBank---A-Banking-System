let accessToken = null

const tokenManager = {
	getAccessToken() {
		return accessToken
	},

	setAccessToken(token) {
		if (typeof token !== 'string' || !token.trim()) {
			throw new Error('A valid access token must be provided.')
		}

		accessToken = token
	},

	clearAccessToken() {
		accessToken = null
	},

	hasAccessToken() {
		return Boolean(accessToken)
	},
}

export default tokenManager