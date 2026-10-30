import TransactionsLayout from '@/components/application/layout/layout'

import TransactionsPageHeader from '@/components/application/transactions/TransactionsPageHeader'
import TransactionsContent from '@/components/application/transactions/TransactionsContent'

export default function Transactions() {
	return (
		<TransactionsLayout
			title='Transactions'
			description='Manage and track all your account transactions'
		>
			<main className='mx-auto w-full max-w-360 space-y-8'>
				<TransactionsPageHeader />

				<TransactionsContent />
			</main>
		</TransactionsLayout>
	)
}