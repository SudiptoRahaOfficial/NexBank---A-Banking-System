import { ArrowDown, ArrowUp, ArrowUpRight, ReceiptText } from 'lucide-react'
import { formatCurrency } from './fund-transfer.utils'

export default function TransferSummary({
	sourceAccount = null,
	destinationAccountId = '',
	amount = '',
}) {
	const numericAmount = Number(amount)

	const hasValidAmount =
		amount !== '' && Number.isFinite(numericAmount) && numericAmount >= 100

	const hasSourceAccount = Boolean(sourceAccount)

	const remainingBalance =
		hasSourceAccount && hasValidAmount
			? sourceAccount.currentBalance - numericAmount
			: null

	return (
		<section
			aria-labelledby='transfer-summary-title'
			className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'
		>
			{/* Header */}
			<div className='flex items-center gap-3 border-b border-[#E2E5F0] px-5 py-4 sm:px-6'>
				<div className='flex size-10 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
					<ReceiptText
						size={20}
						aria-hidden='true'
					/>
				</div>

				<div>
					<h2
						id='transfer-summary-title'
						className='text-base font-semibold text-[#202B49]'
					>
						Transfer summary
					</h2>

					<p className='mt-0.5 text-xs text-[#6B7280]'>
						Review your transfer details
					</p>
				</div>
			</div>

			{/* Summary details */}
			<div className='space-y-5 p-5 sm:p-6'>
				<div className='space-y-4'>
					{/* Source account */}
					<div className='flex items-start gap-3'>
						<div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
							<ArrowUp
								size={16}
								aria-hidden='true'
							/>
						</div>

						<div className='min-w-0 flex-1'>
							<p className='text-xs text-[#6B7280]'>
								From account
							</p>

							<p className='mt-1 break-all font-mono text-sm font-medium text-[#202B49]'>
								{sourceAccount?._id || 'Not selected'}
							</p>
						</div>
					</div>

					{/* Destination account */}
					<div className='flex items-start gap-3'>
						<div className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D]'>
							<ArrowDown
								size={16}
								aria-hidden='true'
							/>
						</div>

						<div className='min-w-0 flex-1'>
							<p className='text-xs text-[#6B7280]'>To account</p>

							<p className='mt-1 break-all font-mono text-sm font-medium text-[#202B49]'>
								{destinationAccountId.trim() || 'Not entered'}
							</p>
						</div>
					</div>
				</div>

				<div className='border-t border-dashed border-[#E2E5F0]' />

				{/* Transfer amount */}
				<div className='flex items-center justify-between gap-4'>
					<span className='text-sm text-[#6B7280]'>
						Transfer amount
					</span>

					<span className='text-base font-semibold text-[#202B49]'>
						{hasValidAmount
							? formatCurrency(numericAmount)
							: formatCurrency(0)}
					</span>
				</div>

				{/* Remaining balance */}
				<div className='rounded-xl bg-[#F4F6FB] p-4'>
					<div className='flex items-center justify-between gap-3'>
						<div>
							<p className='text-sm font-medium text-[#202B49]'>
								Estimated remaining balance
							</p>

							<p className='mt-1 text-xs text-[#6B7280]'>
								After this transfer
							</p>
						</div>

						<div className='text-right'>
							<p className='text-lg font-bold text-[#202B49]'>
								{remainingBalance !== null &&
								remainingBalance >= 0
									? formatCurrency(remainingBalance)
									: '—'}
							</p>
						</div>
					</div>
				</div>

				{/* Minimum transfer note */}
				<div className='flex items-start gap-2 text-xs leading-5 text-[#6B7280]'>
					<ArrowUpRight
						size={15}
						className='mt-0.5 shrink-0 text-[#4F46E5]'
						aria-hidden='true'
					/>

					<p>
						The minimum transfer amount is{' '}
						<span className='font-semibold text-[#202B49]'>
							{formatCurrency(100)}
						</span>
						. Your actual balance will be determined by NexBank when
						the transaction is processed.
					</p>
				</div>
			</div>
		</section>
	)
}