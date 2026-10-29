import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function HeroSection() {
	return (
		<section className='relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-28'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl'
			/>

			<div
				aria-hidden='true'
				className='pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl'
			/>

			<div className='relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16'>
				<div className='mx-auto max-w-2xl text-center lg:mx-0 lg:text-left'>
					<div className='mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 shadow-sm'>
						<Sparkles
							size={16}
							className='text-[#4F46E5]'
							aria-hidden='true'
						/>
						<span className='text-xs font-semibold text-[#4338CA] sm:text-sm'>
							A simpler way to manage your money
						</span>
					</div>

					<h1 className='text-4xl leading-tight font-bold tracking-tight text-[#202B49] sm:text-5xl lg:text-6xl'>
						Banking made simpler
						<span className='mt-2 block text-[#4F46E5]'>
							Your money, your control
						</span>
					</h1>

					<p className='mx-auto mt-6 max-w-xl text-base leading-8 text-[#6B7280] sm:text-lg lg:mx-0'>
						Manage your accounts, transfer funds, and track your
						financial activity through one intuitive banking
						experience designed around clarity and convenience.
					</p>

					<div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start'>
						<Link
							href='/signup'
							className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							Open your account
							<ArrowRight
								size={17}
								aria-hidden='true'
							/>
						</Link>

						<a
							href='#features'
							className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#E2E5F0] bg-white px-6 py-3 text-sm font-semibold text-[#202B49] transition-colors hover:border-indigo-200 hover:bg-indigo-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							Explore features
							<ArrowUpRight
								size={17}
								aria-hidden='true'
							/>
						</a>
					</div>

					<div className='mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-[#6B7280] lg:justify-start'>
						<span className='inline-flex items-center gap-2'>
							<ShieldCheck
								size={17}
								className='text-[#15803D]'
								aria-hidden='true'
							/>
							Security-focused design
						</span>

						<span className='hidden h-4 w-px bg-[#D1D5DB] sm:block' />

						<span>Clear financial visibility</span>
					</div>
				</div>

				<div className='mx-auto w-full max-w-xl lg:max-w-none'>
					<div className='relative rounded-3xl border border-white bg-white/70 p-3 shadow-[0_24px_80px_-32px_rgba(49,46,129,0.25)] backdrop-blur-sm sm:p-5'>
						<div className='rounded-2xl bg-linear-to-br from-indigo-50 via-white to-blue-50 p-5 sm:p-8'>
							<div className='flex items-center justify-between gap-4'>
								<div className='flex items-center gap-3'>
									<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5] text-white'>
										<ShieldCheck
											size={23}
											aria-hidden='true'
										/>
									</div>

									<div>
										<p className='text-sm font-bold text-[#202B49]'>
											Banking, organized
										</p>
										<p className='mt-1 text-xs text-[#6B7280]'>
											Everything in one place
										</p>
									</div>
								</div>

								<span className='rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#4338CA]'>
									NexBank
								</span>
							</div>

							<div className='mt-8 rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm sm:p-6'>
								<p className='text-sm font-medium text-[#6B7280]'>
									Your financial overview
								</p>

								<div className='mt-3 flex items-end justify-between gap-3'>
									<div>
										<p className='text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'>
											Stay in control
										</p>
										<p className='mt-2 text-sm text-[#6B7280]'>
											Your accounts, at a glance
										</p>
									</div>

									<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5]'>
										<ArrowUpRight
											size={24}
											aria-hidden='true'
										/>
									</div>
								</div>

								<div className='mt-6 grid grid-cols-2 gap-3'>
									<div className='rounded-xl bg-[#F4F6FB] p-4'>
										<p className='text-xs font-medium text-[#6B7280]'>
											Accounts
										</p>
										<p className='mt-2 text-lg font-bold text-[#202B49]'>
											One overview
										</p>
									</div>

									<div className='rounded-xl bg-[#F4F6FB] p-4'>
										<p className='text-xs font-medium text-[#6B7280]'>
											Transactions
										</p>
										<p className='mt-2 text-lg font-bold text-[#202B49]'>
											Clear history
										</p>
									</div>
								</div>
							</div>

							<div className='mt-4 flex items-start gap-3 rounded-xl border border-indigo-100 bg-white/80 p-4'>
								<ShieldCheck
									size={20}
									className='mt-0.5 shrink-0 text-[#4F46E5]'
									aria-hidden='true'
								/>
								<p className='text-sm leading-6 text-[#475569]'>
									A clear, organized interface to help you
									manage your banking activities with
									confidence.
								</p>
							</div>
						</div>
					</div>

					<p className='mt-4 text-center text-xs text-[#6B7280]'>
						Illustrative interface preview. No live account data.
					</p>
				</div>
			</div>
		</section>
	)
}