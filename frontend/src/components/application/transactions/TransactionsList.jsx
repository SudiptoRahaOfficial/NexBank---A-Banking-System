import { ArrowLeftRight, Search } from 'lucide-react'

import TransactionRow from './TransactionRow'

export default function TransactionsList({
	transactions,
	totalTransactions,
	onViewDetails,
}) {
	const hasTransactions = transactions.length > 0
	const hasHistory = totalTransactions > 0

	return (
		<section
			aria-labelledby='transactions-list-heading'
			className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'
		>
			{/* Section Header */}
			<div className='flex flex-col gap-2 border-b border-[#E2E5F0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between'>
				<div className='space-y-1'>
					<h2
						id='transactions-list-heading'
						className='text-lg font-semibold text-[#202B49]'
					>
						Transaction History
					</h2>

					<p className='text-sm text-[#6B7280]'>
						Review your recent account activity
					</p>
				</div>

				<p className='text-sm font-medium text-[#6B7280]'>
					Showing{' '}
					<span className='font-semibold text-[#202B49] tabular-nums'>
						{transactions.length}
					</span>{' '}
					of{' '}
					<span className='font-semibold text-[#202B49] tabular-nums'>
						{totalTransactions}
					</span>{' '}
					transactions
				</p>
			</div>

			{hasTransactions ? (
				<div className='overflow-x-auto'>
					<table className='w-full min-w-240 border-collapse text-left'>
						<thead>
							<tr className='border-b border-[#E2E5F0] bg-[#FAFBFF]'>
								<th
									scope='col'
									className='px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]'
								>
									Transaction
								</th>

								<th
									scope='col'
									className='px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]'
								>
									Related Account
								</th>

								<th
									scope='col'
									className='px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]'
								>
									Date & Time
								</th>

								<th
									scope='col'
									className='px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]'
								>
									Amount
								</th>

								<th
									scope='col'
									className='px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-[#6B7280]'
								>
									Status
								</th>

								<th
									scope='col'
									className='px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]'
								>
									Action
								</th>
							</tr>
						</thead>

						<tbody>
							{transactions.map((transaction) => (
								<TransactionRow
									key={transaction.id}
									transaction={transaction}
									onViewDetails={onViewDetails}
								/>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className='flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center'>
					<div className='mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#EEF2FF]'>
						{hasHistory ? (
							<Search
								size={25}
								className='text-[#4F46E5]'
								aria-hidden='true'
							/>
						) : (
							<ArrowLeftRight
								size={25}
								className='text-[#4F46E5]'
								aria-hidden='true'
							/>
						)}
					</div>

					<h3 className='text-base font-semibold text-[#202B49]'>
						{hasHistory
							? 'No matching transactions'
							: 'No transactions yet'}
					</h3>

					<p className='mt-2 max-w-sm text-sm leading-6 text-[#6B7280]'>
						{hasHistory
							? 'Try changing your search or filters to find the transactions you are looking for.'
							: 'Your transaction history will appear here when you start making or receiving transactions.'}
					</p>
				</div>
			)}
		</section>
	)
}