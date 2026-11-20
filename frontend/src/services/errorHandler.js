// Converts any thrown error into one predictable shape,
// so components never touch raw Axios error objects.

export const normalizeError = (error) => {
	// Server responded with a non-2xx status
	if (error.response) {
		const { status, data } = error.response

		return {
			message: data?.message || 'Something went wrong. Please try again.',
			status,
			serverStatus: data?.status || null, // 'failed' | 'pending' | ...
			isNetworkError: false,
			isTimeout: false,
		}
	}

	// Request was sent but no response arrived (timeout / offline / CORS)
	const isTimeout = error.code === 'ECONNABORTED'

	return {
		message: isTimeout
			? 'The request timed out. Please check your connection and try again.'
			: 'Unable to reach the server. Please check your connection.',
		status: null,
		serverStatus: null,
		isNetworkError: true,
		isTimeout,
	}
}