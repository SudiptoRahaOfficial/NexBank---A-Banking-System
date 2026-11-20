import axios from 'axios'
import { tokenManager } from './tokenManager'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

// Fail fast at startup if the env variable is missing
if (!baseURL) {
	throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined')
}

const config = {
	baseURL,
	withCredentials: true, // send the refresh-token cookie cross-origin
	timeout: 15000,
	headers: { 'Content-Type': 'application/json' },
}

// ---------- 1. authClient: NO interceptors ----------
// Used for signin, signup, refresh, signout. Keeping it interceptor-free
// prevents a refresh request from triggering another refresh (infinite loop).
export const authClient = axios.create(config)

// ---------- 2. apiClient: protected requests ----------
export const apiClient = axios.create(config)

// Attach the access token to every protected request
apiClient.interceptors.request.use((request) => {
	const token = tokenManager.getToken()
	if (token) request.headers.Authorization = `Bearer ${token}`
	return request
})

// Shared promise: if 5 requests get a 401 at once, only ONE refresh runs
let refreshPromise = null

const refreshAccessToken = async () => {
	if (!refreshPromise) {
		refreshPromise = authClient
			.post('/api/auth/refresh-token')
			.then((response) => {
				tokenManager.setToken(response.data.accessToken)
				return response.data
			})
			.finally(() => {
				refreshPromise = null // allow future refreshes
			})
	}
	return refreshPromise
}

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config

		// Only handle real 401s from a request we haven't retried yet
		const shouldRefresh =
			error.response?.status === 401 &&
			originalRequest &&
			!originalRequest._retry &&
			!originalRequest.skipAuthRefresh

		if (!shouldRefresh) return Promise.reject(error)

		// Never auto-retry financial mutations (see note below)
		const isMutation = ['post', 'put', 'patch', 'delete'].includes(
			originalRequest.method,
		)

		originalRequest._retry = true

		try {
			await refreshAccessToken()
		} catch (refreshError) {
			tokenManager.clearToken()
			tokenManager.notifySessionExpired()
			return Promise.reject(error)
		}

		// Token is refreshed. Retry GETs automatically.
		// Mutations are NOT replayed; the caller decides (see note).
		if (isMutation) return Promise.reject(error)

		originalRequest.headers.Authorization = `Bearer ${tokenManager.getToken()}`
		return apiClient(originalRequest)
	},
)

export { refreshAccessToken }