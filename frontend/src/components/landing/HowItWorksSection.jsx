import Link from 'next/link'
import {
	ArrowRight,
	CheckCircle2,
	ClipboardCheck,
	UserRound,
	Wallet,
} from 'lucide-react'

const steps = [
	{
		number: '01',
		title: 'Create your account',
		description:
			'Start with the account registration process and complete the required email verification.',
		icon: UserRound,
	},
	{
		number: '02',
		title: 'Set up your banking',
		description:
			'Access your customer workspace and create a bank account through the available account workflow.',
		icon: Wallet,
	},
	{
		number: '03',
		title: 'Manage your money',
		description:
			'Review account details, initiate transfers, and keep track of transaction activity.',
		icon: ClipboardCheck,
	},
]

export default function HowItWorksSection() {
	return (
		<section
			id='how-it-works'
			aria-labelledby='how-it-works-title'
			className='scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-10'
		>
			<div className='mx-auto max-w-280'>
				<div className='mx-auto max-w-2xl text-center'>
					<p className='text-sm font-semibold tracking-wide text-[#4F46E5]'>
						GETTING STARTED
					</p>

					<h2
						id='how-it-works-title'
						className='mt-3 text-3xl font-bold tracking-tight text-[#202B49] sm:text-4xl'
					>
						Three steps to a simpler experience
					</h2>

					<p className='mt-4 text-sm leading-7 text-[#6B7280] sm:text-base'>
						A straightforward journey from registration to managing
						your banking activities.
					</p>
				</div>

				<div className='relative mt-12 grid gap-6 md:grid-cols-3 md:gap-8'>
					{steps.map((step) => {
						const Icon = step.icon

						return (
							<article
								key={step.number}
								className='relative rounded-2xl border border-[#E2E5F0] bg-white p-6 sm:p-7'
							>
								<div className='flex items-center justify-between gap-4'>
									<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]'>
										<Icon
											size={23}
											aria-hidden='true'
										/>
									</div>

									<span className='text-3xl font-bold tracking-tight text-indigo-100'>
										{step.number}
									</span>
								</div>

								<h3 className='mt-6 text-lg font-bold text-[#202B49]'>
									{step.title}
								</h3>

								<p className='mt-3 text-sm leading-7 text-[#6B7280]'>
									{step.description}
								</p>
							</article>
						)
					})}
				</div>

				<div className='mt-8 flex justify-center'>
					<Link
						href='/signup'
						className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						Get started
						<ArrowRight
							size={17}
							aria-hidden='true'
						/>
					</Link>
				</div>

				<div className='mt-6 flex items-start justify-center gap-2 text-center text-xs leading-5 text-[#6B7280]'>
					<CheckCircle2
						size={16}
						className='mt-0.5 shrink-0 text-[#15803D]'
						aria-hidden='true'
					/>
					<p>
						Account creation and verification will be connected to
						the existing backend during Phase 2.
					</p>
				</div>
			</div>
		</section>
	)
}