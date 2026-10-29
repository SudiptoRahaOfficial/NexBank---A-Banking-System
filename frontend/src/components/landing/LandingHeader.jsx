'use client'

import Link from 'next/link'
import { ArrowRight, Landmark, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigationLinks = [
	{ label: 'Features', href: '#features' },
	{ label: 'How It Works', href: '#how-it-works' },
	{ label: 'Security', href: '#security' },
]

export default function LandingHeader() {
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<header className='sticky top-0 z-50 border-b border-[#E2E5F0] bg-white/95 backdrop-blur-md'>
			<div className='mx-auto flex h-18 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-10'>
				{/* Brand */}
				<Link
					href='/'
					aria-label='NexBank home'
					className='flex shrink-0 items-center gap-2.5'
					onClick={() => setMenuOpen(false)}
				>
					<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-sm'>
						<Landmark
							size={22}
							aria-hidden='true'
						/>
					</span>

					<span className='text-xl font-bold tracking-tight text-[#202B49]'>
						NexBank
					</span>
				</Link>

				{/* Desktop navigation */}
				<nav
					aria-label='Main navigation'
					className='hidden items-center gap-8 md:flex'
				>
					{navigationLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className='text-sm font-medium text-[#6B7280] transition-colors hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
						>
							{link.label}
						</a>
					))}
				</nav>

				{/* Desktop actions */}
				<div className='hidden items-center gap-3 md:flex'>
					<Link
						href='/signin'
						className='rounded-lg px-4 py-2.5 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						Sign in
					</Link>

					<Link
						href='/signup'
						className='inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						Get started
						<ArrowRight
							size={16}
							aria-hidden='true'
						/>
					</Link>
				</div>

				{/* Mobile menu toggle */}
				<button
					type='button'
					className='flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E5F0] text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] md:hidden'
					aria-label={
						menuOpen
							? 'Close navigation menu'
							: 'Open navigation menu'
					}
					aria-expanded={menuOpen}
					aria-controls='mobile-navigation'
					onClick={() => setMenuOpen((open) => !open)}
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

			{/* Mobile navigation */}
			<div
				id='mobile-navigation'
				hidden={!menuOpen}
				className='border-t border-[#E2E5F0] bg-white px-4 py-4 md:hidden'
			>
				<nav
					aria-label='Mobile navigation'
					className='flex flex-col gap-1'
				>
					{navigationLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className='rounded-lg px-3 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-[#F4F6FB] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-[#4F46E5]'
						>
							{link.label}
						</a>
					))}

					<div className='mt-3 grid grid-cols-2 gap-3 border-t border-[#E2E5F0] pt-4'>
						<Link
							href='/signin'
							onClick={() => setMenuOpen(false)}
							className='flex items-center justify-center rounded-lg border border-[#E2E5F0] px-4 py-3 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-[#4F46E5]'
						>
							Sign in
						</Link>

						<Link
							href='/signup'
							onClick={() => setMenuOpen(false)}
							className='flex items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-[#4F46E5]'
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
		</header>
	)
}