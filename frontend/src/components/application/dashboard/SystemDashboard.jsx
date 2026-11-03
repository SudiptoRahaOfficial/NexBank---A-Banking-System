'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
	Activity,
	ArrowDownLeft,
	ArrowRight,
	Banknote,
	CheckCircle2,
	ChevronDown,
	Clock3,
	MoreHorizontal,
	Plus,
	RefreshCw,
	ShieldCheck,
	TrendingUp,
	Wallet,
	XCircle,
	Zap,
} from 'lucide-react'

import CurrentYear from '@/components/shared/CurrentYear'

export default function SystemDashboard() {
	const [selectedPeriod, setSelectedPeriod] = useState('7D')
	const [selectedStatus, setSelectedStatus] = useState('ALL')

	// --------------------------------------------------
	// MOCK DATA
	// Replace with backend data during API integration.
	// --------------------------------------------------

	const systemUser = {
		name: 'System Administrator',
		email: 'admin@nexbank.com',
		role: 'System User',
	}

	const overview = [
		{
			title: 'Total System Accounts',
			value: '01',
			description: 'Dedicated system account',
			icon: Wallet,
			iconStyle: 'bg-[#E9EFFF] text-[#4F46E5]',
		},
		{
			title: 'Total Funded Amount',
			value: '৳ 845,000.00',
			description: 'Across all funding operations',
			icon: Banknote,
			iconStyle: 'bg-[#ECFDF5] text-[#15803D]',
		},
		{
			title: 'Funding Operations',
			value: '128',
			description: 'Total funding requests',
			icon: Activity,
			iconStyle: 'bg-[#F5F3FF] text-[#7C3AED]',
		},
		{
			title: 'Pending Operations',
			value: '03',
			description: 'Require status verification',
			icon: Clock3,
			iconStyle: 'bg-[#FFFBEB] text-[#B45309]',
		},
	]

	const fundingActivity = [
		{
			id: 'TXN-829401',
			account: '6ae2051201c1ae1bf4884cbf',
			receiver: 'Jane Cooper',
			amount: 25000,
			status: 'COMPLETED',
			date: 'Nov 03, 2026',
			time: '03:45 PM',
		},
		{
			id: 'TXN-829400',
			account: '6ae2051201c1ae1bf4884cbe',
			receiver: 'Robert Fox',
			amount: 15000,
			status: 'PENDING',
			date: 'Nov 03, 2026',
			time: '02:30 PM',
		},
		{
			id: 'TXN-829399',
			account: '6ae2051201c1ae1bf4884cbd',
			receiver: 'Esther Howard',
			amount: 50000,
			status: 'COMPLETED',
			date: 'Nov 02, 2026',
			time: '11:20 AM',
		},
		{
			id: 'TXN-829398',
			account: '6ae2051201c1ae1bf4884cbc',
			receiver: 'Cody Fisher',
			amount: 10000,
			status: 'FAILED',
			date: 'Nov 02, 2026',
			time: '09:15 AM',
		},
		{
			id: 'TXN-829397',
			account: '6ae2051201c1ae1bf4884cbb',
			receiver: 'Jenny Wilson',
			amount: 35000,
			status: 'REVERSED',
			date: 'Nov 01, 2026',
			time: '04:10 PM',
		},
	]

	const fundingTrends = {
		'7D': [
			{ label: 'Mon', amount: 42000 },
			{ label: 'Tue', amount: 65000 },
			{ label: 'Wed', amount: 48000 },
			{ label: 'Thu', amount: 85000 },
			{ label: 'Fri', amount: 55000 },
			{ label: 'Sat', amount: 92000 },
			{ label: 'Sun', amount: 75000 },
		],
		'30D': [
			{ label: 'Week 1', amount: 180000 },
			{ label: 'Week 2', amount: 245000 },
			{ label: 'Week 3', amount: 195000 },
			{ label: 'Week 4', amount: 310000 },
		],
		'90D': [
			{ label: 'Aug', amount: 650000 },
			{ label: 'Sep', amount: 780000 },
			{ label: 'Oct', amount: 845000 },
		],
	}

	const statusStyles = {
		COMPLETED: {
			className: 'bg-[#ECFDF5] text-[#15803D]',
			icon: CheckCircle2,
		},
		PENDING: {
			className: 'bg-[#FFFBEB] text-[#B45309]',
			icon: Clock3,
		},
		FAILED: {
			className: 'bg-[#FEF2F2] text-[#DC2626]',
			icon: XCircle,
		},
		REVERSED: {
			className: 'bg-[#F3F4F6] text-[#4B5563]',
			icon: RefreshCw,
		},
	}

	const periods = ['7D', '30D', '90D']

	// --------------------------------------------------
	// DERIVED DATA
	// --------------------------------------------------

	const currentTrend = fundingTrends[selectedPeriod]

	const maxFunding = Math.max(...currentTrend.map((item) => item.amount))

	const filteredActivity = useMemo(() => {
		if (selectedStatus === 'ALL') {
			return fundingActivity
		}

		return fundingActivity.filter((item) => item.status === selectedStatus)
	}, [selectedStatus])

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('en-BD', {
			style: 'currency',
			currency: 'BDT',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount)
	}

	const formatCompactCurrency = (amount) => {
		if (amount >= 100000) {
			return `৳${(amount / 100000).toFixed(1)}L`
		}

		if (amount >= 1000) {
			return `৳${(amount / 1000).toFixed(0)}K`
		}

		return `৳${amount}`
	}

	// --------------------------------------------------
	// COMPONENT
	// --------------------------------------------------

	return (
		<div className='min-h-screen bg-[#F4F6FB] text-[#202B49]'>
			{/* Header */}
			<header className='sticky top-0 z-30 border-b border-[#E2E5F0] bg-white'>
				<div className='mx-auto flex h-18 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8'>
					{/* Brand */}
					<Link
						href='/'
						className='flex items-center gap-2.5'
						aria-label='NexBank home'
					>
						<div className='flex size-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white'>
							<Wallet
								size={21}
								aria-hidden='true'
							/>
						</div>

						<div>
							<p className='text-lg font-bold tracking-tight text-[#202B49]'>
								NexBank
							</p>
							<p className='-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]'>
								System Console
							</p>
						</div>
					</Link>

					{/* Header actions */}
					<div className='flex items-center gap-3'>
						<div className='hidden items-center gap-2 rounded-lg border border-[#E2E5F0] bg-[#F9FAFC] px-3 py-2 sm:flex'>
							<ShieldCheck
								size={16}
								className='text-[#15803D]'
								aria-hidden='true'
							/>
							<span className='text-xs font-semibold text-[#202B49]'>
								Authorized Access
							</span>
						</div>

						<div className='flex items-center gap-2.5 border-l border-[#E2E5F0] pl-3 sm:pl-4'>
							<div className='flex size-9 items-center justify-center rounded-full bg-[#E9EFFF] text-sm font-bold text-[#4F46E5]'>
								SA
							</div>

							<div className='hidden sm:block'>
								<p className='text-sm font-semibold text-[#202B49]'>
									{systemUser.name}
								</p>
								<p className='text-xs text-[#6B7280]'>
									{systemUser.role}
								</p>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className='mx-auto w-full max-w-360 space-y-7 px-4 py-7 sm:px-6 sm:py-9 lg:px-8'>
				{/* Page Heading */}
				<section className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
					<div>
						<div className='mb-2 flex items-center gap-2'>
							<span className='size-2 rounded-full bg-[#15803D]' />

							<p className='text-xs font-semibold uppercase tracking-wider text-[#6B7280]'>
								System Overview
							</p>
						</div>

						<h1 className='text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'>
							System Dashboard
						</h1>

						<p className='mt-2 max-w-xl text-sm leading-6 text-[#6B7280]'>
							Monitor system funding operations and manage initial
							deposits across NexBank.
						</p>
					</div>

					<Link
						href='/system/transfer'
						className='inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] sm:self-auto'
					>
						<Plus
							size={18}
							aria-hidden='true'
						/>
						Initial Funding
					</Link>
				</section>

				{/* System Access Notice */}
				<section className='flex flex-col gap-3 rounded-2xl border border-[#C7D2FE] bg-[#EEF2FF] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
					<div className='flex items-start gap-3'>
						<div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#4F46E5]'>
							<ShieldCheck
								size={21}
								aria-hidden='true'
							/>
						</div>

						<div>
							<p className='text-sm font-semibold text-[#202B49]'>
								System-level access enabled
							</p>
							<p className='mt-1 text-xs leading-5 text-[#555F80]'>
								You are accessing restricted system operations.
								Initial funding is available to authorized
								system users only.
							</p>
						</div>
					</div>

					<span className='inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4338CA]'>
						<CheckCircle2
							size={14}
							aria-hidden='true'
						/>
						Verified Role
					</span>
				</section>

				{/* Overview Cards */}
				<section>
					<div className='mb-4 flex items-center justify-between'>
						<h2 className='text-base font-bold text-[#202B49]'>
							Overview
						</h2>

						<span className='text-xs text-[#6B7280]'>
							Dashboard statistics
						</span>
					</div>

					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
						{overview.map((item) => {
							const Icon = item.icon

							return (
								<div
									key={item.title}
									className='rounded-2xl border border-[#E2E5F0] bg-white p-5 transition-shadow hover:shadow-sm'
								>
									<div className='flex items-center justify-between'>
										<div
											className={`flex size-11 items-center justify-center rounded-xl ${item.iconStyle}`}
										>
											<Icon
												size={21}
												aria-hidden='true'
											/>
										</div>

										<MoreHorizontal
											size={19}
											className='text-[#9CA3AF]'
											aria-hidden='true'
										/>
									</div>

									<p className='mt-5 text-sm font-medium text-[#6B7280]'>
										{item.title}
									</p>

									<p className='mt-1 text-2xl font-bold tracking-tight text-[#202B49] tabular-nums'>
										{item.value}
									</p>

									<p className='mt-2 text-xs text-[#9CA3AF]'>
										{item.description}
									</p>
								</div>
							)
						})}
					</div>
				</section>

				{/* Analytics Section */}
				<section className='grid grid-cols-1 gap-5 xl:grid-cols-3'>
					{/* Funding Chart */}
					<div className='rounded-2xl border border-[#E2E5F0] bg-white p-5 sm:p-6 xl:col-span-2'>
						<div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
							<div>
								<h2 className='text-base font-bold text-[#202B49]'>
									Funding Activity
								</h2>

								<p className='mt-1 text-xs text-[#6B7280]'>
									Funding volume over time
								</p>
							</div>

							<div className='flex w-fit items-center gap-1 rounded-lg bg-[#F4F6FB] p-1'>
								{periods.map((period) => (
									<button
										key={period}
										type='button'
										onClick={() =>
											setSelectedPeriod(period)
										}
										aria-pressed={selectedPeriod === period}
										className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] ${
											selectedPeriod === period
												? 'bg-white text-[#4F46E5] shadow-sm'
												: 'text-[#6B7280] hover:text-[#202B49]'
										}`}
									>
										{period}
									</button>
								))}
							</div>
						</div>

						{/* Chart Summary */}
						<div className='mt-6'>
							<p className='text-xs font-medium text-[#6B7280]'>
								Highest recorded period
							</p>

							<p className='mt-1 text-2xl font-bold tabular-nums text-[#202B49]'>
								{formatCurrency(maxFunding)}
							</p>
						</div>

						{/* Bar Chart */}
						<div
							className='mt-7 flex h-52 items-end justify-between gap-2 border-b border-[#E2E5F0] pb-2 sm:gap-4'
							role='img'
							aria-label={`Mock funding volume chart for ${selectedPeriod}: ${currentTrend.map((item) => `${item.label}, ${formatCurrency(item.amount)}`).join('; ')}`}
						>
							{currentTrend.map((item) => {
								const height = (item.amount / maxFunding) * 100

								return (
									<div
										key={item.label}
										className='group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2'
									>
										<div className='relative flex h-full w-full items-end justify-center'>
											<div
												className='w-full max-w-12 rounded-t-lg bg-[#C7D2FE] transition-all duration-300 group-hover:bg-[#4F46E5]'
												style={{
													height: `${height}%`,
												}}
											/>

											<div className='pointer-events-none absolute -top-7 hidden whitespace-nowrap rounded-md bg-[#202B49] px-2 py-1 text-[10px] text-white group-hover:block'>
												{formatCompactCurrency(
													item.amount,
												)}
											</div>
										</div>

										<span className='text-[10px] font-medium text-[#9CA3AF] sm:text-xs'>
											{item.label}
										</span>
									</div>
								)
							})}
						</div>

						<div className='mt-4 flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<span className='size-2.5 rounded-sm bg-[#4F46E5]' />
								<span className='text-xs text-[#6B7280]'>
									Funding volume
								</span>
							</div>

							<span className='text-xs text-[#9CA3AF]'>
								{selectedPeriod === '7D'
									? 'Last 7 days'
									: selectedPeriod === '30D'
										? 'Last 30 days'
										: 'Last 90 days'}
							</span>
						</div>
					</div>

					{/* Funding Status */}
					<div className='rounded-2xl border border-[#E2E5F0] bg-white p-5 sm:p-6'>
						<h2 className='text-base font-bold text-[#202B49]'>
							Operation Status
						</h2>

						<p className='mt-1 text-xs text-[#6B7280]'>
							Funding distribution
						</p>

						<div className='mt-7 flex flex-col gap-5'>
							{[
								{
									label: 'Completed',
									count: 112,
									total: 128,
									color: 'bg-[#15803D]',
									text: 'text-[#15803D]',
								},
								{
									label: 'Pending',
									count: 3,
									total: 128,
									color: 'bg-[#D97706]',
									text: 'text-[#B45309]',
								},
								{
									label: 'Failed',
									count: 8,
									total: 128,
									color: 'bg-[#DC2626]',
									text: 'text-[#DC2626]',
								},
								{
									label: 'Reversed',
									count: 5,
									total: 128,
									color: 'bg-[#9CA3AF]',
									text: 'text-[#6B7280]',
								},
							].map((item) => (
								<div key={item.label}>
									<div className='mb-2 flex items-center justify-between'>
										<span className='text-sm font-medium text-[#4B5563]'>
											{item.label}
										</span>

										<span
											className={`text-sm font-bold tabular-nums ${item.text}`}
										>
											{item.count}
										</span>
									</div>

									<div className='h-2 overflow-hidden rounded-full bg-[#F3F4F6]'>
										<div
											className={`h-full rounded-full ${item.color}`}
											style={{
												width: `${(item.count / item.total) * 100}%`,
											}}
										/>
									</div>
								</div>
							))}
						</div>

						<div className='mt-8 rounded-xl border border-[#E2E5F0] bg-[#F9FAFC] p-4'>
							<div className='flex items-center gap-2'>
								<TrendingUp
									size={17}
									className='text-[#4F46E5]'
									aria-hidden='true'
								/>

								<p className='text-sm font-semibold text-[#202B49]'>
									Operation Summary
								</p>
							</div>

							<p className='mt-2 text-xs leading-5 text-[#6B7280]'>
								Review pending and unsuccessful operations
								before initiating further funding requests.
							</p>
						</div>
					</div>
				</section>

				{/* Funding Action and System Information */}
				<section className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
					{/* Initial Funding CTA */}
					<div className='relative overflow-hidden rounded-2xl bg-[#4F46E5] p-6 text-white lg:col-span-2'>
						<div className='pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/10 blur-2xl' />

						<div className='pointer-events-none absolute -bottom-24 right-24 size-56 rounded-full bg-[#818CF8]/30 blur-3xl' />

						<div className='relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
							<div className='max-w-lg'>
								<div className='mb-4 flex size-11 items-center justify-center rounded-xl bg-white/15'>
									<Zap
										size={22}
										aria-hidden='true'
									/>
								</div>

								<h2 className='text-xl font-bold sm:text-2xl'>
									Initial Account Funding
								</h2>

								<p className='mt-2 text-sm leading-6 text-indigo-100'>
									Deposit funds into an active customer
									account using the authorized system account.
								</p>

								<div className='mt-4 flex flex-wrap gap-3 text-xs text-indigo-100'>
									<span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>
										Minimum: ৳1,000
									</span>

									<span className='rounded-full border border-white/20 bg-white/10 px-3 py-1.5'>
										Authorized access only
									</span>
								</div>
							</div>

							<Link
								href='/system/transfer'
								className='inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#4F46E5] transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
							>
								Fund Account
								<ArrowRight
									size={17}
									aria-hidden='true'
								/>
							</Link>
						</div>
					</div>

					{/* Security Information */}
					<div className='rounded-2xl border border-[#E2E5F0] bg-white p-5 sm:p-6'>
						<div className='flex size-11 items-center justify-center rounded-xl bg-[#ECFDF5] text-[#15803D]'>
							<ShieldCheck
								size={22}
								aria-hidden='true'
							/>
						</div>

						<h2 className='mt-4 text-base font-bold text-[#202B49]'>
							System Security
						</h2>

						<p className='mt-2 text-xs leading-5 text-[#6B7280]'>
							Funding operations are processed through the
							authorized system account with transaction-level
							consistency.
						</p>

						<div className='mt-5 space-y-3 border-t border-[#E2E5F0] pt-4'>
							<div className='flex items-center justify-between'>
								<span className='text-xs text-[#6B7280]'>
									Access
								</span>

								<span className='text-xs font-semibold text-[#15803D]'>
									Authorized
								</span>
							</div>

							<div className='flex items-center justify-between'>
								<span className='text-xs text-[#6B7280]'>
									Minimum funding
								</span>

								<span className='text-xs font-semibold text-[#202B49]'>
									৳1,000
								</span>
							</div>

							<div className='flex items-center justify-between'>
								<span className='text-xs text-[#6B7280]'>
									Idempotency
								</span>

								<span className='text-xs font-semibold text-[#15803D]'>
									Required
								</span>
							</div>
						</div>
					</div>
				</section>

				{/* Recent Funding Activity */}
				<section className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white'>
					{/* Table Header */}
					<div className='flex flex-col justify-between gap-4 border-b border-[#E2E5F0] p-5 sm:flex-row sm:items-center sm:px-6'>
						<div>
							<h2 className='text-base font-bold text-[#202B49]'>
								Recent Funding Activity
							</h2>

							<p className='mt-1 text-xs text-[#6B7280]'>
								Latest initial funding operations
							</p>
						</div>

						<div className='flex flex-wrap items-center gap-2'>
							<select
								value={selectedStatus}
								onChange={(event) =>
									setSelectedStatus(event.target.value)
								}
								aria-label='Filter funding operations by status'
								className='min-h-10 rounded-lg border border-[#E2E5F0] bg-white px-3 text-xs font-medium text-[#4B5563] outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15'
							>
								<option value='ALL'>All Status</option>
								<option value='COMPLETED'>Completed</option>
								<option value='PENDING'>Pending</option>
								<option value='FAILED'>Failed</option>
								<option value='REVERSED'>Reversed</option>
							</select>

							<button
								type='button'
								onClick={() => setSelectedStatus('ALL')}
								className='inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E2E5F0] px-3 text-xs font-semibold text-[#4B5563] transition-colors hover:bg-[#F9FAFC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
							>
								<RefreshCw
									size={14}
									aria-hidden='true'
								/>
								Reset
							</button>
						</div>
					</div>

					{/* Table */}
					<div className='overflow-x-auto'>
						<table className='w-full min-w-225 text-left'>
							<thead className='bg-[#F9FAFC]'>
								<tr className='text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]'>
									<th className='px-6 py-4'>Transaction</th>

									<th className='px-6 py-4'>Receiver</th>

									<th className='px-6 py-4'>
										Receiver Account
									</th>

									<th className='px-6 py-4'>Amount</th>

									<th className='px-6 py-4'>Status</th>

									<th className='px-6 py-4'>Date & Time</th>
								</tr>
							</thead>

							<tbody className='divide-y divide-[#E2E5F0]'>
								{filteredActivity.length > 0 ? (
									filteredActivity.map((item) => {
										const status = statusStyles[item.status]

										const StatusIcon = status.icon

										return (
											<tr
												key={item.id}
												className='transition-colors hover:bg-[#F9FAFC]'
											>
												<td className='px-6 py-4'>
													<div className='flex items-center gap-2.5'>
														<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
															<ArrowDownLeft
																size={17}
																aria-hidden='true'
															/>
														</div>

														<div>
															<p className='text-xs font-semibold text-[#202B49]'>
																{item.id}
															</p>

															<p className='mt-1 text-[10px] text-[#9CA3AF]'>
																Initial funding
															</p>
														</div>
													</div>
												</td>

												<td className='px-6 py-4'>
													<p className='text-xs font-semibold text-[#202B49]'>
														{item.receiver}
													</p>
												</td>

												<td className='px-6 py-4'>
													<p className='font-mono text-xs text-[#6B7280]'>
														••••
														{item.account.slice(-6)}
													</p>
												</td>

												<td className='px-6 py-4'>
													<p className='text-xs font-bold tabular-nums text-[#202B49]'>
														{formatCurrency(
															item.amount,
														)}
													</p>
												</td>

												<td className='px-6 py-4'>
													<span
														className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${status.className}`}
													>
														<StatusIcon
															size={12}
															aria-hidden='true'
														/>

														{item.status}
													</span>
												</td>

												<td className='px-6 py-4'>
													<p className='whitespace-nowrap text-xs font-medium text-[#4B5563]'>
														{item.date}
													</p>

													<p className='mt-1 text-[10px] text-[#9CA3AF]'>
														{item.time}
													</p>
												</td>
											</tr>
										)
									})
								) : (
									<tr>
										<td
											colSpan={6}
											className='px-6 py-12 text-center'
										>
											<div className='flex flex-col items-center'>
												<div className='flex size-12 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]'>
													<Activity
														size={22}
														aria-hidden='true'
													/>
												</div>

												<p className='mt-3 text-sm font-semibold text-[#202B49]'>
													No funding operations found
												</p>

												<p className='mt-1 text-xs text-[#6B7280]'>
													Try selecting a different
													status.
												</p>
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Table Footer */}
					<div className='flex flex-col justify-between gap-3 border-t border-[#E2E5F0] px-5 py-4 sm:flex-row sm:items-center sm:px-6'>
						<p className='text-xs text-[#6B7280]'>
							Showing{' '}
							<span className='font-semibold text-[#202B49]'>
								{filteredActivity.length}
							</span>{' '}
							funding operations
						</p>

						<Link
							href='/system/transfer'
							className='inline-flex items-center gap-2 text-xs font-semibold text-[#4F46E5] transition-colors hover:text-[#4338CA]'
						>
							Go to initial funding
							<ArrowRight
								size={14}
								aria-hidden='true'
							/>
						</Link>
					</div>
				</section>

				{/* Footer Note */}
				<footer className='flex flex-col justify-between gap-2 border-t border-[#E2E5F0] pt-5 sm:flex-row sm:items-center'>
					<p className='text-xs text-[#9CA3AF]'>
						&copy; <CurrentYear /> NexBank. System Administration
						Console.
					</p>

					<div className='flex items-center gap-2 text-xs text-[#6B7280]'>
						<ShieldCheck
							size={14}
							className='text-[#15803D]'
							aria-hidden='true'
						/>
						<span>Restricted system environment</span>
					</div>
				</footer>
			</main>
		</div>
	)
}