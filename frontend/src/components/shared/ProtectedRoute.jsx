'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/context/AuthContext'
import LoadingScreen from '@/components/shared/LoadingScreen'

export default function ProtectedRoute({ children }) {
	const router = useRouter()
	const { status } = useAuth()

	// Redirect unauthenticated users to the signin page.
	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/signin')
		}
	}, [status, router])

	// Keep protected content hidden while checking authentication.
	if (status === 'loading') {
		return <LoadingScreen />
	}

	// Fail closed if session verification encounters an error.
	if (status === 'error') {
		return <LoadingScreen />
	}

	// Do not render protected content while redirecting.
	if (status === 'unauthenticated') {
		return null
	}

	// Render protected content only for authenticated users.
	if (status === 'authenticated') {
		return children
	}

	// Fail closed for any unexpected authentication state.
	return <LoadingScreen />
}