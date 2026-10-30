import { Wallet } from 'lucide-react'

function formatCurrency(amount, currency) {
	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

const STATUS_STYLES = {
	ACTIVE: 'bg-[#DCFCE7] text-[#15803D]',
	INACTIVE: 'bg-[#F3F4F6] text-[#6B7280]',
}

export default function AccountCard({ account, balance }) {
	const isValidBalance =
		typeof balance === 'number' && Number.isFinite(balance)

	const status = account.status?.toUpperCase() || 'UNKNOWN'

	const statusStyles = STATUS_STYLES[status] || 'bg-[#F3F4F6] text-[#6B7280]'

	return (
		<article className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6'>
			<div className='flex items-start justify-between gap-3'>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
						<Wallet
							size={21}
							aria-hidden='true'
						/>
					</div>

					<div className='min-w-0 space-y-1'>
						<h3 className='text-base font-semibold text-[#202B49]'>
							Bank Account
						</h3>

						<p className='text-xs font-medium text-[#6B7280]'>
							{account.currency} Account
						</p>
					</div>
				</div>

				<span
					className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
				>
					{status}
				</span>
			</div>

			<div className='mt-6 space-y-2'>
				<p className='text-xs font-medium text-[#6B7280]'>Account ID</p>

				<p
					title={account._id}
					className='break-all font-mono text-sm font-medium text-[#202B49]'
				>
					{account._id}
				</p>
			</div>

			<div className='mt-5 border-t border-[#E2E5F0] pt-5'>
				<p className='text-xs font-medium text-[#6B7280]'>
					Available Balance
				</p>

				<p className='mt-1 text-xl font-semibold tracking-tight text-[#202B49] tabular-nums sm:text-2xl'>
					{isValidBalance
						? formatCurrency(balance, account.currency)
						: 'Unavailable'}
				</p>

				{!isValidBalance && (
					<p className='mt-1 text-xs text-[#B45309]'>
						Balance information is currently unavailable.
					</p>
				)}
			</div>
		</article>
	)
}