import { Landmark, Wallet } from 'lucide-react'

import {
	MOCK_ACCOUNTS_RESPONSE,
	MOCK_ACCOUNT_BALANCES,
} from '@/components/application/accounts/accountsData'

function formatCurrency(amount, currency) {
	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

function OverviewCard({ title, value, description, icon: Icon }) {
	return (
		<article className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm sm:p-6'>
			<div className='flex items-start justify-between gap-4'>
				<div className='min-w-0 space-y-2'>
					<p className='text-sm font-medium text-[#6B7280]'>
						{title}
					</p>

					<p className='text-2xl font-semibold tracking-tight text-[#202B49] tabular-nums sm:text-3xl'>
						{value}
					</p>
				</div>

				<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
					<Icon
						size={21}
						aria-hidden='true'
					/>
				</div>
			</div>

			<p className='mt-4 text-xs leading-5 text-[#6B7280] sm:text-sm'>
				{description}
			</p>
		</article>
	)
}

export default function AccountsOverview() {
	const accounts = MOCK_ACCOUNTS_RESPONSE.accounts

	const totalAccounts = accounts.length

	const currencies = new Set(accounts.map((account) => account.currency))

	const currency = accounts[0]?.currency || 'BDT'

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

	const hasSingleCurrency = currencies.size <= 1

	const hasCompleteBalances = accounts.every((account) =>
		balanceByAccount.has(account._id),
	)

	const canCalculateTotal = hasSingleCurrency && hasCompleteBalances

	const totalBalance = canCalculateTotal
		? accounts.reduce(
				(total, account) => total + balanceByAccount.get(account._id),
				0,
			)
		: null

	const balanceValue =
		totalBalance === null
			? 'Unavailable'
			: formatCurrency(totalBalance, currency)

	const balanceDescription = !hasSingleCurrency
		? 'Accounts with different currencies cannot be combined'
		: !hasCompleteBalances
			? 'Some account balances are currently unavailable'
			: totalAccounts === 0
				? 'No accounts available yet'
				: 'Combined balance across all your accounts'

	return (
		<section
			aria-label='Accounts overview'
			className='grid grid-cols-1 gap-4 sm:grid-cols-2'
		>
			<OverviewCard
				title='Total Balance'
				value={balanceValue}
				description={balanceDescription}
				icon={Wallet}
			/>

			<OverviewCard
				title='Total Accounts'
				value={totalAccounts.toString()}
				description='Total accounts registered with NexBank'
				icon={Landmark}
			/>
		</section>
	)
}