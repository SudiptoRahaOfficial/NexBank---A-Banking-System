'use client'

import { useEffect, useRef } from 'react'
import {
	ArrowDownLeft,
	ArrowUpRight,
	CalendarClock,
	Fingerprint,
	X,
} from 'lucide-react'

const STATUS_STYLES = {
	COMPLETED: 'bg-[#ECFDF5] text-[#15803D]',
	PENDING: 'bg-[#FFFBEB] text-[#B45309]',
	FAILED: 'bg-[#FEF2F2] text-[#DC2626]',
	REVERSED: 'bg-[#F3F4F6] text-[#4B5563]',
}

function formatDate(dateValue) {
	const date = new Date(dateValue)

	if (Number.isNaN(date.getTime())) {
		return 'Unavailable'
	}

	return new Intl.DateTimeFormat('en-BD', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	}).format(date)
}

function formatAmount(amount) {
	return new Intl.NumberFormat('en-BD', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount)
}

function DetailItem({ label, value, breakAll = false }) {
	return (
		<div className='min-w-0 space-y-1'>
			<dt className='text-xs font-medium text-[#6B7280]'>{label}</dt>

			<dd
				className={`text-sm font-medium text-[#202B49] ${
					breakAll ? 'break-all' : 'wrap-break-word'
				}`}
			>
				{value || 'Unavailable'}
			</dd>
		</div>
	)
}

function AccountCard({ title, account }) {
	return (
		<div className='min-w-0 rounded-xl border border-[#E2E5F0] bg-[#FAFBFF] p-4'>
			<h3 className='mb-4 text-sm font-semibold text-[#202B49]'>
				{title}
			</h3>

			<dl className='space-y-4'>
				<DetailItem
					label='Account Owner'
					value={account.ownerName}
				/>

				<DetailItem
					label='Account ID'
					value={account.id}
					breakAll
				/>

				<DetailItem
					label='Currency'
					value={account.currency}
				/>
			</dl>
		</div>
	)
}

export default function TransactionDetailsDialog({
	isOpen,
	transactionDetails,
	onDialogClose,
}) {
	const dialogRef = useRef(null)

	useEffect(() => {
		const dialog = dialogRef.current

		if (!dialog) return

		if (isOpen && transactionDetails && !dialog.open) {
			dialog.showModal()
		} else if (!isOpen && dialog.open) {
			dialog.close()
		}
	}, [isOpen, transactionDetails])

	if (!isOpen || !transactionDetails) {
		return null
	}

	const {
		id,
		amount,
		status,
		direction,
		fromAccount,
		toAccount,
		createdAt,
		updatedAt,
		idempotencyKey,
	} = transactionDetails

	const isSent = direction === 'SENT'
	const DirectionIcon = isSent ? ArrowUpRight : ArrowDownLeft

	const statusStyle = STATUS_STYLES[status] ?? 'bg-[#F3F4F6] text-[#4B5563]'

	return (
		<dialog
			ref={dialogRef}
			onClose={onDialogClose}
			aria-labelledby='transaction-dialog-title'
			className='m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-white p-0 text-left shadow-2xl backdrop:bg-[#111827]/50 backdrop:backdrop-blur-sm'
		>
			<div className='sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E5F0] bg-white px-5 py-4 sm:px-6'>
				<div>
					<h2
						id='transaction-dialog-title'
						className='text-lg font-semibold text-[#202B49]'
					>
						Transaction Details
					</h2>

					<p className='mt-1 text-xs text-[#6B7280]'>
						Review the complete transaction information
					</p>
				</div>

				<button
					type='button'
					onClick={() => dialogRef.current?.close()}
					aria-label='Close transaction details'
					className='inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
				>
					<X
						size={19}
						aria-hidden='true'
					/>
				</button>
			</div>

			<div className='space-y-6 p-5 sm:p-6'>
				{/* Transaction Summary */}
				<div className='rounded-xl border border-[#E2E5F0] p-4 sm:p-5'>
					<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
						<div className='flex min-w-0 items-center gap-3'>
							<div
								className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
									isSent ? 'bg-[#FEF2F2]' : 'bg-[#ECFDF5]'
								}`}
								aria-hidden='true'
							>
								<DirectionIcon
									size={21}
									className={
										isSent
											? 'text-[#DC2626]'
											: 'text-[#15803D]'
									}
								/>
							</div>

							<div className='min-w-0'>
								<p className='text-sm font-semibold text-[#202B49]'>
									{isSent ? 'Money Sent' : 'Money Received'}
								</p>

								<p className='mt-1 text-xs text-[#6B7280]'>
									{direction}
								</p>
							</div>
						</div>

						<span
							className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyle}`}
						>
							{status}
						</span>
					</div>

					<div className='mt-6 border-t border-[#E2E5F0] pt-5'>
						<p className='text-xs font-medium text-[#6B7280]'>
							Transaction Amount
						</p>

						<p className='mt-2 text-2xl font-semibold tracking-tight text-[#202B49] tabular-nums sm:text-3xl'>
							{formatAmount(amount)}
						</p>
					</div>
				</div>

				{/* Account Information */}
				<section aria-labelledby='transaction-accounts-heading'>
					<h3
						id='transaction-accounts-heading'
						className='mb-3 text-sm font-semibold text-[#202B49]'
					>
						Account Information
					</h3>

					<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
						<AccountCard
							title='From Account'
							account={fromAccount}
						/>

						<AccountCard
							title='To Account'
							account={toAccount}
						/>
					</div>
				</section>

				{/* Transaction Information */}
				<section aria-labelledby='transaction-information-heading'>
					<h3
						id='transaction-information-heading'
						className='mb-3 text-sm font-semibold text-[#202B49]'
					>
						Transaction Information
					</h3>

					<div className='rounded-xl border border-[#E2E5F0] p-4'>
						<dl className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
							<DetailItem
								label='Transaction ID'
								value={id}
								breakAll
							/>

							<DetailItem
								label='Direction'
								value={direction}
							/>

							<div className='flex items-start gap-2'>
								<CalendarClock
									size={16}
									className='mt-0.5 shrink-0 text-[#9CA3AF]'
									aria-hidden='true'
								/>

								<div className='min-w-0'>
									<DetailItem
										label='Created At'
										value={formatDate(createdAt)}
									/>
								</div>
							</div>

							<div className='flex items-start gap-2'>
								<CalendarClock
									size={16}
									className='mt-0.5 shrink-0 text-[#9CA3AF]'
									aria-hidden='true'
								/>

								<div className='min-w-0'>
									<DetailItem
										label='Last Updated'
										value={formatDate(updatedAt)}
									/>
								</div>
							</div>
						</dl>
					</div>
				</section>

				{/* Optional Idempotency Key */}
				{idempotencyKey && (
					<section aria-labelledby='transaction-security-heading'>
						<h3
							id='transaction-security-heading'
							className='mb-3 text-sm font-semibold text-[#202B49]'
						>
							Transaction Reference
						</h3>

						<div className='flex min-w-0 items-start gap-3 rounded-xl border border-[#E2E5F0] bg-[#FAFBFF] p-4'>
							<Fingerprint
								size={19}
								className='mt-0.5 shrink-0 text-[#6366F1]'
								aria-hidden='true'
							/>

							<div className='min-w-0'>
								<p className='text-xs font-medium text-[#6B7280]'>
									Idempotency Key
								</p>

								<p className='mt-1 break-all text-sm font-medium text-[#202B49]'>
									{idempotencyKey}
								</p>
							</div>
						</div>
					</section>
				)}
			</div>
		</dialog>
	)
}