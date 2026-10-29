import Link from 'next/link'
import {
	ArrowDownToLine,
	ArrowDownLeft,
	ArrowLeftRight,
	ArrowRight,
	ArrowUpRight,
	CreditCard,
	Eye,
	Landmark,
	Menu,
	MoreHorizontal,
	Shield,
	ShieldCheck,
	Sparkles,
	TrendingUp,
	UserRound,
	UsersRound,
	Wallet,
	Zap,
} from 'lucide-react'

const quickActions = [
	{ label: 'Send', icon: ArrowUpRight },
	{ label: 'Receive', icon: ArrowDownToLine },
	{ label: 'Transfer', icon: ArrowLeftRight },
	{ label: 'More', icon: MoreHorizontal },
]

const transactions = [
	{
		name: 'Salary deposit',
		detail: 'Monthly income',
		amount: '+$2,500.00',
		type: 'income',
		icon: ArrowDownLeft,
	},
	{
		name: 'Grocery store',
		detail: 'Card payment',
		amount: '-$86.32',
		type: 'expense',
		icon: CreditCard,
	},
	{
		name: 'Utilities',
		detail: 'Bill payment',
		amount: '-$120.00',
		type: 'expense',
		icon: Zap,
	},
]

const trustFeatures = [
	{
		title: 'Account visibility',
		description: 'Your finances in one place',
		icon: UsersRound,
	},
	{
		title: 'Reliable access',
		description: 'Manage your money anytime',
		icon: Shield,
	},
	{
		title: 'Simple transactions',
		description: 'Clear financial activity',
		icon: Zap,
	},
	{
		title: 'Security-conscious',
		description: 'Designed with security in mind',
		icon: Landmark,
	},
]

function BankCardPreview() {
	return (
		<div
			aria-hidden='true'
			className='absolute left-[-3%] top-[36%] z-20 hidden w-[43%] -rotate-12 sm:block lg:left-[-2%] lg:w-[44%]'
		>
			<div className='relative aspect-[1.58/1] overflow-hidden rounded-2xl border border-white/20 bg-linear-to-br from-indigo-800 via-indigo-600 to-indigo-400 p-3.5 text-white shadow-[0_20px_45px_-20px_rgba(49,46,129,0.45)] sm:rounded-3xl sm:p-4 lg:p-5'>
				<div className='absolute -right-10 -top-12 size-36 rounded-full border border-white/10 bg-white/5' />
				<div className='absolute -bottom-20 right-6 size-40 rounded-full border border-white/10 bg-white/5' />

				<div className='relative flex items-center gap-1.5'>
					<Landmark
						size={17}
						aria-hidden='true'
					/>
					<span className='text-xs font-bold tracking-wide'>
						NexBank
					</span>
				</div>

				<div className='relative mt-4 flex h-6 w-8 items-center justify-center rounded-md border border-white/30 bg-linear-to-br from-slate-200 to-slate-400 sm:mt-6 sm:h-8 sm:w-10'>
					<span className='h-3 w-px bg-slate-500/50' />
					<span className='absolute h-px w-full bg-slate-500/50' />
					<span className='absolute h-2.5 w-4 rounded-sm border border-slate-500/50' />
				</div>

				<div className='absolute bottom-4 right-4 flex items-center sm:bottom-5 sm:right-5'>
					<span className='size-5 rounded-full bg-[#EB001B]/90 sm:size-7' />
					<span className='-ml-2.5 size-5 rounded-full bg-[#F79E1B]/90 sm:size-7' />
				</div>
			</div>
		</div>
	)
}

function PhonePreview() {
	return (
		<div className='relative mx-auto w-full max-w-32 sm:max-w-52 lg:max-w-none'>
			{/* Decorative background */}
			<div
				aria-hidden='true'
				className='absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-indigo-200/70 via-blue-100/60 to-violet-200/60 blur-[1px]'
			/>

			{/* Floating feature card */}
			<div
				aria-hidden='true'
				className='absolute -right-1 top-[16%] z-30 hidden w-[31%] -rotate-6 rounded-xl border border-white/80 bg-white/90 p-3 text-center shadow-[0_14px_35px_-18px_rgba(49,46,129,0.3)] backdrop-blur sm:block lg:-right-1 lg:top-[24%]'
			>
				<TrendingUp
					size={22}
					className='mx-auto text-[#4F46E5]'
				/>

				<p className='mt-2 text-xs font-bold leading-4 text-[#202B49]'>
					Your money,
					<br />
					your control
				</p>
			</div>

			<BankCardPreview />

			{/* Phone frame */}
			<div className='relative z-10 mx-auto w-[68%] max-w-24 rotate-[4deg] rounded-[1.2rem] border-[3px] border-[#111827] bg-[#111827] p-0.5 shadow-[0_16px_35px_-20px_rgba(30,41,90,0.4)] sm:w-[66%] sm:max-w-40 sm:rounded-[1.8rem] sm:border-4 sm:p-1 lg:w-[72%] lg:max-w-72 lg:rounded-[2.5rem] lg:p-1.25'>
				<div className='relative overflow-hidden rounded-[0.95rem] bg-white sm:rounded-[1.4rem] lg:rounded-4xl'>
					{/* Status bar */}
					<div className='relative flex h-4 items-center justify-between px-2 text-[6px] font-bold text-[#111827] sm:h-6 sm:px-3 sm:text-[8px] lg:h-8 lg:px-4 lg:text-[9px]'>
						<span>9:41</span>

						<span className='absolute left-1/2 top-0.5 h-2 w-6 -translate-x-1/2 rounded-full bg-black sm:h-3 sm:w-10 lg:top-1 lg:h-4 lg:w-14' />

						<div className='flex items-center gap-0.5'>
							<span
								aria-hidden='true'
								className='h-1 w-1 rounded-sm border border-[#111827] sm:h-1.5 sm:w-2.5'
							/>
							<span
								aria-hidden='true'
								className='h-1 w-1.5 rounded-sm bg-[#111827] sm:h-1.5 sm:w-3'
							/>
						</div>
					</div>

					<div className='px-1 pb-1 sm:px-2 sm:pb-2 lg:px-3.5 lg:pb-3.5'>
						{/* App header */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-0.5 sm:gap-1'>
								<span className='flex size-2.5 items-center justify-center rounded-sm bg-[#4F46E5] text-white sm:size-4 lg:size-5'>
									<Landmark
										size={7}
										aria-hidden='true'
									/>
								</span>

								<span className='text-[6px] font-bold tracking-tight text-[#202B49] sm:text-[9px] lg:text-xs'>
									NexBank
								</span>
							</div>

							<div className='flex size-3 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5] sm:size-5 lg:size-7'>
								<UserRound
									size={8}
									aria-hidden='true'
								/>
							</div>
						</div>

						{/* Greeting */}
						<div className='mt-1.5 sm:mt-2.5 lg:mt-4'>
							<p className='text-[6px] text-[#647084] sm:text-[8px] lg:text-[10px]'>
								Good morning,
							</p>

							<p className='mt-0.5 text-[8px] font-bold tracking-tight text-[#202B49] sm:text-xs lg:text-base'>
								Your finances
							</p>
						</div>

						{/* Balance card */}
						<div className='mt-1 rounded-md bg-linear-to-br from-indigo-800 via-[#4F46E5] to-indigo-400 p-1 text-white shadow-sm sm:mt-2 sm:rounded-xl sm:p-2 lg:mt-3 lg:rounded-2xl lg:p-3'>
							<div className='flex items-center justify-between gap-0.5'>
								<p className='text-[5px] font-medium text-indigo-100 sm:text-[7px] lg:text-[9px]'>
									Illustrative balance
								</p>

								<Eye
									size={7}
									className='text-indigo-100 lg:size-3'
									aria-hidden='true'
								/>
							</div>

							<p className='mt-0.5 text-[10px] font-bold tracking-tight tabular-nums sm:mt-1 sm:text-sm lg:mt-1.5 lg:text-xl'>
								$12,480.00
							</p>

							<p className='mt-0.5 text-[5px] text-indigo-100 sm:text-[7px] lg:mt-1 lg:text-[9px]'>
								Example account overview
							</p>
						</div>

						{/* Quick actions */}
						<div className='mt-1.5 grid grid-cols-4 gap-0.5 sm:mt-2.5 sm:gap-1 lg:mt-4 lg:gap-1.5'>
							{quickActions.map(({ label, icon: Icon }) => (
								<div
									key={label}
									className='flex flex-col items-center gap-0.5'
								>
									<div className='flex size-4 items-center justify-center rounded-sm bg-indigo-50 text-[#4F46E5] sm:size-6 lg:size-8 lg:rounded-lg'>
										<Icon
											size={8}
											aria-hidden='true'
										/>
									</div>

									<span className='text-[5px] font-medium text-[#475569] sm:text-[7px] lg:text-[8px]'>
										{label}
									</span>
								</div>
							))}
						</div>

						{/* Recent activity */}
						<div className='mt-2 sm:mt-3 lg:mt-4'>
							<div className='flex items-center justify-between gap-0.5'>
								<h3 className='text-[7px] font-bold text-[#202B49] sm:text-[9px] lg:text-[11px]'>
									Recent activity
								</h3>

								<span className='text-[5px] font-semibold text-[#4F46E5] sm:text-[7px] lg:text-[8px]'>
									View all
								</span>
							</div>

							<div className='mt-1 space-y-1 sm:mt-2 sm:space-y-2 lg:space-y-3'>
								{transactions.map(
									({
										name,
										detail,
										amount,
										type,
										icon: Icon,
									}) => (
										<div
											key={name}
											className='flex items-center gap-0.5 sm:gap-1'
										>
											<div className='flex size-3 shrink-0 items-center justify-center rounded-full bg-[#F4F6FB] text-[#4F46E5] sm:size-5 lg:size-7'>
												<Icon
													size={7}
													aria-hidden='true'
												/>
											</div>

											<div className='min-w-0 flex-1'>
												<p className='truncate text-[6px] font-semibold text-[#202B49] sm:text-[8px] lg:text-[10px]'>
													{name}
												</p>

												<p className='mt-0.5 text-[5px] text-[#94A3B8] sm:text-[7px] lg:text-[8px]'>
													{detail}
												</p>
											</div>

											<p
												className={`shrink-0 text-[5px] font-bold tabular-nums sm:text-[7px] lg:text-[9px] ${
													type === 'income'
														? 'text-[#15803D]'
														: 'text-[#202B49]'
												}`}
											>
												{amount}
											</p>
										</div>
									),
								)}
							</div>
						</div>

						{/* Bottom navigation */}
						<div className='mt-2 flex items-center justify-around border-t border-[#E2E5F0] pt-1 sm:mt-3 sm:pt-2 lg:mt-4 lg:pt-3'>
							{[
								{ label: 'Home', icon: Landmark, active: true },
								{ label: 'Accounts', icon: Wallet },
								{ label: 'Cards', icon: CreditCard },
								{ label: 'More', icon: Menu },
							].map(({ label, icon: Icon, active }) => (
								<div
									key={label}
									className={`flex flex-col items-center gap-0.5 ${
										active
											? 'text-[#4F46E5]'
											: 'text-[#94A3B8]'
									}`}
								>
									<Icon
										size={8}
										aria-hidden='true'
									/>

									<span className='text-[5px] font-medium sm:text-[6px] lg:text-[7px]'>
										{label}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function TrustStrip() {
	return (
		<div className='border-t border-[#E2E5F0]/80 bg-white/75 px-4 py-6 sm:px-6 sm:py-8 lg:px-10'>
			<div className='mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-0'>
				{trustFeatures.map(
					({ title, description, icon: Icon }, index) => (
						<div
							key={title}
							className={`flex items-center gap-2.5 sm:gap-3 ${
								index > 0
									? 'md:border-l md:border-[#E2E5F0] md:pl-5 lg:pl-6'
									: ''
							} ${
								index < trustFeatures.length - 1
									? 'md:pr-4 lg:pr-6'
									: ''
							}`}
						>
							<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5] sm:size-11 sm:rounded-xl'>
								<Icon
									size={19}
									aria-hidden='true'
								/>
							</div>

							<div className='min-w-0'>
								<p className='text-xs font-bold leading-4 text-[#202B49] sm:text-sm sm:leading-5'>
									{title}
								</p>

								<p className='mt-1 text-[10px] leading-4 text-[#647084] sm:text-xs sm:leading-5'>
									{description}
								</p>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	)
}

export default function HeroSection() {
	return (
		<>
			<section className='relative isolate overflow-hidden bg-[#F5F7FF] px-4 pb-6 pt-8 sm:px-6 sm:pb-12 sm:pt-12 lg:px-10 lg:pb-16 lg:pt-18'>
				{/* Background decoration */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute -left-32 top-16 -z-10 size-72 rounded-full bg-indigo-200/30 blur-3xl sm:size-80'
				/>

				<div
					aria-hidden='true'
					className='pointer-events-none absolute -right-32 top-8 -z-10 size-80 rounded-full bg-blue-200/35 blur-3xl sm:size-96'
				/>

				<div
					aria-hidden='true'
					className='pointer-events-none absolute -bottom-40 left-[-8%] -z-10 size-72 rounded-full bg-violet-200/20 blur-3xl'
				/>

				<div className='mx-auto grid max-w-7xl items-center gap-4 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 xl:gap-10'>
					{/* Hero content */}
					<div className='relative z-20 mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left'>
						<div className='inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:gap-2 sm:px-3.5 sm:py-2'>
							<Sparkles
								size={14}
								className='shrink-0 text-[#4F46E5]'
								aria-hidden='true'
							/>

							<span className='text-[11px] font-semibold text-[#4338CA] sm:text-xs'>
								A simpler way to manage your money
							</span>
						</div>

						<h1 className='mt-5 text-[2.15rem] leading-[1.1] font-bold tracking-[-0.04em] text-[#111C4E] sm:mt-6 sm:text-5xl lg:text-[3.35rem] xl:text-[3.8rem]'>
							Banking made
							<span className='block bg-linear-to-r from-[#4338CA] via-[#4F46E5] to-[#6366F1] bg-clip-text text-transparent'>
								simpler for you
							</span>
						</h1>

						<p className='mx-auto mt-4 max-w-lg text-sm leading-6 text-[#586987] sm:mt-5 sm:text-base sm:leading-7 lg:mx-0'>
							Manage your accounts, transfer funds, and track your
							financial activity through one intuitive banking
							experience built around clarity and convenience.
						</p>

						{/* Calls to action */}
						<div className='mt-6 flex flex-col justify-center gap-2.5 sm:mt-7 sm:flex-row lg:justify-start'>
							<Link
								href='/signup'
								className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#4338E8] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_16px_-7px_rgba(67,56,232,0.6)] transition-colors hover:bg-[#3730CA] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4338E8] active:bg-[#312E81]'
							>
								Open your account
								<ArrowRight
									size={16}
									aria-hidden='true'
								/>
							</Link>

							<a
								href='#features'
								className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#D6DDF4] bg-white/80 px-5 py-3 text-sm font-semibold text-[#202B49] transition-colors hover:border-indigo-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4338E8]'
							>
								Explore features
								<ArrowUpRight
									size={16}
									aria-hidden='true'
								/>
							</a>
						</div>

						{/* Supporting benefits */}
						<div className='mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 text-xs text-[#586987] sm:mt-7 sm:gap-x-5 sm:text-sm lg:justify-start'>
							<span className='inline-flex items-center gap-1.5'>
								<ShieldCheck
									size={16}
									className='shrink-0 text-[#15803D]'
									aria-hidden='true'
								/>
								Security-focused design
							</span>

							<span
								aria-hidden='true'
								className='hidden h-4 w-px bg-[#CBD5E1] sm:block'
							/>

							<span className='inline-flex items-center gap-1.5'>
								<Sparkles
									size={14}
									className='shrink-0 text-[#4F46E5]'
									aria-hidden='true'
								/>
								Clear financial visibility
							</span>
						</div>
					</div>

					{/* Banking product illustration */}
					<div className='relative mx-auto w-full max-w-40 py-0 sm:max-w-64 sm:py-2 lg:max-w-none lg:py-0'>
						<PhonePreview />
					</div>
				</div>
			</section>

			<TrustStrip />
		</>
	)
}