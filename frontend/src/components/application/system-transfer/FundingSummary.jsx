import { ArrowDownToLine, Hash, Wallet } from 'lucide-react'
import { formatFundingAmount } from './system-funding.utils'

export default function FundingSummary({ receiverAccountId, amount }) {
	const hasReceiver = Boolean(receiverAccountId?.trim())
	const hasAmount = amount !== '' && Number.isFinite(Number(amount))

	return (
		<section
			aria-labelledby='funding-summary-heading'
			className='space-y-4 rounded-2xl border border-[#E2E5F0] bg-[#F9FAFF] p-4 sm:p-5'
		>
			<div className='flex items-center gap-2'>
				<div className='flex size-9 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
					<ArrowDownToLine
						size={18}
						aria-hidden='true'
					/>
				</div>

				<div>
					<h3
						id='funding-summary-heading'
						className='text-sm font-semibold text-[#202B49]'
					>
						Deposit summary
					</h3>
					<p className='text-xs text-[#6B7280]'>
						Review the details before continuing.
					</p>
				</div>
			</div>

			<div className='space-y-3'>
				<div className='flex items-start justify-between gap-4 border-b border-[#E2E5F0] pb-3'>
					<div className='flex items-center gap-2 text-sm text-[#6B7280]'>
						<Hash
							size={15}
							aria-hidden='true'
						/>
						Receiver account
					</div>

					<p className='max-w-[65%] break-all text-right text-sm font-medium text-[#202B49]'>
						{hasReceiver ? receiverAccountId : 'Not provided'}
					</p>
				</div>

				<div className='flex items-center justify-between gap-4'>
					<div className='flex items-center gap-2 text-sm text-[#6B7280]'>
						<Wallet
							size={15}
							aria-hidden='true'
						/>
						Deposit amount
					</div>

					<p className='text-right text-base font-semibold tabular-nums text-[#202B49]'>
						{hasAmount
							? formatFundingAmount(Number(amount))
							: '৳0.00'}
					</p>
				</div>
			</div>

			<p className='text-xs leading-5 text-[#6B7280]'>
				This summary reflects the values entered in the form. It does
				not confirm account ownership, account status, or deposit
				completion.
			</p>
		</section>
	)
}