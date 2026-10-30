import { ArrowDownLeft, ArrowUpRight, Eye } from 'lucide-react'

const STATUS_STYLES = {
	COMPLETED: 'bg-[#ECFDF5] text-[#15803D]',
	PENDING: 'bg-[#FFFBEB] text-[#B45309]',
	FAILED: 'bg-[#FEF2F2] text-[#DC2626]',
	REVERSED: 'bg-[#F3F4F6] text-[#4B5563]',
}

function formatTransactionDate(dateValue) {
	const date = new Date(dateValue)

	if (Number.isNaN(date.getTime())) {
		return 'Invalid date'
	}

	return new Intl.DateTimeFormat('en-BD', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(date)
}

function formatTransactionAmount(amount) {
	return new Intl.NumberFormat('en-BD', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

function getAccountId(transaction) {
	return transaction.direction === 'SENT'
		? transaction.toAccount
		: transaction.fromAccount
}

export default function TransactionRow({ transaction, onViewDetails }) {
	const isSent = transaction.direction === 'SENT'
	const DirectionIcon = isSent ? ArrowUpRight : ArrowDownLeft

	const directionLabel = isSent ? 'Sent' : 'Received'
	const amountPrefix = isSent ? '−' : '+'
	const statusStyle =
		STATUS_STYLES[transaction.status] ?? 'bg-[#F3F4F6] text-[#4B5563]'

	return (
		<tr className='border-b border-[#E2E5F0] last:border-b-0 transition-colors hover:bg-[#FAFBFF]'>
			{/* Transaction */}
			<td className='px-5 py-4'>
				<div className='flex min-w-52 items-center gap-3'>
					<div
						className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
							isSent ? 'bg-[#FEF2F2]' : 'bg-[#ECFDF5]'
						}`}
						aria-hidden='true'
					>
						<DirectionIcon
							size={19}
							strokeWidth={1.8}
							className={
								isSent ? 'text-[#DC2626]' : 'text-[#15803D]'
							}
						/>
					</div>

					<div className='min-w-0 space-y-1'>
						<p className='text-sm font-semibold text-[#202B49]'>
							{directionLabel}
						</p>

						<p
							className='max-w-44 truncate text-xs text-[#6B7280]'
							title={transaction.id}
						>
							{transaction.id}
						</p>
					</div>
				</div>
			</td>

			{/* Related Account */}
			<td className='px-5 py-4'>
				<p
					className='max-w-48 truncate text-sm text-[#202B49]'
					title={getAccountId(transaction)}
				>
					{getAccountId(transaction)}
				</p>
			</td>

			{/* Date */}
			<td className='whitespace-nowrap px-5 py-4'>
				<p className='text-sm text-[#202B49]'>
					{formatTransactionDate(transaction.createdAt)}
				</p>
			</td>

			{/* Amount */}
			<td className='whitespace-nowrap px-5 py-4 text-right'>
				<p
					className={`text-sm font-semibold tabular-nums ${
						isSent ? 'text-[#DC2626]' : 'text-[#15803D]'
					}`}
				>
					{amountPrefix}BDT{' '}
					{formatTransactionAmount(transaction.amount)}
				</p>
			</td>

			{/* Status */}
			<td className='whitespace-nowrap px-5 py-4'>
				<span
					className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
				>
					{transaction.status}
				</span>
			</td>

			{/* Actions */}
			<td className='px-5 py-4 text-right'>
				<button
					type='button'
					onClick={() => onViewDetails(transaction)}
					aria-label={`View details for transaction ${transaction.id}`}
					className='inline-flex size-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#EEF2FF] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					<Eye
						size={18}
						strokeWidth={1.8}
						aria-hidden='true'
					/>
				</button>
			</td>
		</tr>
	)
}