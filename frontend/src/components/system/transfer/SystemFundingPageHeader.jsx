import { ArrowLeftRight, ShieldCheck } from 'lucide-react'

export default function SystemFundingPageHeader() {
	return (
		<div className='space-y-3'>
			<div className='flex flex-wrap items-center gap-2'>
				<div className='flex size-10 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
					<ArrowLeftRight
						size={20}
						aria-hidden='true'
					/>
				</div>

				<span className='inline-flex items-center gap-1.5 rounded-full border border-[#E2E5F0] bg-white px-3 py-1 text-xs font-medium text-[#6B7280]'>
					<ShieldCheck
						size={14}
						aria-hidden='true'
					/>
					Restricted operation
				</span>
			</div>

			<div className='space-y-1'>
				<h1 className='text-2xl font-semibold tracking-tight text-[#202B49] sm:text-3xl'>
					Initial Fund Deposit
				</h1>

				<p className='max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base'>
					Fund a customer account using the bank's authorized system
					account. Review the deposit details carefully before
					confirming the operation.
				</p>
			</div>
		</div>
	)
}