import axios from 'axios'
import tokenManager from './tokenManager'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
	throw new Error(
		'NEXT_PUBLIC_API_BASE_URL is not configured. Check your .env.local file.',
	)
}

const REQUEST_TIMEOUT = 15000

const axiosConfig = {
	baseURL: API_BASE_URL,
	timeout: REQUEST_TIMEOUT,
	withCredentials: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}

// Main API client
const axiosInstance = axios.create(axiosConfig)

// Separate client for token refresh.
// It deliberately has no authentication interceptors.
const refreshClient = axios.create(axiosConfig)

let refreshPromise = null

const AUTH_ENDPOINTS = [
	'/api/auth/signup',
	'/api/auth/verify-email',
	'/api/auth/resend-verify-email',
	'/api/auth/signin',
	'/api/auth/refresh-token',
	'/api/auth/signout',
	'/api/auth/signout-all',
]

const SAFE_HTTP_METHODS = new Set(['get', 'head', 'options'])

function isAuthEndpoint(url = '') {
	return AUTH_ENDPOINTS.some((endpoint) => {
		return url.split('?')[0].replace(/\/$/, '') === endpoint
	})
}

function notifyAuthenticationFailure() {
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new Event('nexbank:auth-expired'))
	}
}

async function refreshAccessToken() {
	if (!refreshPromise) {
		refreshPromise = refreshClient
			.post('/api/auth/refresh-token')
			.then((response) => {
				const newAccessToken = response.data?.accessToken

				if (!newAccessToken) {
					throw new Error(
						'The refresh response did not contain an access token.',
					)
				}

				tokenManager.setAccessToken(newAccessToken)

				return newAccessToken
			})
			.catch((error) => {
				tokenManager.clearAccessToken()
				notifyAuthenticationFailure()

				throw error
			})
			.finally(() => {
				refreshPromise = null
			})
	}

	return refreshPromise
}

// Attach the current access token to outgoing requests.
axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = tokenManager.getAccessToken()

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	},
	(error) => Promise.reject(error),
)

// Handle expired or invalid access tokens.
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		if (
			error.response?.status !== 401 ||
			!originalRequest ||
			originalRequest._retry ||
			isAuthEndpoint(originalRequest.url)
		) {
			return Promise.reject(error)
		}

		// Prevent the same request from entering a retry loop.
		originalRequest._retry = true

		try {
			const newAccessToken = await refreshAccessToken()

			const method = (originalRequest.method || 'get').toLowerCase()

			const isSafeMethod = SAFE_HTTP_METHODS.has(method)

			const explicitlyAllowed = originalRequest.retryAfterRefresh === true

			// Refresh the token, but do not automatically replay
			// financial or other mutation requests by default.
			if (!isSafeMethod && !explicitlyAllowed) {
				return Promise.reject(error)
			}

			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

			return axiosInstance(originalRequest)
		} catch (refreshError) {
			return Promise.reject(refreshError)
		}
	},
)

export default axiosInstance