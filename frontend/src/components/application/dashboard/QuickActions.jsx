import Link from 'next/link'
import {
	ArrowLeftRight,
	Wallet,
	ReceiptText,
	Plus,
	ArrowUpRight,
} from 'lucide-react'

import DashboardCard from '@/components/application/ui/DashboardCard'
import SectionHeading from '@/components/application/ui/SectionHeading'

const QUICK_ACTIONS = [
	{
		title: 'Transfer funds',
		description: 'Move money between accounts.',
		href: '/transfer',
		icon: ArrowLeftRight,
		iconClass: 'bg-[#E9EFFF] text-[#4F46E5]',
	},
	{
		title: 'My accounts',
		description: 'Review your bank accounts.',
		href: '/accounts',
		icon: Wallet,
		iconClass: 'bg-blue-50 text-blue-700',
	},
	{
		title: 'Transactions',
		description: 'Review your transaction history.',
		href: '/transactions',
		icon: ReceiptText,
		iconClass: 'bg-violet-50 text-violet-700',
	},
	{
		title: 'Open an account',
		description: 'Explore account creation.',
		href: '/accounts/create-account',
		icon: Plus,
		iconClass: 'bg-green-50 text-green-700',
	},
]

export default function QuickActions() {
	return (
		<section aria-label='Quick banking actions'>
			<SectionHeading
				title='Quick actions'
				description='Get things done with fewer steps.'
			/>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{QUICK_ACTIONS.map((action) => {
					const Icon = action.icon

					return (
						<Link
							key={action.href}
							href={action.href}
							className='group rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							<DashboardCard className='h-full transition-colors group-hover:border-[#C7D2FE] group-hover:bg-[#FCFCFF]'>
								<div className='flex items-start justify-between gap-3'>
									<span
										className={[
											'flex size-12 shrink-0 items-center justify-center rounded-xl',
											action.iconClass,
										].join(' ')}
									>
										<Icon
											size={22}
											aria-hidden='true'
										/>
									</span>

									<ArrowUpRight
										size={18}
										aria-hidden='true'
										className='text-[#9CA3AF] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4F46E5]'
									/>
								</div>

								<h3 className='mt-5 text-base font-semibold text-[#202B49]'>
									{action.title}
								</h3>

								<p className='mt-2 text-sm leading-6 text-[#6B7280]'>
									{action.description}
								</p>
							</DashboardCard>
						</Link>
					)
				})}
			</div>
		</section>
	)
}
