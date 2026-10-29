'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/application/layout/sidebar'
import Header from '@/components/application/layout/header'
import Footer from '@/components/application/layout/footer'

export default function Layout({ children, title, description }) {
	const [mobileOpen, setMobileOpen] = useState(false)

	useEffect(() => {
		if (!mobileOpen) return

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				setMobileOpen(false)
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [mobileOpen])

	return (
		<div className='min-h-dvh bg-[#F4F6FB] text-[#202B49]'>
			<Sidebar
				mobileOpen={mobileOpen}
				onClose={() => setMobileOpen(false)}
			/>

			<div className='min-h-dvh min-w-0 lg:pl-67.5'>
				<Header
					title={title}
					description={description}
					onMenuClick={() => setMobileOpen(true)}
				/>

				<main className='px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
					{children}
				</main>

				<Footer />
			</div>
		</div>
	)
}