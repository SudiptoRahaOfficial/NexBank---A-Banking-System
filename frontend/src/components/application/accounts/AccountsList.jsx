'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import AccountCard from '@/components/application/accounts/AccountCard'
import AccountsEmptyState from '@/components/application/accounts/AccountsEmptyState'

import {
	MOCK_ACCOUNTS_RESPONSE,
	MOCK_ACCOUNT_BALANCES,
} from '@/components/application/accounts/accountsData'

function AccountsListContent() {
	const searchParams = useSearchParams()

	const searchQuery = (searchParams.get('search') || '').trim().toLowerCase()

	const statusFilter = searchParams.get('status') || 'ALL'

	const accounts = MOCK_ACCOUNTS_RESPONSE.accounts

	const balanceByAccount = new Map(
		MOCK_ACCOUNT_BALANCES.filter(
			(response) =>
				response.status === 'success' &&
				response.balance &&
				typeof response.balance.currentBalance === 'number' &&
				Number.isFinite(response.balance.currentBalance),
		).map((response) => [
			response.balance.account,
			response.balance.currentBalance,
		]),
	)

	const filteredAccounts = accounts.filter((account) => {
		const matchesSearch = account._id.toLowerCase().includes(searchQuery)

		const matchesStatus =
			statusFilter === 'ALL' || account.status === statusFilter

		return matchesSearch && matchesStatus
	})

	const hasAccounts = accounts.length > 0
	const hasMatchingAccounts = filteredAccounts.length > 0

	return (
		<section
			aria-labelledby='accounts-list-heading'
			className='space-y-5'
		>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<div className='space-y-1'>
					<h2
						id='accounts-list-heading'
						className='text-lg font-semibold text-[#202B49] sm:text-xl'
					>
						Your Accounts
					</h2>

					<p className='text-sm text-[#6B7280]'>
						View your account information and balances.
					</p>
				</div>

				{hasAccounts && (
					<span className='rounded-full bg-[#E9EFFF] px-3 py-1 text-xs font-semibold text-[#4F46E5]'>
						{filteredAccounts.length}{' '}
						{filteredAccounts.length === 1 ? 'Account' : 'Accounts'}
					</span>
				)}
			</div>

			{!hasAccounts ? (
				<AccountsEmptyState type='empty' />
			) : !hasMatchingAccounts ? (
				<AccountsEmptyState type='no-results' />
			) : (
				<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
					{filteredAccounts.map((account) => (
						<AccountCard
							key={account._id}
							account={account}
							balance={balanceByAccount.get(account._id)}
						/>
					))}
				</div>
			)}
		</section>
	)
}

function AccountsListFallback() {
	return (
		<div
			aria-label='Loading accounts'
			role='status'
			className='grid grid-cols-1 gap-4 lg:grid-cols-2'
		>
			{[1, 2].map((item) => (
				<div
					key={item}
					className='h-64 animate-pulse rounded-2xl border border-[#E2E5F0] bg-white'
				/>
			))}
		</div>
	)
}

export default function AccountsList() {
	return (
		<Suspense fallback={<AccountsListFallback />}>
			<AccountsListContent />
		</Suspense>
	)
}