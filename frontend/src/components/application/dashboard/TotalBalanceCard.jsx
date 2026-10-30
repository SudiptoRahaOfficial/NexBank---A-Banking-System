'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Eye, EyeOff, Wallet } from 'lucide-react'

import { MOCK_DASHBOARD_DATA } from './dashboardData'
import { formatCurrency } from './dashboardUtils'

function BalanceVisibilityButton({ visible, onToggle }) {
	return (
		<button
			type='button'
			onClick={onToggle}
			aria-label={visible ? 'Hide balance' : 'Show balance'}
			aria-pressed={visible}
			className='inline-flex size-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#E9EFFF] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
		>
			{visible ? (
				<Eye
					className='size-4'
					aria-hidden='true'
				/>
			) : (
				<EyeOff
					className='size-4'
					aria-hidden='true'
				/>
			)}
		</button>
	)
}

export default function TotalBalanceCard() {
	const [visible, setVisible] = useState(true)

	const { summary, accounts } = MOCK_DASHBOARD_DATA

	const currency = summary.currency || 'BDT'

	const totalBalance = formatCurrency(summary.totalBalance, currency)
	const income = formatCurrency(summary.monthlyIncome, currency)
	const expenses = formatCurrency(summary.monthlyExpenses, currency)

	const accountCount = accounts.length

	const hiddenBalance = '••••••••'

	return (
		<section className='space-y-5'>
			{/* Total Balance */}
			<div className='relative overflow-hidden rounded-2xl bg-linear-to-br from-[#4F46E5] via-[#4338CA] to-[#3730A3] p-5 text-white shadow-sm sm:p-7'>
				{/* Background Decoration */}
				<div className='pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-white/10' />
				<div className='pointer-events-none absolute -right-6 -top-14 size-52 rounded-full border border-white/10' />
				<div className='pointer-events-none absolute -bottom-32 left-1/3 size-64 rounded-full bg-[#818CF8]/20 blur-3xl' />

				<div className='relative'>
					{/* Header */}
					<div className='flex items-center justify-between gap-4'>
						<div className='flex items-center gap-2.5'>
							<div className='flex size-10 items-center justify-center rounded-xl bg-white/15 text-white'>
								<Wallet
									className='size-5'
									aria-hidden='true'
								/>
							</div>

							<div>
								<p className='text-sm font-semibold text-white'>
									Total balance
								</p>
								<p className='mt-0.5 text-xs text-indigo-100/80'>
									Across all your accounts
								</p>
							</div>
						</div>

						<BalanceVisibilityButton
							visible={visible}
							onToggle={() => setVisible((current) => !current)}
						/>
					</div>

					{/* Balance */}
					<div className='mt-8'>
						<p className='text-xs font-medium tracking-wide text-indigo-100/80'>
							AVAILABLE BALANCE
						</p>

						<p
							className='mt-2 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl'
							aria-live='polite'
						>
							{visible ? totalBalance : hiddenBalance}
						</p>

						<p className='mt-2 text-xs text-indigo-100/75'>
							Your combined account balance
						</p>
					</div>

					{/* Actions */}
					<div className='mt-8 flex flex-wrap items-center gap-3'>
						<Link
							href='/accounts'
							className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#4338CA] transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							View accounts
							<ArrowUpRight
								className='size-4'
								aria-hidden='true'
							/>
						</Link>

						<Link
							href='/transactions'
							className='inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
						>
							Transactions
							<ArrowUpRight
								className='size-4'
								aria-hidden='true'
							/>
						</Link>
					</div>
				</div>
			</div>

			{/* Financial Summary */}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
				{/* Total Accounts */}
				<div className='rounded-xl border border-[#E2E5F0] bg-white p-4 transition-shadow hover:shadow-sm'>
					<p className='text-xs font-medium text-[#6B7280]'>
						Total accounts
					</p>

					<p className='mt-2 text-2xl font-bold text-[#202B49] tabular-nums'>
						{accountCount}
					</p>

					<p className='mt-1 text-xs text-[#9CA3AF]'>
						Your registered accounts
					</p>
				</div>

				{/* Monthly Income */}
				<div className='rounded-xl border border-[#E2E5F0] bg-white p-4 transition-shadow hover:shadow-sm'>
					<p className='text-xs font-medium text-[#6B7280]'>
						Monthly income
					</p>

					<p className='mt-2 text-xl font-bold text-[#15803D] tabular-nums'>
						{visible ? income : hiddenBalance}
					</p>

					<div className='mt-1 flex items-center gap-1 text-xs font-medium text-[#15803D]'>
						<ArrowDownRight
							className='size-3.5'
							aria-hidden='true'
						/>
						Income received
					</div>
				</div>

				{/* Monthly Expenses */}
				<div className='rounded-xl border border-[#E2E5F0] bg-white p-4 transition-shadow hover:shadow-sm'>
					<p className='text-xs font-medium text-[#6B7280]'>
						Monthly expenses
					</p>

					<p className='mt-2 text-xl font-bold text-[#DC2626] tabular-nums'>
						{visible ? expenses : hiddenBalance}
					</p>

					<div className='mt-1 flex items-center gap-1 text-xs font-medium text-[#DC2626]'>
						<ArrowUpRight
							className='size-3.5'
							aria-hidden='true'
						/>
						Expenses paid
					</div>
				</div>
			</div>
		</section>
	)
}