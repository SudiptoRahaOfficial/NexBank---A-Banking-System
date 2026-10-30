import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function AccountsPageHeader() {
	return (
		<section className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
			{/* Page Introduction */}
			<div className='space-y-1.5'>
				<h1 className='text-2xl font-semibold tracking-tight text-[#202B49] sm:text-3xl'>
					My Accounts
				</h1>

				<p className='text-sm leading-6 text-[#6B7280] sm:text-base'>
					Manage and monitor all your NexBank accounts.
				</p>
			</div>

			{/* Create Account Action */}
			<Link
				href='/accounts/create-account'
				className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] sm:w-auto'
			>
				<Plus
					size={18}
					aria-hidden='true'
				/>
				Create Account
			</Link>
		</section>
	)
}