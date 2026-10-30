import {
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	CheckCircle2,
	LoaderCircle,
} from 'lucide-react'
import { formatCurrency } from './fund-transfer.utils'

export default function TransferConfirmation({
	sourceAccount = null,
	destinationAccountId = '',
	amount = '',
	onConfirm,
	onCancel,
	isProcessing = false,
}) {
	const numericAmount = Number(amount)

	const formattedAmount =
		Number.isFinite(numericAmount) && numericAmount > 0
			? formatCurrency(numericAmount)
			: formatCurrency(0)

	return (
		<section
			aria-labelledby='transfer-confirmation-title'
			aria-busy={isProcessing}
			className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'
		>
			{/* Header */}
			<div className='border-b border-[#E2E5F0] px-5 py-4 sm:px-6'>
				<div className='flex items-center gap-3'>
					<div className='flex size-10 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
						<CheckCircle2
							size={20}
							aria-hidden='true'
						/>
					</div>

					<div>
						<h2
							id='transfer-confirmation-title'
							className='text-base font-semibold text-[#202B49]'
						>
							Confirm your transfer
						</h2>

						<p className='mt-0.5 text-xs text-[#6B7280]'>
							Review the details before proceeding
						</p>
					</div>
				</div>
			</div>

			<div className='space-y-5 p-5 sm:p-6'>
				{/* Amount */}
				<div className='rounded-xl bg-[#F4F6FB] px-4 py-5 text-center'>
					<p className='text-sm text-[#6B7280]'>
						You are transferring
					</p>

					<p className='mt-2 text-3xl font-bold tracking-tight text-[#202B49]'>
						{formattedAmount}
					</p>
				</div>

				{/* Account details */}
				<div className='space-y-4'>
					<div className='flex items-start gap-3'>
						<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
							<ArrowUp
								size={17}
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

					<div className='flex items-start gap-3'>
						<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F0FDF4] text-[#15803D]'>
							<ArrowDown
								size={17}
								aria-hidden='true'
							/>
						</div>

						<div className='min-w-0 flex-1'>
							<p className='text-xs text-[#6B7280]'>
								Recipient account
							</p>

							<p className='mt-1 break-all font-mono text-sm font-medium text-[#202B49]'>
								{destinationAccountId.trim() || 'Not entered'}
							</p>
						</div>
					</div>
				</div>

				{/* Warning */}
				<div
					role='note'
					className='flex items-start gap-3 rounded-xl border border-[#FDE7C3] bg-[#FFFBEB] p-4'
				>
					<AlertTriangle
						size={18}
						className='mt-0.5 shrink-0 text-[#B45309]'
						aria-hidden='true'
					/>

					<p className='text-xs leading-5 text-[#92400E]'>
						Please verify the recipient account ID and transfer
						amount carefully. Do not proceed if any information is
						incorrect.
					</p>
				</div>

				{/* Actions */}
				<div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					<button
						type='button'
						onClick={onCancel}
						disabled={isProcessing}
						className='inline-flex items-center justify-center rounded-xl border border-[#E2E5F0] bg-white px-5 py-3 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-60'
					>
						Cancel
					</button>

					<button
						type='button'
						onClick={onConfirm}
						disabled={isProcessing}
						className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-60'
					>
						{isProcessing ? (
							<>
								<LoaderCircle
									size={17}
									className='animate-spin'
									aria-hidden='true'
								/>
								Processing...
							</>
						) : (
							'Confirm transfer'
						)}
					</button>
				</div>

				{isProcessing && (
					<p
						role='status'
						className='text-center text-xs text-[#6B7280]'
					>
						Please wait while the transfer is being processed.
					</p>
				)}
			</div>
		</section>
	)
}