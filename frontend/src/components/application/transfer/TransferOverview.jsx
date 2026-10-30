import { ArrowDownUp, CircleCheck, Wallet } from 'lucide-react'

const transferHighlights = [
	{
		id: 'minimum',
		label: 'Minimum transfer',
		value: '৳100.00',
		description: 'Minimum amount per transaction',
		icon: ArrowDownUp,
		iconClassName: 'bg-[#E9EFFF] text-[#4F46E5]',
	},
	{
		id: 'currency',
		label: 'Transfer currency',
		value: 'BDT',
		description: 'Bangladeshi Taka only',
		icon: Wallet,
		iconClassName: 'bg-[#F0FDF4] text-[#15803D]',
	},
	{
		id: 'account',
		label: 'Account requirement',
		value: 'Active account',
		description: 'Choose an eligible source account',
		icon: CircleCheck,
		iconClassName: 'bg-[#FFF7ED] text-[#B45309]',
	},
]

export default function TransferOverview() {
	return (
		<section
			aria-label='Transfer requirements'
			className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
		>
			{transferHighlights.map((item) => {
				const Icon = item.icon

				return (
					<article
						key={item.id}
						className='flex items-start gap-4 rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6'
					>
						<div
							className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.iconClassName}`}
						>
							<Icon
								size={21}
								strokeWidth={1.8}
								aria-hidden='true'
							/>
						</div>

						<div className='min-w-0'>
							<p className='text-sm font-medium text-[#6B7280]'>
								{item.label}
							</p>

							<p className='mt-1 wrap-break-word text-lg font-semibold text-[#202B49]'>
								{item.value}
							</p>

							<p className='mt-1 text-sm leading-5 text-[#6B7280]'>
								{item.description}
							</p>
						</div>
					</article>
				)
			})}
		</section>
	)
}