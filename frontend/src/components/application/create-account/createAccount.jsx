import CreateAccountPageHeader from '@/components/application/create-account/CreateAccountPageHeader'
import CreateAccountCard from '@/components/application/create-account/CreateAccountCard'
import CurrentYear from '@/components/shared/CurrentYear'

export default function CreateAccountPage() {
	return (
		<div className='min-h-screen bg-[#F4F6FB]'>
			{/* Standalone Page Header */}
			<CreateAccountPageHeader />

			{/* Main Content */}
			<main className='mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8'>
				{/* Page Introduction */}
				<div className='mb-8 w-full max-w-2xl text-center'>
					<p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#4F46E5]'>
						NexBank Accounts
					</p>

					<h1 className='mt-3 text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'>
						Expand Your Banking Options
					</h1>

					<p className='mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6B7280]'>
						Create an additional account and manage your banking
						activities from one place.
					</p>
				</div>

				{/* Account Creation */}
				<CreateAccountCard />
			</main>

			{/* Page Footer */}
			<footer className='px-4 pb-7 text-center'>
				<p className='text-xs text-[#9CA3AF]'>
					&copy; <CurrentYear /> NexBank. All rights reserved.
				</p>
			</footer>
		</div>
	)
}