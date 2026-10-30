import DashboardLayout from '@/components/application/layout/layout'

import DashboardWelcome from '@/components/application/dashboard/DashboardWelcome'
import TotalBalanceCard from '@/components/application/dashboard/TotalBalanceCard'
import QuickActions from '@/components/application/dashboard/QuickActions'
import AccountsSection from '@/components/application/dashboard/AccountsSection'
import RecentTransactions from '@/components/application/dashboard/RecentTransactions'

export default function Dashboard() {
	return (
		<DashboardLayout
			title='Dashboard'
			description='Your financial overview'
		>
			<main className='mx-auto w-full max-w-360 space-y-8'>
				<DashboardWelcome />
				<TotalBalanceCard />
				<QuickActions />
				<AccountsSection />
				<RecentTransactions />
			</main>
		</DashboardLayout>
	)
}