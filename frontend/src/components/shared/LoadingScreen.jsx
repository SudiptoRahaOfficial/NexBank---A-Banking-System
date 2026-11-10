'use client'

import { Landmark, LoaderCircle } from 'lucide-react'

export default function LoadingScreen() {
	return (
		<div
			className='fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-[#F4F6FB] px-4'
			role='status'
			aria-live='polite'
			aria-busy='true'
			aria-label='Loading NexBank'
		>
			<div className='flex w-full max-w-sm flex-col items-center text-center'>
				{/* Branding */}
				<div className='flex size-16 items-center justify-center rounded-2xl bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/20'>
					<Landmark
						size={30}
						strokeWidth={1.8}
						aria-hidden='true'
					/>
				</div>

				{/* Brand Name */}
				<h1 className='mt-5 text-2xl font-bold tracking-tight text-[#202B49]'>
					NexBank
				</h1>

				<p className='mt-1 text-sm text-[#6B7280]'>
					Banking made simpler.
				</p>

				{/* Loading Indicator */}
				<div className='mt-10 flex items-center justify-center'>
					<LoaderCircle
						size={28}
						strokeWidth={2}
						className='animate-spin text-[#4F46E5] motion-reduce:animate-none'
						aria-hidden='true'
					/>
				</div>

				{/* Loading Message */}
				<p className='mt-4 text-sm font-medium text-[#202B49]'>
					Preparing your experience
				</p>

				<p className='mt-1 text-xs text-[#6B7280]'>
					Please wait while we get things ready.
				</p>

				{/* Animated Progress Indicator */}
				<div className='mt-8 h-1 w-36 overflow-hidden rounded-full bg-[#E2E5F0]'>
					<div className='h-full w-1/2 animate-[nexbank-loading_1.5s_ease-in-out_infinite] rounded-full bg-[#4F46E5] motion-reduce:animate-none' />
				</div>

				{/* Footer */}
				<p className='mt-8 text-[11px] font-medium tracking-wide text-[#9CA3AF]'>
					SECURE BANKING EXPERIENCE
				</p>
			</div>
		</div>
	)
}