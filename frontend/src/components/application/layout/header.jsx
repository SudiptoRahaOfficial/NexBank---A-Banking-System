'use client'

import Link from 'next/link'
import { Bell, Menu } from 'lucide-react'

export default function Header({
	onMenuClick,
	title = 'Finance',
	description = 'Your financial overview',
}) {
	return (
		<header className='sticky top-0 z-30 border-b border-[#E2E5F0] bg-white/95 backdrop-blur'>
			<div className='flex min-h-19 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
				{/* Page heading and mobile menu */}
				<div className='flex min-w-0 items-center gap-3'>
					<button
						type='button'
						onClick={onMenuClick}
						aria-label='Open navigation menu'
						aria-controls='customer-sidebar'
						className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E5F0] text-[#202B49] hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] lg:hidden'
					>
						<Menu
							size={20}
							aria-hidden='true'
						/>
					</button>

					<div className='min-w-0'>
						<h1 className='text-md font-bold text-[#202B49]'>
							{title}
						</h1>

						<p className='hidden text-sm text-[#6B7280] sm:block'>
							{description}
						</p>
					</div>
				</div>

				{/* Header actions */}
				<div className='flex shrink-0 items-center gap-2 sm:gap-4'>
					<button
						type='button'
						aria-label='Notifications (not connected yet)'
						title='Notifications'
						className='relative flex size-10 items-center justify-center rounded-xl text-[#6B7280] transition-colors hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
					>
						<Bell
							size={20}
							aria-hidden='true'
						/>
					</button>

					<span
						aria-hidden='true'
						className='hidden h-8 w-px bg-[#E2E5F0] sm:block'
					/>

					<Link
						href='/settings'
						aria-label='Open security settings'
						className='flex items-center gap-3 rounded-xl p-1.5 pr-2 transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						<span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E9EFFF] text-sm font-semibold text-[#4338CA]'>
							SR
						</span>

						<span className='hidden text-left sm:block'>
							<span className='block text-sm font-semibold text-[#202B49]'>
								Sudipto Raha
							</span>
							<span className='mt-0.5 block text-xs text-[#6B7280]'>
								Personal Account
							</span>
						</span>
					</Link>
				</div>
			</div>
		</header>
	)
}