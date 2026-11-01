import Link from 'next/link'
import { ArrowRight, Check, CheckCircle2, Copy, Landmark } from 'lucide-react'

export default function AccountCreationSuccess({ account }) {
	async function handleCopyAccountId() {
		if (!account?.id || !navigator.clipboard?.writeText) {
			return
		}

		try {
			await navigator.clipboard.writeText(account.id)
		} catch {
			// Clipboard access may be unavailable in some environments.
		}
	}

	return (
		<section
			aria-labelledby='account-creation-success-title'
			className='mx-auto w-full max-w-xl rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm sm:p-8'
		>
			{/* Success Icon */}
			<div className='flex flex-col items-center text-center'>
				<div className='flex size-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]'>
					<CheckCircle2
						size={34}
						strokeWidth={1.8}
						aria-hidden='true'
					/>
				</div>

				<span className='mt-5 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#15803D]'>
					Account Created
				</span>

				<h2
					id='account-creation-success-title'
					className='mt-3 text-xl font-bold tracking-tight text-[#202B49] sm:text-2xl'
				>
					Your account is ready
				</h2>

				<p className='mt-2 max-w-sm text-sm leading-6 text-[#6B7280]'>
					Your new NexBank account has been created successfully. You
					can now view its details from your accounts page.
				</p>
			</div>

			{/* Account Information */}
			<div className='mt-8 overflow-hidden rounded-xl border border-[#E2E5F0]'>
				<div className='flex items-center gap-3 border-b border-[#E2E5F0] bg-[#F8F9FC] px-4 py-4'>
					<div className='flex size-10 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
						<Landmark
							size={20}
							aria-hidden='true'
						/>
					</div>

					<div>
						<h3 className='text-sm font-semibold text-[#202B49]'>
							Account Information
						</h3>

						<p className='mt-0.5 text-xs text-[#6B7280]'>
							Newly created account
						</p>
					</div>
				</div>

				<div className='space-y-4 p-4'>
					{/* Account ID */}
					<div className='space-y-2'>
						<span className='text-xs font-medium text-[#6B7280]'>
							Account ID
						</span>

						<div className='flex items-center justify-between gap-3 rounded-lg bg-[#F4F6FB] px-3 py-3'>
							<span className='min-w-0 break-all font-mono text-xs font-medium text-[#202B49] sm:text-sm'>
								{account?.id || 'Unavailable'}
							</span>

							{account?.id && (
								<button
									type='button'
									onClick={handleCopyAccountId}
									aria-label='Copy account ID'
									className='flex size-9 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-white hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
								>
									<Copy
										size={16}
										aria-hidden='true'
									/>
								</button>
							)}
						</div>
					</div>

					{/* Account Status */}
					<div className='flex items-center justify-between gap-3'>
						<span className='text-sm text-[#6B7280]'>
							Account Status
						</span>

						<span className='inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]'>
							<Check
								size={13}
								aria-hidden='true'
							/>
							{account?.status || 'Unavailable'}
						</span>
					</div>

					{/* Currency */}
					<div className='flex items-center justify-between gap-3'>
						<span className='text-sm text-[#6B7280]'>Currency</span>

						<span className='text-sm font-semibold text-[#202B49]'>
							{account?.currency || 'Unavailable'}
						</span>
					</div>
				</div>
			</div>

			{/* Navigation */}
			<Link
				href='/accounts'
				className='mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
			>
				Go to Accounts
				<ArrowRight
					size={17}
					aria-hidden='true'
				/>
			</Link>
		</section>
	)
}