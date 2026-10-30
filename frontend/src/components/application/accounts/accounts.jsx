import AccountsLayout from '@/components/application/layout/layout'

import AccountsPageHeader from '@/components/application/accounts/AccountsPageHeader'
import AccountsOverview from '@/components/application/accounts/AccountsOverview'
import AccountsToolbar from '@/components/application/accounts/AccountsToolbar'
import AccountsList from '@/components/application/accounts/AccountsList'

export default function Accounts() {
	return (
		<AccountsLayout
			title='Accounts'
			description='All accounts at NexBank'
		>
			<main className='mx-auto w-full max-w-360 space-y-8'>
				<AccountsPageHeader />
				<AccountsOverview />
				<AccountsToolbar />
				<AccountsList />
			</main>
		</AccountsLayout>
	)
}