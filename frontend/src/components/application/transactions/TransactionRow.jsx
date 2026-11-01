import { ArrowDownLeft, ArrowUpRight, Eye } from 'lucide-react'

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

function formatTransactionDate(dateValue) {
	const date = new Date(dateValue)

	return {
		date: new Intl.DateTimeFormat('en-BD', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		}).format(date),

		time: new Intl.DateTimeFormat('en-BD', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		}).format(date),
	}
}

export default function TransactionRow({ transaction, onViewDetails }) {
	const isSent = transaction.direction === 'SENT'

	const relatedAccount = isSent
		? transaction.toAccount
		: transaction.fromAccount

	const { date, time } = formatTransactionDate(transaction.createdAt)

	const statusStyle =
		STATUS_STYLES[transaction.status] || 'bg-[#F3F4F6] text-[#6B7280]'

	return (
		<tr className='border-b border-[#E2E5F0] last:border-b-0 hover:bg-[#F9FAFF]'>
			{/* Transaction */}
			<td className='px-2 py-4 align-middle sm:px-3 lg:px-4'>
				<div className='flex min-w-0 items-center gap-2'>
					<div
						className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
							isSent
								? 'bg-[#FEE2E2] text-[#DC2626]'
								: 'bg-[#DCFCE7] text-[#15803D]'
						}`}
					>
						{isSent ? (
							<ArrowUpRight size={16} />
						) : (
							<ArrowDownLeft size={16} />
						)}
					</div>

					<div className='min-w-0 flex-1'>
						<p className='text-xs font-semibold text-[#202B49] sm:text-sm'>
							{isSent ? 'Money Sent' : 'Money Received'}
						</p>

						<p className='mt-1 break-all text-[10px] leading-4 text-[#6B7280] sm:text-xs'>
							{transaction.id}
						</p>
					</div>
				</div>
			</td>

			{/* Related Account */}
			<td className='px-2 py-4 align-middle sm:px-3 lg:px-4'>
				<p className='break-all text-xs font-medium leading-5 text-[#202B49] sm:text-sm'>
					{relatedAccount}
				</p>
			</td>

			{/* Date & Time */}
			<td className='px-2 py-4 align-middle sm:px-3 lg:px-4'>
				<div className='space-y-1'>
					<p className='text-xs font-medium text-[#202B49]'>{date}</p>

					<p className='text-[11px] text-[#6B7280]'>{time}</p>
				</div>
			</td>

			{/* Amount */}
			<td className='px-2 py-4 align-middle sm:px-3 lg:px-4'>
				<p
					className={`text-xs font-semibold sm:text-sm ${
						isSent ? 'text-[#DC2626]' : 'text-[#15803D]'
					}`}
				>
					{isSent ? '-' : '+'}
					{formatCurrency(transaction.amount, 'BDT')}
				</p>
			</td>

			{/* Status */}
			<td className='px-2 py-4 align-middle sm:px-3 lg:px-4'>
				<span
					className={`inline-flex max-w-full justify-center rounded-full px-2 py-1 text-center text-[10px] font-semibold leading-4 sm:text-xs ${statusStyle}`}
				>
					{transaction.status}
				</span>
			</td>

			{/* Action */}
			<td className='px-2 py-4 text-center align-middle'>
				<button
					type='button'
					onClick={() => onViewDetails(transaction)}
					aria-label={`View details for transaction ${transaction.id}`}
					title='View transaction details'
					className='inline-flex size-8 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#E9EFFF] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
				>
					<Eye size={16} />
				</button>
			</td>
		</tr>
	)
}