import Link from 'next/link'
import { ArrowLeft, Landmark } from 'lucide-react'

export default function CreateAccountPageHeader() {
	return (
		<header className='w-full border-b border-[#E2E5F0] bg-white'>
			<div className='mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
				{/* NexBank Brand */}
				<Link
					href='/dashboard'
					aria-label='NexBank - Back to Accounts'
					className='group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
				>
					<span className='flex size-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white transition-colors group-hover:bg-[#4338CA]'>
						<Landmark
							size={21}
							strokeWidth={2}
							aria-hidden='true'
						/>
					</span>

					<span className='text-xl font-bold tracking-tight text-[#202B49]'>
						NexBank
					</span>
				</Link>

				{/* Back to Accounts */}
				<Link
					href='/accounts'
					className='group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-[#4B5563] transition-colors hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5] sm:px-3'
				>
					<ArrowLeft
						size={17}
						strokeWidth={2}
						className='transition-transform group-hover:-translate-x-0.5'
						aria-hidden='true'
					/>

					<span>Back to Accounts</span>
				</Link>
			</div>
		</header>
	)
}