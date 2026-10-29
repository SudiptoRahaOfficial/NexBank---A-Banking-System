import Link from 'next/link'
import {
	ArrowRight,
	ClipboardCheck,
	Fingerprint,
	LockKeyhole,
	ShieldCheck,
} from 'lucide-react'

const securityPrinciples = [
	{
		title: 'Controlled account access',
		description:
			'Authentication and authorization should determine who can access protected banking operations.',
		icon: LockKeyhole,
	},
	{
		title: 'Clear session controls',
		description:
			'Provide understandable sign-out and session-management options to help customers manage access.',
		icon: Fingerprint,
	},
	{
		title: 'Transparent transaction feedback',
		description:
			'Show transaction states and errors clearly so customers can understand what happened before taking further action.',
		icon: ClipboardCheck,
	},
]

export default function SecuritySection() {
	return (
		<section
			id='security'
			aria-labelledby='security-title'
			className='scroll-mt-24 border-y border-[#E2E5F0] bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-10'
		>
			<div className='mx-auto grid max-w-280 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
				<div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-[#312E81] via-[#4338CA] to-[#4F46E5] p-7 text-white sm:p-10'>
					<div
						aria-hidden='true'
						className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10'
					/>

					<div
						aria-hidden='true'
						className='pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10'
					/>

					<div className='relative'>
						<div className='flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10'>
							<ShieldCheck
								size={34}
								aria-hidden='true'
							/>
						</div>

						<p className='mt-8 text-sm font-semibold tracking-wide text-indigo-200'>
							SECURITY BY DESIGN
						</p>

						<h2 className='mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl'>
							Trust starts with clarity
						</h2>

						<p className='mt-5 text-sm leading-7 text-indigo-100 sm:text-base'>
							A banking experience should make account access,
							transaction outcomes, and security-related actions
							easy to understand.
						</p>

						<div className='mt-8 rounded-xl border border-white/15 bg-white/10 p-4'>
							<div className='flex items-start gap-3'>
								<LockKeyhole
									size={20}
									className='mt-0.5 shrink-0 text-indigo-200'
									aria-hidden='true'
								/>

								<div>
									<p className='text-sm font-semibold'>
										Designed for responsible access
									</p>

									<p className='mt-1 text-xs leading-6 text-indigo-100'>
										Backend enforcement remains essential
										for authentication, account ownership,
										and permissions.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<p className='text-sm font-semibold tracking-wide text-[#4F46E5]'>
						YOUR SECURITY MATTERS
					</p>

					<h2
						id='security-title'
						className='mt-3 text-3xl font-bold tracking-tight text-[#202B49] sm:text-4xl'
					>
						Thoughtful controls for banking with confidence
					</h2>

					<p className='mt-4 text-sm leading-7 text-[#6B7280] sm:text-base'>
						NexBank's interface is designed to make important
						security and transaction information understandable
						throughout the customer journey.
					</p>

					<div className='mt-8 space-y-6'>
						{securityPrinciples.map((principle) => {
							const Icon = principle.icon

							return (
								<div
									key={principle.title}
									className='flex items-start gap-4'
								>
									<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]'>
										<Icon
											size={21}
											aria-hidden='true'
										/>
									</div>

									<div>
										<h3 className='font-bold text-[#202B49]'>
											{principle.title}
										</h3>

										<p className='mt-2 text-sm leading-7 text-[#6B7280]'>
											{principle.description}
										</p>
									</div>
								</div>
							)
						})}
					</div>

					<Link
						href='/signup'
						className='mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#4F46E5] transition-colors hover:text-[#4338CA] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
					>
						Get started with NexBank
						<ArrowRight
							size={17}
							aria-hidden='true'
						/>
					</Link>
				</div>
			</div>
		</section>
	)
}