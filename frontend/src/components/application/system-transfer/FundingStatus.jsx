import {
	AlertCircle,
	CheckCircle2,
	Clock3,
	Info,
	RotateCcw,
} from 'lucide-react'
import { formatFundingAmount } from './system-funding.utils'
import { FUNDING_STATUS } from './system-funding.data'

const STATUS_CONFIG = {
	[FUNDING_STATUS.COMPLETED]: {
		title: 'Deposit completed',
		description: 'The initial deposit was completed successfully.',
		icon: CheckCircle2,
		styles: {
			container: 'border-[#BBF7D0] bg-[#F0FDF4]',
			icon: 'bg-[#DCFCE7] text-[#15803D]',
			title: 'text-[#15803D]',
			description: 'text-[#166534]',
		},
	},

	[FUNDING_STATUS.PENDING]: {
		title: 'Deposit pending',
		description:
			'The deposit is still being processed. Do not initiate another deposit for the same operation.',
		icon: Clock3,
		styles: {
			container: 'border-[#FDE68A] bg-[#FFFBEB]',
			icon: 'bg-[#FEF3C7] text-[#B45309]',
			title: 'text-[#B45309]',
			description: 'text-[#92400E]',
		},
	},

	[FUNDING_STATUS.FAILED]: {
		title: 'Deposit failed',
		description:
			'The deposit could not be completed. Review the operation result before attempting another deposit.',
		icon: AlertCircle,
		styles: {
			container: 'border-[#FECACA] bg-[#FEF2F2]',
			icon: 'bg-[#FEE2E2] text-[#DC2626]',
			title: 'text-[#DC2626]',
			description: 'text-[#991B1B]',
		},
	},

	[FUNDING_STATUS.REVERSED]: {
		title: 'Deposit reversed',
		description:
			'The deposit was reversed. Review the transaction record before taking further action.',
		icon: RotateCcw,
		styles: {
			container: 'border-[#E2E5F0] bg-[#F9FAFB]',
			icon: 'bg-[#F3F4F6] text-[#4B5563]',
			title: 'text-[#202B49]',
			description: 'text-[#6B7280]',
		},
	},
}

export default function FundingStatus({ deposit }) {
	if (!deposit) return null

	const config = STATUS_CONFIG[deposit.status]

	if (!config) return null

	const { title, description, icon: Icon, styles } = config

	return (
		<section
			aria-live='polite'
			aria-atomic='true'
			aria-labelledby='funding-status-heading'
			className={`space-y-4 rounded-2xl border p-5 ${styles.container}`}
		>
			<div className='flex items-start gap-3'>
				<div
					className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
				>
					<Icon
						size={22}
						aria-hidden='true'
					/>
				</div>

				<div className='min-w-0 space-y-1'>
					<h2
						id='funding-status-heading'
						className={`font-semibold ${styles.title}`}
					>
						{title}
					</h2>

					<p className={`text-sm leading-6 ${styles.description}`}>
						{description}
					</p>
				</div>
			</div>

			<div className='space-y-3 rounded-xl border border-black/5 bg-white/70 p-4'>
				<div className='flex items-start justify-between gap-4'>
					<span className='text-sm text-[#6B7280]'>
						Deposit reference
					</span>

					<span className='max-w-[65%] break-all text-right text-sm font-medium text-[#202B49]'>
						{deposit.id || 'Unavailable'}
					</span>
				</div>

				<div className='flex items-center justify-between gap-4'>
					<span className='text-sm text-[#6B7280]'>
						Receiver account
					</span>

					<span className='max-w-[65%] break-all text-right text-sm font-medium text-[#202B49]'>
						{deposit.receiverAccount || 'Unavailable'}
					</span>
				</div>

				<div className='flex items-center justify-between gap-4'>
					<span className='text-sm text-[#6B7280]'>
						Deposit amount
					</span>

					<span className='text-right text-sm font-semibold tabular-nums text-[#202B49]'>
						{deposit.amount !== undefined
							? formatFundingAmount(deposit.amount)
							: 'Unavailable'}
					</span>
				</div>

				<div className='flex items-center justify-between gap-4'>
					<span className='text-sm text-[#6B7280]'>Status</span>

					<span className={`text-sm font-semibold ${styles.title}`}>
						{deposit.status}
					</span>
				</div>
			</div>

			{deposit.status === FUNDING_STATUS.PENDING && (
				<div className='flex gap-2 text-xs leading-5 text-[#92400E]'>
					<Info
						size={15}
						className='mt-0.5 shrink-0'
						aria-hidden='true'
					/>
					Check the existing operation status before initiating any
					new funding operation.
				</div>
			)}
		</section>
	)
}