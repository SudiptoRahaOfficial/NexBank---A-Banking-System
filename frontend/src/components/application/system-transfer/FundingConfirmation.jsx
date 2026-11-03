import { AlertTriangle, ArrowRight, ShieldCheck, X } from 'lucide-react'
import { formatFundingAmount } from './system-funding.utils'

export default function FundingConfirmation({
	receiverAccountId,
	amount,
	onConfirm,
	onCancel,
	isSubmitting = false,
}) {
	return (
		<div
			role='dialog'
			aria-modal='true'
			aria-labelledby='funding-confirmation-heading'
			aria-describedby='funding-confirmation-description'
			className='w-full max-w-lg rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-xl sm:p-6'
		>
			<div className='flex items-start justify-between gap-4'>
				<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#B45309]'>
					<AlertTriangle
						size={21}
						aria-hidden='true'
					/>
				</div>

				<button
					type='button'
					onClick={onCancel}
					disabled={isSubmitting}
					aria-label='Close confirmation'
					className='rounded-lg p-2 text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50'
				>
					<X
						size={18}
						aria-hidden='true'
					/>
				</button>
			</div>

			<div className='mt-4 space-y-2'>
				<h2
					id='funding-confirmation-heading'
					className='text-lg font-semibold text-[#202B49]'
				>
					Confirm initial deposit
				</h2>

				<p
					id='funding-confirmation-description'
					className='text-sm leading-6 text-[#6B7280]'
				>
					Review the following details carefully. Confirming will
					initiate the initial funding operation.
				</p>
			</div>

			<div className='mt-5 space-y-4 rounded-xl border border-[#E2E5F0] bg-[#F9FAFF] p-4'>
				<div className='flex items-start justify-between gap-4'>
					<span className='text-sm text-[#6B7280]'>
						Receiver account
					</span>

					<span className='max-w-[65%] break-all text-right text-sm font-medium text-[#202B49]'>
						{receiverAccountId}
					</span>
				</div>

				<div className='flex items-center justify-between gap-4 border-t border-[#E2E5F0] pt-4'>
					<span className='text-sm text-[#6B7280]'>
						Deposit amount
					</span>

					<span className='text-right text-lg font-semibold tabular-nums text-[#202B49]'>
						{formatFundingAmount(Number(amount))}
					</span>
				</div>
			</div>

			<div className='mt-4 flex gap-3 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5'>
				<ShieldCheck
					size={18}
					className='mt-0.5 shrink-0 text-[#B45309]'
					aria-hidden='true'
				/>

				<p className='text-xs leading-5 text-[#92400E]'>
					Only confirm after checking the receiver account ID and
					amount. Do not initiate another deposit if the result of
					this operation is unknown or pending.
				</p>
			</div>

			<div className='mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
				<button
					type='button'
					onClick={onCancel}
					disabled={isSubmitting}
					className='inline-flex items-center justify-center rounded-xl border border-[#E2E5F0] bg-white px-4 py-2.5 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50'
				>
					Cancel
				</button>

				<button
					type='button'
					onClick={onConfirm}
					disabled={isSubmitting}
					className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-60'
				>
					{isSubmitting ? (
						<>
							<span
								className='size-4 animate-spin rounded-full border-2 border-white/40 border-t-white'
								aria-hidden='true'
							/>
							Processing...
						</>
					) : (
						<>
							Confirm deposit
							<ArrowRight
								size={16}
								aria-hidden='true'
							/>
						</>
					)}
				</button>
			</div>
		</div>
	)
}