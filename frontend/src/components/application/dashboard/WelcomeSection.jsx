import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ArrowLeftRight, Wallet } from 'lucide-react'
import { MOCK_DASHBOARD_DATA } from '@/components/application/dashboard/dashboardData'

export default function WelcomeSection() {
	const { firstName } = MOCK_DASHBOARD_DATA.customer

	return (
		<section className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
			<div>
				<p className='text-sm font-medium text-[#4F46E5]'>
					Your personal banking
				</p>

				<h2 className='mt-2 text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'>
					Welcome back, {firstName}
				</h2>

				<p className='mt-2 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base'>
					Manage your accounts, track your spending, and stay in
					control of your finances.
				</p>
			</div>

			<div className='flex flex-wrap gap-3'>
				<Link
					href='/transfer'
					className='inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					<ArrowLeftRight
						size={17}
						aria-hidden='true'
					/>
					Transfer funds
					<ArrowRight
						size={16}
						aria-hidden='true'
					/>
				</Link>

				<Link
					href='/accounts'
					className='inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#E2E5F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F8F9FD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					<Wallet
						size={17}
						aria-hidden='true'
					/>
					My accounts
					<ArrowUpRight
						size={16}
						aria-hidden='true'
					/>
				</Link>
			</div>
		</section>
	)
}