import {
	AlertCircle,
	CheckCircle2,
	Clock3,
	RefreshCcw,
	ArrowRight,
	ReceiptText,
} from 'lucide-react'

import { formatCurrency } from './fund-transfer.utils'

const STATUS_CONFIG = {
	COMPLETED: {
		title: 'Transfer completed',
		description: 'Your transfer has been completed successfully.',
		icon: CheckCircle2,
		containerClassName: 'border-[#BBF7D0] bg-[#F0FDF4]',
		iconClassName: 'bg-[#DCFCE7] text-[#15803D]',
		titleClassName: 'text-[#15803D]',
		messageClassName: 'text-[#166534]',
	},
	PENDING: {
		title: 'Transfer pending',
		description:
			'Your transfer has not yet been confirmed. Check the transaction status before attempting another transfer.',
		icon: Clock3,
		containerClassName: 'border-[#FDE68A] bg-[#FFFBEB]',
		iconClassName: 'bg-[#FEF3C7] text-[#B45309]',
		titleClassName: 'text-[#B45309]',
		messageClassName: 'text-[#92400E]',
	},
	FAILED: {
		title: 'Transfer failed',
		description:
			'Your transfer could not be completed. Review the details before trying again.',
		icon: AlertCircle,
		containerClassName: 'border-[#FECACA] bg-[#FEF2F2]',
		iconClassName: 'bg-[#FEE2E2] text-[#DC2626]',
		titleClassName: 'text-[#DC2626]',
		messageClassName: 'text-[#991B1B]',
	},
	REVERSED: {
		title: 'Transfer reversed',
		description:
			'This transaction was reversed. Check your account balance and transaction history.',
		icon: RefreshCcw,
		containerClassName: 'border-[#FED7AA] bg-[#FFF7ED]',
		iconClassName: 'bg-[#FFEDD5] text-[#C2410C]',
		titleClassName: 'text-[#C2410C]',
		messageClassName: 'text-[#9A3412]',
	},
}

export default function TransferStatus({
	status = '',
	transaction = null,
	message = '',
	onRetry,
	onNewTransfer,
}) {
	const normalizedStatus = status.toUpperCase()
	const config = STATUS_CONFIG[normalizedStatus]

	if (!config) {
		return (
			<div
				role='alert'
				className='rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4 text-sm text-[#991B1B]'
			>
				Unknown transaction status. Please verify your transaction
				details.
			</div>
		)
	}

	const Icon = config.icon

	const transactionId = transaction?.id

	const amount = transaction?.amount

	const fromAccount = transaction?.fromAccount

	const toAccount = transaction?.toAccount

	return (
		<section
			aria-labelledby='transfer-status-title'
			className={`overflow-hidden rounded-2xl border ${config.containerClassName}`}
		>
			<div className='p-5 sm:p-6'>
				{/* Status heading */}
				<div className='flex items-start gap-4'>
					<div
						className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${config.iconClassName}`}
					>
						<Icon
							size={25}
							strokeWidth={1.8}
							aria-hidden='true'
						/>
					</div>

					<div className='min-w-0 flex-1'>
						<h2
							id='transfer-status-title'
							className={`text-lg font-bold ${config.titleClassName}`}
						>
							{config.title}
						</h2>

						<p
							className={`mt-1 text-sm leading-6 ${config.messageClassName}`}
						>
							{message || config.description}
						</p>
					</div>
				</div>

				{/* Transaction details */}
				{transaction && (
					<div className='mt-5 rounded-xl border border-black/5 bg-white/80 p-4'>
						<div className='mb-4 flex items-center gap-2'>
							<ReceiptText
								size={17}
								className='text-[#6B7280]'
								aria-hidden='true'
							/>

							<h3 className='text-sm font-semibold text-[#202B49]'>
								Transaction details
							</h3>
						</div>

						<div className='space-y-3'>
							{transactionId && (
								<div className='flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between'>
									<span className='text-xs text-[#6B7280]'>
										Transaction ID
									</span>

									<span className='break-all font-mono text-xs font-medium text-[#202B49] sm:max-w-[65%] sm:text-right'>
										{transactionId}
									</span>
								</div>
							)}

							{amount !== undefined && (
								<div className='flex items-center justify-between gap-3'>
									<span className='text-xs text-[#6B7280]'>
										Amount
									</span>

									<span className='text-sm font-semibold text-[#202B49]'>
										{formatCurrency(amount)}
									</span>
								</div>
							)}

							{fromAccount && (
								<div className='flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between'>
									<span className='text-xs text-[#6B7280]'>
										From account
									</span>

									<span className='break-all font-mono text-xs text-[#202B49] sm:max-w-[65%] sm:text-right'>
										{fromAccount}
									</span>
								</div>
							)}

							{toAccount && (
								<div className='flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between'>
									<span className='text-xs text-[#6B7280]'>
										To account
									</span>

									<span className='break-all font-mono text-xs text-[#202B49] sm:max-w-[65%] sm:text-right'>
										{toAccount}
									</span>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Actions */}
				<div className='mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					{normalizedStatus === 'FAILED' && onRetry && (
						<button
							type='button'
							onClick={onRetry}
							className='inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E5F0] bg-white px-5 py-3 text-sm font-semibold text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							<RefreshCcw
								size={16}
								aria-hidden='true'
							/>
							Try again
						</button>
					)}

					{onNewTransfer && normalizedStatus !== 'PENDING' && (
						<button
							type='button'
							onClick={onNewTransfer}
							className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							New transfer
							<ArrowRight
								size={16}
								aria-hidden='true'
							/>
						</button>
					)}
				</div>
			</div>
		</section>
	)
}