'use client'

import { useState } from 'react'
import {
	ArrowRight,
	CheckCircle2,
	Landmark,
	ShieldCheck,
	Wallet,
} from 'lucide-react'

import AccountCreationConfirmation from './AccountCreationConfirmation'
import AccountCreationSuccess from './AccountCreationSuccess'
import AccountCreationError from './AccountCreationError'

import { MOCK_CREATE_ACCOUNT_RESPONSE } from './create-account.data'

export default function CreateAccountCard() {
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

	const [creationStatus, setCreationStatus] = useState('IDLE')
	const [createdAccount, setCreatedAccount] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	// Open the confirmation dialog.
	function handleOpenConfirmation() {
		setIsConfirmationOpen(true)
	}

	// Close the confirmation dialog.
	function handleCancelConfirmation() {
		setIsConfirmationOpen(false)
	}

	// Demonstrate the account creation flow using the documented mock response.
	function handleConfirmCreation() {
		setIsConfirmationOpen(false)
		setCreationStatus('LOADING')
		setErrorMessage('')

		try {
			const response = MOCK_CREATE_ACCOUNT_RESPONSE

			if (response.status !== 'success' || !response.account) {
				throw new Error(
					'Unable to process the account creation response.',
				)
			}

			setCreatedAccount(response.account)
			setCreationStatus('SUCCESS')
		} catch (error) {
			setCreatedAccount(null)
			setErrorMessage(
				error instanceof Error
					? error.message
					: 'Something went wrong. Please try again.',
			)
			setCreationStatus('ERROR')
		}
	}

	// Reset the flow so the user can retry.
	function handleRetry() {
		setCreatedAccount(null)
		setErrorMessage('')
		setCreationStatus('IDLE')
		setIsConfirmationOpen(false)
	}

	// Display the success screen.
	if (creationStatus === 'SUCCESS') {
		return <AccountCreationSuccess account={createdAccount} />
	}

	// Display the error screen.
	if (creationStatus === 'ERROR') {
		return (
			<AccountCreationError
				message={errorMessage}
				onRetry={handleRetry}
			/>
		)
	}

	return (
		<>
			<section
				aria-labelledby='create-account-title'
				className='mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'
			>
				{/* Card Header */}
				<div className='border-b border-[#E2E5F0] px-5 py-6 sm:px-8 sm:py-8'>
					<div className='flex size-14 items-center justify-center rounded-2xl bg-[#E9EFFF] text-[#4F46E5]'>
						<Landmark
							size={28}
							strokeWidth={1.8}
							aria-hidden='true'
						/>
					</div>

					<h1
						id='create-account-title'
						className='mt-5 text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'
					>
						Create a New Account
					</h1>

					<p className='mt-2 max-w-lg text-sm leading-6 text-[#6B7280]'>
						Open an additional NexBank account under your existing
						profile. Your new account will be automatically
						configured.
					</p>
				</div>

				{/* Account Details */}
				<div className='px-5 py-6 sm:px-8 sm:py-7'>
					<div className='flex items-center justify-between gap-3'>
						<h2 className='text-sm font-semibold text-[#202B49]'>
							Account Details
						</h2>

						<span className='rounded-full bg-[#E9EFFF] px-3 py-1 text-xs font-semibold text-[#4F46E5]'>
							Automatic Setup
						</span>
					</div>

					<div className='mt-4 divide-y divide-[#E2E5F0] rounded-xl border border-[#E2E5F0]'>
						{/* Account Type */}
						<div className='flex items-center gap-3 p-4'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F6FB] text-[#4F46E5]'>
								<Wallet
									size={20}
									aria-hidden='true'
								/>
							</div>

							<div className='min-w-0 flex-1'>
								<p className='text-sm font-medium text-[#202B49]'>
									Account Creation
								</p>

								<p className='mt-0.5 text-xs text-[#6B7280]'>
									Automatically created for your profile
								</p>
							</div>

							<CheckCircle2
								size={19}
								className='shrink-0 text-[#15803D]'
								aria-hidden='true'
							/>
						</div>

						{/* Currency */}
						<div className='flex items-center gap-3 p-4'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F6FB] text-[#4F46E5]'>
								<span className='text-sm font-bold'>৳</span>
							</div>

							<div className='min-w-0 flex-1'>
								<p className='text-sm font-medium text-[#202B49]'>
									Account Currency
								</p>

								<p className='mt-0.5 text-xs text-[#6B7280]'>
									Bangladeshi Taka
								</p>
							</div>

							<span className='text-sm font-semibold text-[#202B49]'>
								BDT
							</span>
						</div>

						{/* Initial Status */}
						<div className='flex items-center gap-3 p-4'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F4F6FB] text-[#4F46E5]'>
								<ShieldCheck
									size={20}
									aria-hidden='true'
								/>
							</div>

							<div className='min-w-0 flex-1'>
								<p className='text-sm font-medium text-[#202B49]'>
									Initial Status
								</p>

								<p className='mt-0.5 text-xs text-[#6B7280]'>
									Assigned automatically upon creation
								</p>
							</div>

							<span className='rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]'>
								ACTIVE
							</span>
						</div>
					</div>

					{/* Important Information */}
					<div className='mt-5 rounded-xl border border-[#E2E5F0] bg-[#F8F9FC] p-4'>
						<h3 className='text-sm font-semibold text-[#202B49]'>
							Before you continue
						</h3>

						<ul className='mt-3 space-y-2.5'>
							<li className='flex items-start gap-2.5 text-xs leading-5 text-[#6B7280]'>
								<CheckCircle2
									size={15}
									className='mt-0.5 shrink-0 text-[#15803D]'
									aria-hidden='true'
								/>

								<span>
									You can own multiple accounts under your
									existing profile.
								</span>
							</li>

							<li className='flex items-start gap-2.5 text-xs leading-5 text-[#6B7280]'>
								<CheckCircle2
									size={15}
									className='mt-0.5 shrink-0 text-[#15803D]'
									aria-hidden='true'
								/>

								<span>
									No additional account configuration or
									request details are required.
								</span>
							</li>

							<li className='flex items-start gap-2.5 text-xs leading-5 text-[#6B7280]'>
								<CheckCircle2
									size={15}
									className='mt-0.5 shrink-0 text-[#15803D]'
									aria-hidden='true'
								/>

								<span>
									Your account will use BDT currency and have
									ACTIVE status.
								</span>
							</li>
						</ul>
					</div>

					{/* Create Account Action */}
					<button
						type='button'
						onClick={handleOpenConfirmation}
						className='mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
					>
						Continue to Create Account
						<ArrowRight
							size={18}
							aria-hidden='true'
						/>
					</button>

					<p className='mt-3 text-center text-xs leading-5 text-[#9CA3AF]'>
						You will be asked to confirm before proceeding.
					</p>
				</div>
			</section>

			{/* Confirmation Dialog */}
			{isConfirmationOpen && (
				<AccountCreationConfirmation
					onCancel={handleCancelConfirmation}
					onConfirm={handleConfirmCreation}
					isLoading={creationStatus === 'LOADING'}
				/>
			)}
		</>
	)
}