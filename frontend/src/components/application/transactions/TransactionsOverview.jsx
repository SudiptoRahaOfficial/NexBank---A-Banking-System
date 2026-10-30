import {
	ArrowDownLeft,
	ArrowLeftRight,
	ArrowUpRight,
	CheckCircle2,
} from 'lucide-react'

import { MOCK_TRANSACTIONS_RESPONSE } from './transactions.data'

const transactions = MOCK_TRANSACTIONS_RESPONSE.transactions

const overviewItems = [
	{
		label: 'Total Transactions',
		value: transactions.length,
		icon: ArrowLeftRight,
		iconBackground: 'bg-[#EEF2FF]',
		iconColor: 'text-[#4F46E5]',
	},
	{
		label: 'Money Sent',
		value: transactions.filter(
			(transaction) => transaction.direction === 'SENT',
		).length,
		icon: ArrowUpRight,
		iconBackground: 'bg-[#FEF2F2]',
		iconColor: 'text-[#DC2626]',
	},
	{
		label: 'Money Received',
		value: transactions.filter(
			(transaction) => transaction.direction === 'RECEIVED',
		).length,
		icon: ArrowDownLeft,
		iconBackground: 'bg-[#F0FDF4]',
		iconColor: 'text-[#15803D]',
	},
	{
		label: 'Completed Transactions',
		value: transactions.filter(
			(transaction) => transaction.status === 'COMPLETED',
		).length,
		icon: CheckCircle2,
		iconBackground: 'bg-[#ECFDF5]',
		iconColor: 'text-[#15803D]',
	},
]

export default function TransactionsOverview() {
	return (
		<section
			aria-labelledby='transactions-overview-heading'
			className='space-y-4'
		>
			<div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
				<h2
					id='transactions-overview-heading'
					className='text-lg font-semibold text-[#202B49]'
				>
					Transaction Overview
				</h2>

				<p className='text-xs text-[#6B7280] sm:text-sm'>
					Based on currently available records
				</p>
			</div>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{overviewItems.map((item) => {
					const Icon = item.icon

					return (
						<div
							key={item.label}
							className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md'
						>
							<div className='flex items-center justify-between gap-4'>
								<div
									className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.iconBackground}`}
									aria-hidden='true'
								>
									<Icon
										size={21}
										strokeWidth={1.8}
										className={item.iconColor}
									/>
								</div>
							</div>

							<div className='mt-5 space-y-1'>
								<p className='text-sm font-medium text-[#6B7280]'>
									{item.label}
								</p>

								<p className='text-2xl font-semibold tracking-tight text-[#202B49] tabular-nums'>
									{item.value.toLocaleString('en-US')}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}