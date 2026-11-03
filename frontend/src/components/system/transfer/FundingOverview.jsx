import { Banknote, Info, ShieldCheck } from 'lucide-react'

const FUNDING_DETAILS = [
	{
		label: 'Operation type',
		value: 'System funding',
		icon: Banknote,
	},
	{
		label: 'Minimum deposit',
		value: '৳1,000.00',
		icon: ShieldCheck,
	},
]

export default function FundingOverview() {
	return (
		<section
			aria-labelledby='funding-overview-heading'
			className='space-y-4'
		>
			<div>
				<h2
					id='funding-overview-heading'
					className='text-base font-semibold text-[#202B49]'
				>
					Funding overview
				</h2>

				<p className='mt-1 text-sm text-[#6B7280]'>
					Review the operation requirements before proceeding.
				</p>
			</div>

			<div className='grid gap-4 sm:grid-cols-2'>
				{FUNDING_DETAILS.map(({ label, value, icon: Icon }) => (
					<div
						key={label}
						className='flex items-center gap-4 rounded-xl border border-[#E2E5F0] bg-white p-4'
					>
						<div className='flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
							<Icon
								size={20}
								aria-hidden='true'
							/>
						</div>

						<div className='min-w-0'>
							<p className='text-sm text-[#6B7280]'>{label}</p>
							<p className='mt-1 font-semibold text-[#202B49]'>
								{value}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className='flex gap-3 rounded-xl border border-[#E2E5F0] bg-[#EEF2FF]/60 p-4'>
				<Info
					size={18}
					className='mt-0.5 shrink-0 text-[#4F46E5]'
					aria-hidden='true'
				/>

				<p className='text-sm leading-6 text-[#4B5563]'>
					Only authorized system users can perform initial funding.
					The receiver account and system account must both be active
					and must be different accounts. These conditions are
					ultimately verified by the backend.
				</p>
			</div>
		</section>
	)
}