import FundTransferLayout from '@/components/application/layout/layout'

import FundTransferPageHeader from '@/components/application/transfer/FundTransferPageHeader'
import TransferOverview from '@/components/application/transfer/TransferOverview'
import TransferForm from '@/components/application/transfer/TransferForm'

export default function FundTransfer() {
	return (
		<FundTransferLayout
			title='Fund Transfer'
			description='Transfer funds securely between accounts'
		>
			<main className='mx-auto w-full max-w-360 space-y-8'>
				{/* Page heading */}
				<FundTransferPageHeader />

				{/* Transfer requirements */}
				<TransferOverview />

				{/* Main transfer form */}
				<TransferForm />
			</main>
		</FundTransferLayout>
	)
}