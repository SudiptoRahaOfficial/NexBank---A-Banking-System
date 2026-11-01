'use client'

import { useEffect } from 'react'
import { Wallet, X, ShieldCheck } from 'lucide-react'

function formatCurrency(amount, currency) {
	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

const STATUS_STYLES = {
	ACTIVE: 'bg-[#DCFCE7] text-[#15803D]',
	INACTIVE: 'bg-[#F3F4F6] text-[#6B7280]',
}

function DetailItem({ label, value, mono = false }) {
	return (
		<div className='min-w-0 space-y-1.5'>
			<p className='text-xs font-medium text-[#6B7280]'>{label}</p>

			<p
				className={`break-all text-sm font-semibold text-[#202B49] ${
					mono ? 'font-mono' : ''
				}`}
			>
				{value || 'Unavailable'}
			</p>
		</div>
	)
}

export default function AccountDetailsModal({ account, balance, onClose }) {
	useEffect(() => {
		if (!account) return

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		const previousOverflow = document.body.style.overflow

		document.body.style.overflow = 'hidden'

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.body.style.overflow = previousOverflow
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [account, onClose])

	if (!account) return null

	const isValidBalance =
		typeof balance === 'number' && Number.isFinite(balance)

	const status = account.status?.toUpperCase() || 'UNKNOWN'

	const statusStyles = STATUS_STYLES[status] || 'bg-[#F3F4F6] text-[#6B7280]'

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/50 p-4 backdrop-blur-sm'
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					onClose()
				}
			}}
		>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby='account-details-title'
				className='relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#E2E5F0] bg-white shadow-2xl'
			>
				{/* Modal Header */}
				<div className='sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E5F0] bg-white px-5 py-4 sm:px-6'>
					<div className='flex items-center gap-3'>
						<div className='flex size-10 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
							<Wallet
								size={20}
								aria-hidden='true'
							/>
						</div>

						<div className='space-y-0.5'>
							<h2
								id='account-details-title'
								className='text-base font-semibold text-[#202B49]'
							>
								Account Details
							</h2>

							<p className='text-xs text-[#6B7280]'>
								View your account information
							</p>
						</div>
					</div>

					<button
						type='button'
						onClick={onClose}
						aria-label='Close account details'
						className='flex size-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						<X
							size={19}
							aria-hidden='true'
						/>
					</button>
				</div>

				<div className='space-y-6 p-5 sm:p-6'>
					{/* Account Overview */}
					<section className='relative overflow-hidden rounded-2xl bg-linear-to-br from-[#3730A3] to-[#4F46E5] p-5 text-white sm:p-6'>
						<div className='pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-white/10 blur-3xl' />

						<div className='relative space-y-4'>
							<div className='flex items-center justify-between gap-3'>
								<div className='flex items-center gap-2'>
									<Wallet
										size={18}
										aria-hidden='true'
									/>

									<span className='text-sm font-medium text-white/85'>
										Available Balance
									</span>
								</div>

								<span
									className={`rounded-full px-3 py-1 text-xs font-semibold ${
										status === 'ACTIVE'
											? 'bg-white/15 text-white'
											: 'bg-black/15 text-white'
									}`}
								>
									{status}
								</span>
							</div>

							<p className='text-2xl font-bold tracking-tight tabular-nums sm:text-3xl'>
								{isValidBalance
									? formatCurrency(balance, account.currency)
									: 'Unavailable'}
							</p>

							<div className='flex items-center gap-2 text-xs text-white/75'>
								<ShieldCheck
									size={15}
									aria-hidden='true'
								/>
								<span>{account.currency} Account</span>
							</div>
						</div>
					</section>

					{/* Account Information */}
					<section className='space-y-4'>
						<div>
							<h3 className='text-sm font-semibold text-[#202B49]'>
								Account Information
							</h3>

							<p className='mt-1 text-xs text-[#6B7280]'>
								Basic information about your bank account.
							</p>
						</div>

						<div className='grid grid-cols-1 gap-5 rounded-xl border border-[#E2E5F0] p-4 sm:grid-cols-2'>
							<DetailItem
								label='Account Type'
								value='Bank Account'
							/>

							<DetailItem
								label='Account Currency'
								value={account.currency}
							/>

							<DetailItem
								label='Account Status'
								value={status}
							/>

							<DetailItem
								label='Account ID'
								value={account._id}
								mono
							/>
						</div>
					</section>

					{/* Balance Information */}
					<section className='space-y-4'>
						<div>
							<h3 className='text-sm font-semibold text-[#202B49]'>
								Balance Information
							</h3>

							<p className='mt-1 text-xs text-[#6B7280]'>
								Current balance information for this account.
							</p>
						</div>

						<div className='rounded-xl border border-[#E2E5F0] p-4'>
							<div className='flex items-center justify-between gap-3'>
								<span className='text-sm text-[#6B7280]'>
									Current Balance
								</span>

								<span className='text-sm font-semibold text-[#202B49] tabular-nums'>
									{isValidBalance
										? formatCurrency(
												balance,
												account.currency,
											)
										: 'Unavailable'}
								</span>
							</div>

							<div className='my-3 border-t border-[#E2E5F0]' />

							<div className='flex items-center justify-between gap-3'>
								<span className='text-sm font-medium text-[#202B49]'>
									Available Balance
								</span>

								<span className='text-sm font-bold text-[#4F46E5] tabular-nums'>
									{isValidBalance
										? formatCurrency(
												balance,
												account.currency,
											)
										: 'Unavailable'}
								</span>
							</div>
						</div>
					</section>

					{/* Account Identifier */}
					<section className='rounded-xl bg-[#F8FAFC] p-4'>
						<p className='text-xs font-medium text-[#6B7280]'>
							Your Account Reference
						</p>

						<p className='mt-2 break-all font-mono text-sm font-semibold text-[#202B49]'>
							{account._id}
						</p>
					</section>
				</div>

				{/* Modal Footer */}
				<div className='flex justify-end border-t border-[#E2E5F0] px-5 py-4 sm:px-6'>
					<button
						type='button'
						onClick={onClose}
						className='rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	)
}