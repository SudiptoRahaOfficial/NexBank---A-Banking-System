'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
	ArrowRight,
	CreditCard,
	Eye,
	EyeOff,
	Landmark,
	Plus,
	Wallet,
} from 'lucide-react'

import { MOCK_DASHBOARD_DATA } from './dashboardData'
import { formatCurrency, maskAccountNumber } from './dashboardUtils'

function AccountCard({ account, visible }) {
	const currency = account.currency || 'BDT'

	const isCheckingAccount = account.type?.toLowerCase().includes('checking')

	return (
		<Link
			href={`/accounts/${encodeURIComponent(account.id)}`}
			className='group rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-[#C7D2FE] hover:shadow-md hover:shadow-[#202B49]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
		>
			<div className='flex items-start justify-between gap-3'>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]'>
						{isCheckingAccount ? (
							<CreditCard
								className='size-5'
								aria-hidden='true'
							/>
						) : (
							<Landmark
								className='size-5'
								aria-hidden='true'
							/>
						)}
					</div>

					<div className='min-w-0'>
						<h3 className='truncate text-sm font-semibold text-[#202B49]'>
							{account.name || 'Bank Account'}
						</h3>

						<p className='mt-1 text-xs text-[#6B7280]'>
							{account.type || 'Account'}
						</p>
					</div>
				</div>

				<ArrowRight
					className='size-4 shrink-0 text-[#9CA3AF] transition-transform group-hover:translate-x-1 group-hover:text-[#4F46E5]'
					aria-hidden='true'
				/>
			</div>

			<div className='mt-6'>
				<p className='text-xs text-[#6B7280]'>Available balance</p>

				<p className='mt-1 text-xl font-bold tracking-tight text-[#202B49]'>
					{visible
						? formatCurrency(account.balance, currency)
						: '••••••••'}
				</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-t border-[#F1F2F5] pt-4'>
				<p className='text-xs text-[#9CA3AF]'>
					{maskAccountNumber(account.accountNumber)}
				</p>

				<span
					className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
						account.status === 'Active'
							? 'bg-[#ECFDF5] text-[#059669]'
							: 'bg-[#F3F4F6] text-[#6B7280]'
					}`}
				>
					{account.status || 'Status unavailable'}
				</span>
			</div>
		</Link>
	)
}

function EmptyAccountsState() {
	return (
		<div className='rounded-xl border border-dashed border-[#D1D5DB] bg-white px-5 py-12 text-center'>
			<div className='mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#4F46E5]'>
				<Wallet
					className='size-6'
					aria-hidden='true'
				/>
			</div>

			<h3 className='mt-4 text-base font-semibold text-[#202B49]'>
				No accounts found
			</h3>

			<p className='mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6B7280]'>
				Your bank accounts will appear here once they are available.
			</p>

			<Link
				href='/accounts'
				className='mt-5 inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
			>
				Explore accounts
				<Plus
					className='size-4'
					aria-hidden='true'
				/>
			</Link>
		</div>
	)
}

export default function AccountsSection() {
	const [visible, setVisible] = useState(true)

	const accounts = MOCK_DASHBOARD_DATA.accounts

	const validAccounts = Array.isArray(accounts) ? accounts : []

	return (
		<section className='space-y-5'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h2 className='text-lg font-bold text-[#202B49]'>
						Your accounts
					</h2>

					<p className='mt-1 text-sm text-[#6B7280]'>
						Manage and monitor your bank accounts.
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<button
						type='button'
						onClick={() => setVisible((current) => !current)}
						aria-label={
							visible
								? 'Hide account balances'
								: 'Show account balances'
						}
						aria-pressed={visible}
						className='inline-flex size-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] transition-colors hover:bg-[#F9FAFB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
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

					<Link
						href='/accounts'
						className='inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-semibold text-[#202B49] transition-colors hover:border-[#C7D2FE] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						View all
						<ArrowRight
							className='size-3.5'
							aria-hidden='true'
						/>
					</Link>
				</div>
			</div>

			{validAccounts.length > 0 ? (
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{validAccounts.map((account) => (
						<AccountCard
							key={account.id}
							account={account}
							visible={visible}
						/>
					))}
				</div>
			) : (
				<EmptyAccountsState />
			)}
		</section>
	)
}