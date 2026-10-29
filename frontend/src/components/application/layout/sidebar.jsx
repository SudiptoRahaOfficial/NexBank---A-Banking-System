'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
	ArrowLeftRight,
	LayoutDashboard,
	Landmark,
	LogOut,
	ReceiptText,
	ShieldCheck,
	Wallet,
	X,
} from 'lucide-react'

// Customer navigation configuration
const CUSTOMER_NAVIGATION = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		label: 'My Accounts',
		href: '/accounts',
		icon: Wallet,
	},
	{
		label: 'Transfer Funds',
		href: '/transfer',
		icon: ArrowLeftRight,
	},
	{
		label: 'Transactions',
		href: '/transactions',
		icon: ReceiptText,
	},
	{
		label: 'Security Settings',
		href: '/settings/security',
		icon: ShieldCheck,
	},
]

export default function Sidebar({ mobileOpen = false, onClose }) {
	const pathname = usePathname()

	// Determine whether a navigation item is active
	const isActive = (href) => {
		if (href === '/dashboard') {
			return pathname === href
		}

		return pathname === href || pathname.startsWith(`${href}/`)
	}

	return (
		<>
			{/* Mobile backdrop */}
			{mobileOpen && (
				<button
					type='button'
					aria-label='Close navigation menu'
					onClick={onClose}
					className='fixed inset-0 z-40 bg-slate-950/40 lg:hidden'
				/>
			)}

			{/* Sidebar */}
			<aside
				id='customer-sidebar'
				aria-label='Customer navigation'
				className={[
					'fixed inset-y-0 left-0 z-50 flex w-67.5',
					'flex-col border-r border-[#E2E5F0] bg-white',
					'transition-transform duration-200 ease-out',
					'lg:translate-x-0',
					mobileOpen ? 'translate-x-0' : '-translate-x-full',
				].join(' ')}
			>
				{/* Brand */}
				<div className='flex h-19 shrink-0 items-center justify-between border-b border-[#E2E5F0] px-6'>
					<Link
						href='/dashboard'
						onClick={onClose}
						className='flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
					>
						<span className='flex size-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white'>
							<Landmark
								size={22}
								aria-hidden='true'
							/>
						</span>

						<span className='text-xl font-bold tracking-tight text-[#202B49]'>
							NexBank
						</span>
					</Link>

					{/* Mobile close button */}
					<button
						type='button'
						onClick={onClose}
						aria-label='Close navigation'
						className='rounded-lg p-2 text-[#6B7280] hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] lg:hidden'
					>
						<X
							size={20}
							aria-hidden='true'
						/>
					</button>
				</div>

				{/* Navigation */}
				<nav
					aria-label='Banking navigation'
					className='flex-1 space-y-1 overflow-y-auto px-4 py-6'
				>
					<p className='mb-3 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280]'>
						Banking
					</p>

					{CUSTOMER_NAVIGATION.map((item) => {
						const Icon = item.icon
						const active = isActive(item.href)

						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={onClose}
								aria-current={active ? 'page' : undefined}
								className={[
									'flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5',
									'text-sm font-medium transition-colors',
									'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]',
									active
										? 'bg-[#E9EFFF] text-[#4338CA]'
										: 'text-[#6B7280] hover:bg-[#F4F6FB] hover:text-[#202B49]',
								].join(' ')}
							>
								<Icon
									size={19}
									strokeWidth={active ? 2.2 : 1.8}
									aria-hidden='true'
								/>

								<span>{item.label}</span>
							</Link>
						)
					})}
				</nav>

				{/* Sidebar footer */}
				<div className='border-t border-[#E2E5F0] px-6 py-5.5'>
					<p className='text-xs font-medium text-[#6B7280]'>
						<span className='text-[#4338CA]'>NexBank</span> ·
						Personal Banking
					</p>
				</div>
			</aside>
		</>
	)
}