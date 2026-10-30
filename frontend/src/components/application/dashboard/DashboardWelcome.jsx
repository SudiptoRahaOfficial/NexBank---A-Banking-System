import { Landmark, Sparkles } from 'lucide-react'

import { MOCK_DASHBOARD_DATA } from './dashboardData'
import { getCustomerInitials } from './dashboardUtils'

export default function DashboardWelcome() {
	const { customer, accounts } = MOCK_DASHBOARD_DATA

	const firstName = customer.firstName || 'there'

	const fullName = [customer.firstName, customer.lastName]
		.filter(Boolean)
		.join(' ')

	const initials = getCustomerInitials(customer)

	const accountCount = accounts.length

	return (
		<section className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
			<div className='space-y-2'>
				<div className='inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5'>
					<Sparkles className='size-3.5 text-[#4F46E5]' />

					<span className='text-xs font-semibold text-[#4F46E5]'>
						Your financial overview
					</span>
				</div>

				<div>
					<h1 className='text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'>
						Welcome back, {firstName}
					</h1>

					<p className='mt-1 text-sm leading-6 text-[#6B7280]'>
						Here&apos;s what&apos;s happening with your finances
						today.
					</p>
				</div>
			</div>

			<div className='flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3'>
				<div className='flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-bold text-[#4F46E5]'>
					{initials}
				</div>

				<div className='min-w-0'>
					<p className='truncate text-sm font-semibold text-[#202B49]'>
						{fullName || 'NexBank Customer'}
					</p>

					<p className='text-xs text-[#6B7280]'>
						{accountCount}{' '}
						{accountCount === 1 ? 'account' : 'accounts'}
					</p>
				</div>

				<Landmark className='ml-2 size-5 shrink-0 text-[#9CA3AF]' />
			</div>
		</section>
	)
}