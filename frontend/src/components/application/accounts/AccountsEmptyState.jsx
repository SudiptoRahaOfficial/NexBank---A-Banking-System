import Link from 'next/link'
import { Landmark, SearchX } from 'lucide-react'

export default function AccountsEmptyState({ type = 'empty' }) {
	const hasNoAccounts = type === 'empty'

	const Icon = hasNoAccounts ? Landmark : SearchX

	return (
		<div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5DAE8] bg-white px-5 py-14 text-center sm:py-16'>
			<div className='flex size-14 items-center justify-center rounded-2xl bg-[#E9EFFF] text-[#4F46E5]'>
				<Icon
					size={26}
					aria-hidden='true'
				/>
			</div>

			<h3 className='mt-5 text-lg font-semibold text-[#202B49]'>
				{hasNoAccounts ? 'No accounts yet' : 'No matching accounts'}
			</h3>

			<p className='mt-2 max-w-sm text-sm leading-6 text-[#6B7280]'>
				{hasNoAccounts
					? 'You have not created a NexBank account yet. Create your first account to get started.'
					: 'We could not find any accounts matching your search or selected filters. Try changing your filters.'}
			</p>

			{hasNoAccounts ? (
				<Link
					href='/accounts/create-account'
					className='mt-6 inline-flex items-center justify-center rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					Create Account
				</Link>
			) : (
				<Link
					href='/accounts'
					className='mt-6 inline-flex items-center justify-center rounded-lg border border-[#E2E5F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					Clear Filters
				</Link>
			)}
		</div>
	)
}