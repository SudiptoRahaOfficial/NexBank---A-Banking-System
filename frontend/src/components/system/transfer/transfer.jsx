import SystemFundingPageHeader from '@/components/system/transfer/SystemFundingPageHeader'
import FundingOverview from '@/components/system/transfer/FundingOverview'
import InitialFundingForm from '@/components/system/transfer/InitialFundingForm'

export default function SystemFundTransfer() {
	return (
		<main className='min-h-screen bg-[#F4F6FB] px-4 py-8 sm:px-6 sm:py-10 lg:px-8'>
			<div className='mx-auto w-full max-w-5xl space-y-8'>
				<SystemFundingPageHeader />

				<FundingOverview />

				<div className='max-w-5xl'>
					<InitialFundingForm />
				</div>
			</div>
		</main>
	)
}