import DashboardLayout from '@/components/application/layout/layout'
import WelcomeSection from '@/components/application/dashboard/WelcomeSection'
import BalanceOverview from '@/components/application/dashboard/BalanceOverview'
import QuickActions from '@/components/application/dashboard/QuickActions'
import RecentTransactions from '@/components/application/dashboard/RecentTransactions'

export default function Dashboard() {
	return (
		<DashboardLayout
			title='Dashboard'
			description='Your financial overview'
		>
			<div className='mx-auto w-full max-w-360 space-y-6'>
				<WelcomeSection />

				<BalanceOverview />

				<QuickActions />

				<RecentTransactions />
			</div>
		</DashboardLayout>
	)
}