'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import authService from '@/services/auth.service'
import tokenManager from '@/services/tokenManager'

const AuthContext = createContext(null)

// Prevent duplicate session restoration requests,
// including React Strict Mode's development effect cycle.
let sessionRestorePromise = null

function normalizeUser(user) {
	if (!user) {
		return null
	}

	return {
		...user,
		name: user.name ?? user.username ?? '',
	}
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [status, setStatus] = useState('loading')

	// Restore the user's session using the HTTP-only refresh cookie.
	const refreshSession = useCallback(() => {
		if (!sessionRestorePromise) {
			sessionRestorePromise = authService
				.refreshToken()
				.then((response) => {
					if (!response.user) {
						throw new Error(
							'Session response did not contain user information.',
						)
					}

					const normalizedUser = normalizeUser(response.user)

					setUser(normalizedUser)
					setStatus('authenticated')

					return normalizedUser
				})
				.catch((error) => {
					tokenManager.clearAccessToken()
					setUser(null)

					if (error.response?.status === 401) {
						setStatus('unauthenticated')
					} else {
						setStatus('error')
					}

					throw error
				})
				.finally(() => {
					sessionRestorePromise = null
				})
		}

		return sessionRestorePromise
	}, [])

	// Authenticate the user after successful signin.
	const signIn = useCallback(async (credentials) => {
		const response = await authService.signIn(credentials)

		if (!response.user) {
			tokenManager.clearAccessToken()

			throw new Error('Signin response did not contain user information.')
		}

		const normalizedUser = normalizeUser(response.user)

		setUser(normalizedUser)
		setStatus('authenticated')

		return response
	}, [])

	// Sign out from the current session.
	const signOut = useCallback(async () => {
		try {
			return await authService.signOut()
		} finally {
			setUser(null)
			setStatus('unauthenticated')
		}
	}, [])

	// Revoke all active sessions.
	const signOutAll = useCallback(async () => {
		try {
			return await authService.signOutAll()
		} finally {
			setUser(null)
			setStatus('unauthenticated')
		}
	}, [])

	// Restore the session when the application initializes.
	useEffect(() => {
		const handleAuthenticationExpired = () => {
			tokenManager.clearAccessToken()
			setUser(null)
			setStatus('unauthenticated')
		}

		window.addEventListener(
			'nexbank:auth-expired',
			handleAuthenticationExpired,
		)

		refreshSession().catch(() => {
			// The status is already updated inside refreshSession.
		})

		return () => {
			window.removeEventListener(
				'nexbank:auth-expired',
				handleAuthenticationExpired,
			)
		}
	}, [refreshSession])

	const value = {
		user,
		status,
		isLoading: status === 'loading',
		isAuthenticated: status === 'authenticated',

		signIn,
		signOut,
		signOutAll,
		refreshSession,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider.')
	}

	return context
}