import { ArrowLeftRight, ShieldCheck } from 'lucide-react'

export default function FundTransferPageHeader() {
	return (
		<section
			aria-labelledby='fund-transfer-title'
			className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
		>
			{/* Page heading */}
			<div className='space-y-2'>
				<div className='flex items-center gap-2'>
					<div className='flex size-10 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
						<ArrowLeftRight
							size={21}
							strokeWidth={1.8}
							aria-hidden='true'
						/>
					</div>

					<h1
						id='fund-transfer-title'
						className='text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'
					>
						Fund Transfer
					</h1>
				</div>

				<p className='max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base'>
					Transfer money securely to another NexBank account using the
					recipient&apos;s account ID.
				</p>
			</div>

			{/* Security indicator */}
			<div className='inline-flex w-fit items-center gap-2 rounded-full border border-[#DCEFE3] bg-[#F0FDF4] px-3.5 py-2 text-sm font-medium text-[#15803D]'>
				<ShieldCheck
					size={17}
					strokeWidth={1.8}
					aria-hidden='true'
				/>

				<span>Secure transfer</span>
			</div>
		</section>
	)
}