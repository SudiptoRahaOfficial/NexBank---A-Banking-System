import axiosInstance from './axios'
import tokenManager from './tokenManager'

const authService = {
	// Register a new user.
	async signUp(userData) {
		const response = await axiosInstance.post('/api/auth/signup', userData)

		return response.data
	},

	// Verify the user's email using the OTP.
	async verifyEmail(verificationData) {
		const response = await axiosInstance.post(
			'/api/auth/verify-email',
			verificationData,
		)

		return response.data
	},

	// Request a new email verification OTP.
	async resendVerificationEmail(email) {
		const response = await axiosInstance.post(
			'/api/auth/resend-verify-email',
			{ email },
		)

		return response.data
	},

	// Authenticate the user and store the access token.
	async signIn(credentials) {
		const response = await axiosInstance.post(
			'/api/auth/signin',
			credentials,
		)

		const accessToken = response.data?.accessToken

		if (!accessToken) {
			throw new Error('Signin response did not contain an access token.')
		}

		tokenManager.setAccessToken(accessToken)

		return response.data
	},

	// Restore the session using the HTTP-only refresh-token cookie.
	async refreshToken() {
		const response = await axiosInstance.post('/api/auth/refresh-token')

		const accessToken = response.data?.accessToken

		if (!accessToken) {
			throw new Error('Refresh response did not contain an access token.')
		}

		tokenManager.setAccessToken(accessToken)

		return response.data
	},

	// Sign out from the current session.
	async signOut() {
		try {
			const response = await axiosInstance.post('/api/auth/signout')

			return response.data
		} finally {
			tokenManager.clearAccessToken()
		}
	},

	// Sign out from all active sessions.
	async signOutAll() {
		try {
			const response = await axiosInstance.post('/api/auth/signout-all')

			return response.data
		} finally {
			tokenManager.clearAccessToken()
		}
	},
}

export default authService