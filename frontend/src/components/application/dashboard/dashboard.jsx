import DashboardLayout from '@/components/application/layout/layout'

import DashboardWelcome from '@/components/application/dashboard/DashboardWelcome'
import TotalBalanceCard from '@/components/application/dashboard/TotalBalanceCard'
import QuickActions from '@/components/application/dashboard/QuickActions'
import AccountsSection from '@/components/application/dashboard/AccountsSection'
import RecentTransactions from '@/components/application/dashboard/RecentTransactions'

import SystemDashboard from '@/components/application/dashboard/SystemDashboard'

// Temporary mock authenticated user.
// Replace this with the actual authenticated user later.
const MOCK_USER = {
	systemUser: false,
}

export default function Dashboard() {
	if (MOCK_USER.systemUser === true) {
		return <SystemDashboard />
	}

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