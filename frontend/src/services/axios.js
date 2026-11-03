import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
	throw new Error(
		'NEXT_PUBLIC_API_BASE_URL is not configured. Check your .env.local file.',
	)
}

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,

	timeout: 15000,

	withCredentials: true,

	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

export default axiosInstance