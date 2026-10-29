import {
	ArrowLeftRight,
	ChartNoAxesCombined,
	Clock3,
	ShieldCheck,
	Wallet,
	Zap,
} from 'lucide-react'

const features = [
	{
		title: 'Account management',
		description:
			'Organize your bank accounts, review account details, and access balance information from one place.',
		icon: Wallet,
		iconColor: 'text-indigo-700',
		iconBackground: 'bg-indigo-50',
	},
	{
		title: 'Simple fund transfers',
		description:
			'Use a clear transfer workflow to select accounts, enter an amount, review the details, and confirm.',
		icon: ArrowLeftRight,
		iconColor: 'text-blue-700',
		iconBackground: 'bg-blue-50',
	},
	{
		title: 'Transaction history',
		description:
			'Review incoming and outgoing transactions with readable amounts, dates, and transaction details.',
		icon: Clock3,
		iconColor: 'text-violet-700',
		iconBackground: 'bg-violet-50',
	},
	{
		title: 'Financial visibility',
		description:
			'Bring account summaries and recent activity together to make everyday financial management clearer.',
		icon: ChartNoAxesCombined,
		iconColor: 'text-sky-700',
		iconBackground: 'bg-sky-50',
	},
	{
		title: 'Security-conscious design',
		description:
			'Use a dedicated banking interface designed around clear authentication flows and responsible account access.',
		icon: ShieldCheck,
		iconColor: 'text-green-700',
		iconBackground: 'bg-green-50',
	},
	{
		title: 'Convenient workflows',
		description:
			'Navigate common banking tasks through focused screens, consistent controls, and understandable feedback.',
		icon: Zap,
		iconColor: 'text-amber-700',
		iconBackground: 'bg-amber-50',
	},
]

export default function FeaturesSection() {
	return (
		<section
			id='features'
			aria-labelledby='features-title'
			className='scroll-mt-24 border-y border-[#E2E5F0] bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-10'
		>
			<div className='mx-auto max-w-280'>
				<div className='mx-auto max-w-2xl text-center'>
					<p className='text-sm font-semibold tracking-wide text-[#4F46E5]'>
						DESIGNED FOR EVERYDAY BANKING
					</p>

					<h2
						id='features-title'
						className='mt-3 text-3xl font-bold tracking-tight text-[#202B49] sm:text-4xl'
					>
						Everything you need to bank with clarity
					</h2>

					<p className='mt-4 text-sm leading-7 text-[#6B7280] sm:text-base'>
						A focused set of banking capabilities designed to make
						managing your money more straightforward.
					</p>
				</div>

				<div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature) => {
						const Icon = feature.icon

						return (
							<article
								key={feature.title}
								className='group rounded-2xl border border-[#E2E5F0] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5 motion-reduce:transform-none motion-reduce:transition-none'
							>
								<div
									className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBackground} ${feature.iconColor}`}
								>
									<Icon
										size={23}
										aria-hidden='true'
									/>
								</div>

								<h3 className='mt-5 text-lg font-bold text-[#202B49]'>
									{feature.title}
								</h3>

								<p className='mt-3 text-sm leading-7 text-[#6B7280]'>
									{feature.description}
								</p>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}