import Link from 'next/link'
import {
	ArrowDownLeft,
	ArrowUpRight,
	ReceiptText,
	ArrowRight,
} from 'lucide-react'

import DashboardCard from '@/components/application/ui/DashboardCard'
import SectionHeading from '@/components/application/ui/SectionHeading'
import { MOCK_DASHBOARD_DATA } from '@/components/application/dashboard/dashboardData'

const formatCurrency = (amount, currency) =>
	new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)

const formatDate = (dateString) =>
	new Intl.DateTimeFormat('en-BD', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'Asia/Dhaka',
	}).format(new Date(dateString))

const STATUS_STYLES = {
	Completed: 'bg-green-50 text-[#15803D]',
	Pending: 'bg-amber-50 text-[#B45309]',
	Failed: 'bg-red-50 text-[#DC2626]',
}

export default function RecentTransactions() {
	const transactions = MOCK_DASHBOARD_DATA.transactions

	return (
		<section aria-label='Recent transactions'>
			<SectionHeading
				title='Recent transactions'
				description='A quick look at your latest account activity.'
				action={
					<Link
						href='/transactions'
						className='inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-[#4F46E5] hover:bg-[#E9EFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						View all
						<ArrowRight
							size={16}
							aria-hidden='true'
						/>
					</Link>
				}
			/>

			<DashboardCard className='overflow-hidden p-0'>
				{transactions.length === 0 ? (
					<div className='flex flex-col items-center px-5 py-12 text-center'>
						<span className='flex size-12 items-center justify-center rounded-full bg-[#F4F6FB] text-[#6B7280]'>
							<ReceiptText
								size={22}
								aria-hidden='true'
							/>
						</span>

						<h3 className='mt-4 text-base font-semibold text-[#202B49]'>
							No transactions yet
						</h3>

						<p className='mt-2 max-w-sm text-sm leading-6 text-[#6B7280]'>
							Your account activity will appear here when
							transactions become available.
						</p>
					</div>
				) : (
					<ul className='divide-y divide-[#E2E5F0]'>
						{transactions.map((transaction) => {
							const isCredit = transaction.direction === 'credit'

							const statusClass =
								STATUS_STYLES[transaction.status] ??
								'bg-[#F4F6FB] text-[#6B7280]'

							return (
								<li key={transaction.id}>
									<Link
										href={`/transactions/${transaction.id}`}
										className='flex min-w-0 flex-col gap-3 px-4 py-4 transition-colors hover:bg-[#FAFBFF] focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#4F46E5] sm:flex-row sm:items-center sm:justify-between sm:px-6'
									>
										<div className='flex min-w-0 items-center gap-3'>
											<span
												className={[
													'flex size-11 shrink-0 items-center justify-center rounded-full',
													isCredit
														? 'bg-green-50 text-[#15803D]'
														: 'bg-[#E9EFFF] text-[#4F46E5]',
												].join(' ')}
											>
												{isCredit ? (
													<ArrowDownLeft
														size={21}
														aria-hidden='true'
													/>
												) : (
													<ArrowUpRight
														size={21}
														aria-hidden='true'
													/>
												)}
											</span>

											<div className='min-w-0'>
												<p className='truncate text-sm font-semibold text-[#202B49]'>
													{transaction.title}
												</p>

												<p className='mt-1 truncate text-xs text-[#6B7280] sm:text-sm'>
													{transaction.description}
													{' · '}
													{formatDate(
														transaction.date,
													)}
												</p>
											</div>
										</div>

										<div className='flex items-center justify-between gap-3 pl-14 sm:justify-end sm:pl-0'>
											<span
												className={[
													'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold',
													statusClass,
												].join(' ')}
											>
												{transaction.status}
											</span>

											<span
												className={[
													'whitespace-nowrap text-sm font-semibold tabular-nums',
													isCredit
														? 'text-[#15803D]'
														: 'text-[#202B49]',
												].join(' ')}
											>
												{isCredit ? '+' : '−'}
												{formatCurrency(
													transaction.amount,
													transaction.currency,
												)}
											</span>
										</div>
									</Link>
								</li>
							)
						})}
					</ul>
				)}
			</DashboardCard>
		</section>
	)
}
