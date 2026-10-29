import Link from 'next/link'
import { Landmark, ArrowUpRight } from 'lucide-react'
import CurrentYear from '@/components/shared/CurrentYear'

const footerLinks = [
	{
		title: 'Explore',
		links: [
			{ label: 'Features', href: '#features' },
			{ label: 'How it works', href: '#how-it-works' },
			{ label: 'Security', href: '#security' },
		],
	},
	{
		title: 'Your account',
		links: [
			{ label: 'Sign in', href: '/signin' },
			{ label: 'Create an account', href: '/signup' },
		],
	},
]

export default function LandingFooter() {
	return (
		<footer className='border-t border-[#E2E5F0] bg-white px-4 pb-6 pt-12 sm:px-6 sm:pt-14 lg:px-10'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16'>
					<div>
						<Link
							href='/'
							aria-label='NexBank home'
							className='inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
						>
							<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white'>
								<Landmark
									size={22}
									aria-hidden='true'
								/>
							</span>

							<span className='text-xl font-bold tracking-tight text-[#202B49]'>
								NexBank
							</span>
						</Link>

						<p className='mt-4 max-w-sm text-sm leading-7 text-[#6B7280]'>
							A modern banking experience focused on clarity,
							convenient account management, and understandable
							financial workflows.
						</p>
					</div>

					{footerLinks.map((group) => (
						<div key={group.title}>
							<h2 className='text-sm font-bold text-[#202B49]'>
								{group.title}
							</h2>

							<ul className='mt-4 space-y-3'>
								{group.links.map((link) => {
									const isSectionLink =
										link.href.startsWith('#')

									return (
										<li key={link.href}>
											{isSectionLink ? (
												<a
													href={link.href}
													className='inline-flex items-center gap-1 text-sm text-[#6B7280] transition-colors hover:text-[#4F46E5] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
												>
													{link.label}
												</a>
											) : (
												<Link
													href={link.href}
													className='inline-flex items-center gap-1 text-sm text-[#6B7280] transition-colors hover:text-[#4F46E5] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46E5]'
												>
													{link.label}
													<ArrowUpRight
														size={13}
														aria-hidden='true'
													/>
												</Link>
											)}
										</li>
									)
								})}
							</ul>
						</div>
					))}
				</div>

				<div className='mt-10 flex flex-col gap-3 border-t border-[#E2E5F0] pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left'>
					<p className='text-xs leading-5 text-[#6B7280]'>
						&copy; <CurrentYear /> NexBank. All rights reserved.
					</p>

					<p className='text-xs leading-5 text-[#6B7280]'>
						Demonstration project. Not a real banking service.
					</p>
				</div>
			</div>
		</footer>
	)
}