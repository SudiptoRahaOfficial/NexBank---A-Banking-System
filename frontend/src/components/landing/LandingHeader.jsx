'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Landmark, Menu, X } from 'lucide-react'

const navigationLinks = [
	{ label: 'Features', href: '#features' },
	{ label: 'How It Works', href: '#how-it-works' },
	{ label: 'Security', href: '#security' },
]

const styles = {
	header: 'sticky top-0 z-50 w-full border-b border-[#E2E5F0] bg-white/95 backdrop-blur-md',

	container:
		'mx-auto flex h-16 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-10',

	brand: 'inline-flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]',

	brandIcon:
		'flex size-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white',

	brandName: 'text-xl font-bold tracking-tight text-[#202B49]',

	desktopNav: 'hidden items-center gap-8 md:flex',

	navLink:
		'rounded-md py-2 text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]',

	signIn: 'inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]',

	getStarted:
		'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]',

	mobileToggle:
		'inline-flex size-10 items-center justify-center rounded-lg border border-[#E2E5F0] text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] md:hidden',

	mobilePanel:
		'border-t border-[#E2E5F0] bg-white px-4 py-4 sm:px-6 md:hidden',

	mobileLink:
		'flex min-h-11 items-center rounded-lg px-3 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F4F6FB] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]',
}

function Brand({ onNavigate }) {
	return (
		<Link
			href='/'
			aria-label='NexBank home'
			className={styles.brand}
			onClick={onNavigate}
		>
			<span className={styles.brandIcon}>
				<Landmark
					size={21}
					aria-hidden='true'
				/>
			</span>

			<span className={styles.brandName}>NexBank</span>
		</Link>
	)
}

function DesktopNavigation() {
	return (
		<nav
			aria-label='Main navigation'
			className={styles.desktopNav}
		>
			{navigationLinks.map(({ label, href }) => (
				<a
					key={href}
					href={href}
					className={styles.navLink}
				>
					{label}
				</a>
			))}
		</nav>
	)
}

function DesktopActions() {
	return (
		<div className='hidden items-center gap-2 md:flex'>
			<Link
				href='/signin'
				className={styles.signIn}
			>
				Sign in
			</Link>

			<Link
				href='/signup'
				className={styles.getStarted}
			>
				Get started
				<ArrowRight
					size={16}
					aria-hidden='true'
				/>
			</Link>
		</div>
	)
}

function MobileNavigation({ id, open, onNavigate }) {
	if (!open) {
		return null
	}

	return (
		<div
			id={id}
			className={styles.mobilePanel}
		>
			<nav
				aria-label='Mobile navigation'
				className='mx-auto flex max-w-360 flex-col gap-1'
			>
				{navigationLinks.map(({ label, href }) => (
					<a
						key={href}
						href={href}
						className={styles.mobileLink}
						onClick={onNavigate}
					>
						{label}
					</a>
				))}

				<div className='mt-3 grid grid-cols-2 gap-3 border-t border-[#E2E5F0] pt-4'>
					<Link
						href='/signin'
						className={`${styles.signIn} border border-[#E2E5F0]`}
						onClick={onNavigate}
					>
						Sign in
					</Link>

					<Link
						href='/signup'
						className={styles.getStarted}
						onClick={onNavigate}
					>
						Get started
						<ArrowRight
							size={15}
							aria-hidden='true'
						/>
					</Link>
				</div>
			</nav>
		</div>
	)
}

export default function LandingHeader() {
	const [menuOpen, setMenuOpen] = useState(false)
	const mobileNavigationId = useId()

	useEffect(() => {
		if (!menuOpen) {
			return
		}

		function handleKeyDown(event) {
			if (event.key === 'Escape') {
				setMenuOpen(false)
			}
		}

		function handleResize() {
			if (window.innerWidth >= 768) {
				setMenuOpen(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('resize', handleResize)
		}
	}, [menuOpen])

	function closeMenu() {
		setMenuOpen(false)
	}

	function toggleMenu() {
		setMenuOpen((current) => !current)
	}

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Brand onNavigate={closeMenu} />

				<DesktopNavigation />

				<DesktopActions />

				<button
					type='button'
					className={styles.mobileToggle}
					aria-label={
						menuOpen
							? 'Close navigation menu'
							: 'Open navigation menu'
					}
					aria-expanded={menuOpen}
					aria-controls={mobileNavigationId}
					onClick={toggleMenu}
				>
					{menuOpen ? (
						<X
							size={21}
							aria-hidden='true'
						/>
					) : (
						<Menu
							size={21}
							aria-hidden='true'
						/>
					)}
				</button>
			</div>

			<MobileNavigation
				id={mobileNavigationId}
				open={menuOpen}
				onNavigate={closeMenu}
			/>
		</header>
	)
}