'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
	ArrowDownLeft,
	ArrowUpRight,
	Eye,
	EyeOff,
	Wallet,
	ArrowRight,
} from 'lucide-react'

import DashboardCard from '@/components/application/ui/DashboardCard'
import SectionHeading from '@/components/application/ui/SectionHeading'
import { MOCK_DASHBOARD_DATA } from '@/components/application/dashboard/dashboardData'

const formatCurrency = (amount, currency = 'BDT') =>
	new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)

const maskAccountNumber = (accountNumber) => `•••• ${accountNumber.slice(-4)}`

export default function BalanceOverview() {
	const [balanceVisible, setBalanceVisible] = useState(true)

	const { summary, accounts } = MOCK_DASHBOARD_DATA

	const displayBalance = (amount, currency) =>
		balanceVisible ? formatCurrency(amount, currency) : '••••••••'

	return (
		<section aria-label='Balance overview'>
			<SectionHeading
				title='Your finances'
				description='An overview of your available banking information.'
			/>

			<div className='grid grid-cols-1 gap-5 xl:grid-cols-3'>
				{/* Total balance */}
				<DashboardCard className='relative overflow-hidden bg-[#4F46E5] text-white xl:col-span-1'>
					<div
						aria-hidden='true'
						className='pointer-events-none absolute -right-12 -top-12 size-40 rounded-full border-24 border-white/10'
					/>

					<div className='relative'>
						<div className='flex items-center justify-between gap-3'>
							<div className='flex items-center gap-2 text-sm text-white/80'>
								<Wallet
									size={18}
									aria-hidden='true'
								/>
								Total balance
							</div>

							<button
								type='button'
								onClick={() =>
									setBalanceVisible((visible) => !visible)
								}
								aria-label={
									balanceVisible
										? 'Hide balances'
										: 'Show balances'
								}
								className='rounded-lg p-2 text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
							>
								{balanceVisible ? (
									<EyeOff
										size={18}
										aria-hidden='true'
									/>
								) : (
									<Eye
										size={18}
										aria-hidden='true'
									/>
								)}
							</button>
						</div>

						<p
							className='mt-5 wrap-break-words text-2xl font-bold tracking-tight tabular-nums sm:text-3xl'
							aria-label={
								balanceVisible
									? `Total balance ${formatCurrency(summary.totalBalance, summary.currency)}`
									: 'Total balance hidden'
							}
						>
							{displayBalance(
								summary.totalBalance,
								summary.currency,
							)}
						</p>

						<p className='mt-2 text-sm text-white/75'>
							Across your accounts
						</p>

						<div className='mt-7 flex items-center justify-between border-t border-white/20 pt-4'>
							<span className='text-sm text-white/80'>
								Active accounts
							</span>

							<span className='text-lg font-semibold tabular-nums'>
								{summary.accountCount}
							</span>
						</div>

						<Link
							href='/accounts'
							className='mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-white hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
						>
							View accounts
							<ArrowRight
								size={16}
								aria-hidden='true'
							/>
						</Link>
					</div>
				</DashboardCard>

				{/* Account summaries */}
				<div className='grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-2'>
					{accounts.map((account) => (
						<DashboardCard
							key={account.id}
							className='flex min-w-0 flex-col justify-between'
						>
							<div>
								<div className='flex items-start justify-between gap-3'>
									<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
										<Wallet
											size={21}
											aria-hidden='true'
										/>
									</span>

									<span className='rounded-full bg-[#F4F6FB] px-2.5 py-1 text-xs font-medium text-[#6B7280]'>
										{account.type}
									</span>
								</div>

								<h3 className='mt-5 text-base font-semibold text-[#202B49]'>
									{account.name}
								</h3>

								<p className='mt-1 text-sm text-[#6B7280]'>
									{maskAccountNumber(account.accountNumber)}
								</p>

								<p className='mt-4 wrap-break-words text-xl font-bold tracking-tight text-[#202B49] tabular-nums'>
									{displayBalance(
										account.balance,
										account.currency,
									)}
								</p>
							</div>

							<Link
								href={`/accounts/${account.id}`}
								className='mt-5 inline-flex min-h-10 items-center justify-between gap-2 border-t border-[#E2E5F0] pt-3 text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
							>
								Account details
								<ArrowRight
									size={16}
									aria-hidden='true'
								/>
							</Link>
						</DashboardCard>
					))}
				</div>
			</div>

			{/* Income and expenses */}
			<div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2'>
				<DashboardCard>
					<div className='flex items-center gap-3'>
						<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#15803D]'>
							<ArrowDownLeft
								size={21}
								aria-hidden='true'
							/>
						</span>

						<div className='min-w-0'>
							<p className='text-sm text-[#6B7280]'>
								Monthly income
							</p>

							<p className='mt-1 wrap-break-words text-xl font-bold text-[#202B49] tabular-nums'>
								{displayBalance(
									summary.monthlyIncome,
									summary.currency,
								)}
							</p>
						</div>
					</div>
				</DashboardCard>

				<DashboardCard>
					<div className='flex items-center gap-3'>
						<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#DC2626]'>
							<ArrowUpRight
								size={21}
								aria-hidden='true'
							/>
						</span>

						<div className='min-w-0'>
							<p className='text-sm text-[#6B7280]'>
								Monthly expenses
							</p>

							<p className='mt-1 wrap-break-words text-xl font-bold text-[#202B49] tabular-nums'>
								{displayBalance(
									summary.monthlyExpenses,
									summary.currency,
								)}
							</p>
						</div>
					</div>
				</DashboardCard>
			</div>
		</section>
	)
}
