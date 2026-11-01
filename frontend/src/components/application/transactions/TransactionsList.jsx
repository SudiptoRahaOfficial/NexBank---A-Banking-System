import { ArrowDownLeft, ArrowUpRight, Eye } from 'lucide-react'

import TransactionRow from './TransactionRow'

const STATUS_STYLES = {
	COMPLETED: 'bg-[#DCFCE7] text-[#15803D]',
	PENDING: 'bg-[#FEF3C7] text-[#B45309]',
	FAILED: 'bg-[#FEE2E2] text-[#DC2626]',
	REVERSED: 'bg-[#F3F4F6] text-[#6B7280]',
}

function formatCurrency(amount, currency = 'BDT') {
	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

function formatDate(dateValue) {
	return new Intl.DateTimeFormat('en-BD', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(new Date(dateValue))
}

function MobileTransactionCard({ transaction, onViewDetails }) {
	const isSent = transaction.direction === 'SENT'

	const relatedAccount = isSent
		? transaction.toAccount
		: transaction.fromAccount

	const statusStyle =
		STATUS_STYLES[transaction.status] || 'bg-[#F3F4F6] text-[#6B7280]'

	return (
		<article className='rounded-xl border border-[#E2E5F0] bg-white p-4'>
			{/* Transaction heading */}
			<div className='flex items-start justify-between gap-3'>
				<div className='flex min-w-0 items-center gap-3'>
					<div
						className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
							isSent
								? 'bg-[#FEE2E2] text-[#DC2626]'
								: 'bg-[#DCFCE7] text-[#15803D]'
						}`}
					>
						{isSent ? (
							<ArrowUpRight size={19} />
						) : (
							<ArrowDownLeft size={19} />
						)}
					</div>

					<div className='min-w-0'>
						<p className='text-sm font-semibold text-[#202B49]'>
							{isSent ? 'Money Sent' : 'Money Received'}
						</p>

						<p className='mt-1 break-all text-xs text-[#6B7280]'>
							{transaction.id}
						</p>
					</div>
				</div>

				<span
					className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle}`}
				>
					{transaction.status}
				</span>
			</div>

			{/* Amount */}
			<div className='mt-4'>
				<p className='text-xs text-[#6B7280]'>Amount</p>

				<p
					className={`mt-1 text-lg font-bold ${
						isSent ? 'text-[#DC2626]' : 'text-[#15803D]'
					}`}
				>
					{isSent ? '-' : '+'}
					{formatCurrency(transaction.amount, 'BDT')}
				</p>
			</div>

			{/* Transaction information */}
			<div className='mt-4 space-y-3 border-t border-[#E2E5F0] pt-3'>
				<div>
					<p className='text-xs text-[#6B7280]'>
						{isSent ? 'Recipient Account' : 'Sender Account'}
					</p>

					<p className='mt-1 break-all text-sm font-medium text-[#202B49]'>
						{relatedAccount}
					</p>
				</div>

				<div>
					<p className='text-xs text-[#6B7280]'>Date & Time</p>

					<p className='mt-1 text-sm text-[#202B49]'>
						{formatDate(transaction.createdAt)}
					</p>
				</div>
			</div>

			{/* Action */}
			<button
				type='button'
				onClick={() => onViewDetails(transaction)}
				className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E2E5F0] px-3 py-2.5 text-sm font-medium text-[#4F46E5] transition-colors hover:bg-[#E9EFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
			>
				<Eye size={16} />
				View Details
			</button>
		</article>
	)
}

export default function TransactionsList({
	transactions,
	totalTransactions,
	onViewDetails,
}) {
	const hasTransactions = transactions.length > 0
	const hasHistory = totalTransactions > 0

	return (
		<section className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'>
			{/* Section heading */}
			<div className='border-b border-[#E2E5F0] px-4 py-5 sm:px-6'>
				<h2 className='text-base font-semibold text-[#202B49]'>
					Transaction History
				</h2>

				<p className='mt-1 text-sm text-[#6B7280]'>
					Showing {transactions.length} transactions
				</p>
			</div>

			{hasTransactions ? (
				<>
					{/* Mobile transaction cards */}
					<div className='space-y-3 p-4 md:hidden'>
						{transactions.map((transaction) => (
							<MobileTransactionCard
								key={transaction.id}
								transaction={transaction}
								onViewDetails={onViewDetails}
							/>
						))}
					</div>

					{/* Desktop transaction table */}
					<div className='hidden w-full md:block'>
						<table className='w-full table-fixed border-collapse text-left'>
							<thead className='bg-[#F9FAFF]'>
								<tr className='border-b border-[#E2E5F0]'>
									<th className='w-[25%] px-3 py-3.5 text-xs font-semibold text-[#6B7280] lg:px-5'>
										Transaction
									</th>

									<th className='w-[19%] px-3 py-3.5 text-xs font-semibold text-[#6B7280] lg:px-5'>
										Related Account
									</th>

									<th className='w-[20%] px-3 py-3.5 text-xs font-semibold text-[#6B7280] lg:px-5'>
										Date & Time
									</th>

									<th className='w-[16%] px-3 py-3.5 text-xs font-semibold text-[#6B7280] lg:px-5'>
										Amount
									</th>

									<th className='w-[12%] px-3 py-3.5 text-xs font-semibold text-[#6B7280] lg:px-5'>
										Status
									</th>

									<th className='w-[8%] px-2 py-3.5 text-center text-xs font-semibold text-[#6B7280]'>
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
				</>
			) : (
				<div className='px-4 py-14 text-center sm:px-6'>
					<h3 className='text-sm font-semibold text-[#202B49]'>
						{hasHistory
							? 'No matching transactions'
							: 'No transactions yet'}
					</h3>

					<p className='mx-auto mt-2 max-w-sm text-sm text-[#6B7280]'>
						{hasHistory
							? 'Try adjusting your search or filters to find the transaction you are looking for.'
							: 'Your transaction history will appear here once you make or receive a transaction.'}
					</p>
				</div>
			)}
		</section>
	)
}