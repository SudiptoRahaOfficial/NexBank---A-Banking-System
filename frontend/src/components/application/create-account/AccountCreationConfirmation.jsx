'use client'

import { useEffect, useId, useRef } from 'react'
import { AlertCircle, ArrowRight, LoaderCircle, X } from 'lucide-react'

export default function AccountCreationConfirmation({
	onCancel,
	onConfirm,
	isLoading = false,
}) {
	const titleId = useId()
	const descriptionId = useId()

	const dialogRef = useRef(null)
	const cancelButtonRef = useRef(null)

	// Manage focus and restore it when the dialog closes.
	useEffect(() => {
		const previouslyFocusedElement = document.activeElement

		cancelButtonRef.current?.focus()

		return () => {
			previouslyFocusedElement?.focus?.()
		}
	}, [])

	// Handle keyboard interactions.
	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			event.preventDefault()

			if (!isLoading) {
				onCancel()
			}

			return
		}

		if (event.key === 'Tab') {
			const focusableElements = dialogRef.current?.querySelectorAll(
				'button:not(:disabled)',
			)

			if (!focusableElements?.length) {
				event.preventDefault()
				dialogRef.current?.focus()
				return
			}

			const firstElement = focusableElements[0]
			const lastElement = focusableElements[focusableElements.length - 1]

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault()
				lastElement.focus()
			} else if (
				!event.shiftKey &&
				document.activeElement === lastElement
			) {
				event.preventDefault()
				firstElement.focus()
			}
		}
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-[#202B49]/40 p-4 backdrop-blur-[2px]'
			onKeyDown={handleKeyDown}
		>
			<div
				ref={dialogRef}
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				aria-busy={isLoading}
				tabIndex={-1}
				className='relative w-full max-w-md rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-xl sm:p-7'
			>
				{/* Close Dialog */}
				<button
					type='button'
					onClick={onCancel}
					disabled={isLoading}
					aria-label='Close confirmation dialog'
					className='absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50'
				>
					<X
						size={19}
						aria-hidden='true'
					/>
				</button>

				{/* Dialog Icon */}
				<div className='mb-5 flex size-12 items-center justify-center rounded-xl bg-[#E9EFFF] text-[#4F46E5]'>
					<AlertCircle
						size={25}
						strokeWidth={1.8}
						aria-hidden='true'
					/>
				</div>

				{/* Dialog Content */}
				<div className='space-y-2'>
					<h2
						id={titleId}
						className='text-lg font-semibold text-[#202B49] sm:text-xl'
					>
						Confirm Account Creation
					</h2>

					<p
						id={descriptionId}
						className='text-sm leading-6 text-[#6B7280]'
					>
						Are you sure you want to create an additional NexBank
						account under your existing profile?
					</p>
				</div>

				{/* Account Information */}
				<div className='mt-5 space-y-3 rounded-xl border border-[#E2E5F0] bg-[#F8F9FC] p-4'>
					<div className='flex items-center justify-between gap-3'>
						<span className='text-sm text-[#6B7280]'>
							Account status
						</span>

						<span className='rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]'>
							ACTIVE
						</span>
					</div>

					<div className='flex items-center justify-between gap-3'>
						<span className='text-sm text-[#6B7280]'>
							Account currency
						</span>

						<span className='text-sm font-semibold text-[#202B49]'>
							BDT
						</span>
					</div>
				</div>

				{/* Informational Notice */}
				<p className='mt-4 text-xs leading-5 text-[#6B7280]'>
					This action will create an additional account. No account
					configuration or initial deposit is required.
				</p>

				{/* Dialog Actions */}
				<div className='mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					<button
						ref={cancelButtonRef}
						type='button'
						onClick={onCancel}
						disabled={isLoading}
						className='inline-flex min-h-11 items-center justify-center rounded-lg border border-[#E2E5F0] bg-white px-5 py-2.5 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
					>
						Cancel
					</button>

					<button
						type='button'
						onClick={onConfirm}
						disabled={isLoading}
						className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer'
					>
						{isLoading ? (
							<>
								<LoaderCircle
									size={17}
									className='animate-spin'
									aria-hidden='true'
								/>
								Creating Account...
							</>
						) : (
							<>
								Confirm
								<ArrowRight
									size={17}
									aria-hidden='true'
								/>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}