'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function AccountCreationError({ message, onRetry }) {
	return (
		<section
			aria-labelledby='account-creation-error-title'
			className='mx-auto w-full max-w-xl rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm sm:p-8'
		>
			{/* Error Icon */}
			<div className='flex flex-col items-center text-center'>
				<div className='flex size-16 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]'>
					<AlertTriangle
						size={34}
						strokeWidth={1.8}
						aria-hidden='true'
					/>
				</div>

				<span className='mt-5 rounded-full bg-[#FEF2F2] px-3 py-1 text-xs font-semibold text-[#DC2626]'>
					Creation Failed
				</span>

				<h2
					id='account-creation-error-title'
					className='mt-3 text-xl font-bold tracking-tight text-[#202B49] sm:text-2xl'
				>
					Unable to Create Account
				</h2>

				<p className='mt-2 max-w-sm text-sm leading-6 text-[#6B7280]'>
					{message ||
						'We could not complete your account creation request. Please try again.'}
				</p>
			</div>

			{/* Error Information */}
			<div
				role='alert'
				className='mt-7 flex items-start gap-3 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4'
			>
				<AlertTriangle
					size={18}
					className='mt-0.5 shrink-0 text-[#DC2626]'
					aria-hidden='true'
				/>

				<div>
					<h3 className='text-sm font-semibold text-[#991B1B]'>
						Account creation was not confirmed
					</h3>

					<p className='mt-1 text-xs leading-5 text-[#B91C1C]'>
						Please review the error and try again if appropriate. Do
						not assume that an account was created successfully
						without a confirmed response.
					</p>
				</div>
			</div>

			{/* Recovery Actions */}
			<div className='mt-7 flex flex-col gap-3 sm:flex-row'>
				<button
					type='button'
					onClick={onRetry}
					className='inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					<RefreshCw
						size={17}
						aria-hidden='true'
					/>
					Try Again
				</button>

				<Link
					href='/accounts'
					className='inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-[#E2E5F0] bg-white px-5 py-3 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					<ArrowLeft
						size={17}
						aria-hidden='true'
					/>
					Back to Accounts
				</Link>
			</div>
		</section>
	)
}