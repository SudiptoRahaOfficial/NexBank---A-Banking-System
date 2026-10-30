'use client'

import { useEffect, useRef } from 'react'
import { AlertTriangle, LoaderCircle, X } from 'lucide-react'

export default function SecurityConfirmationDialog({
	isOpen,
	title,
	description,
	confirmLabel = 'Confirm',
	onConfirm,
	onClose,
	isLoading = false,
}) {
	const dialogRef = useRef(null)
	const cancelButtonRef = useRef(null)
	const previousActiveElementRef = useRef(null)

	useEffect(() => {
		if (!isOpen) return

		previousActiveElementRef.current = document.activeElement

		const dialog = dialogRef.current

		cancelButtonRef.current?.focus()

		const handleKeyDown = (event) => {
			if (event.key === 'Escape' && !isLoading) {
				event.preventDefault()
				onClose?.()
			}

			if (event.key !== 'Tab' || !dialog) return

			const focusableElements = dialog.querySelectorAll(
				'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
			)

			const firstElement = focusableElements[0]
			const lastElement = focusableElements[focusableElements.length - 1]

			if (!firstElement || !lastElement) return

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

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			previousActiveElementRef.current?.focus()
		}
	}, [isOpen, isLoading, onClose])

	if (!isOpen) return null

	const handleBackdropClick = (event) => {
		if (event.target === event.currentTarget && !isLoading) {
			onClose?.()
		}
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/50 p-4 backdrop-blur-sm'
			onMouseDown={handleBackdropClick}
		>
			<div
				ref={dialogRef}
				role='alertdialog'
				aria-modal='true'
				aria-labelledby='security-dialog-title'
				aria-describedby='security-dialog-description'
				className='w-full max-w-md rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-xl sm:p-6'
			>
				<div className='flex items-start justify-between gap-4'>
					<div className='flex items-start gap-3'>
						<div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#DC2626]'>
							<AlertTriangle size={21} />
						</div>

						<div className='pt-0.5'>
							<h2
								id='security-dialog-title'
								className='text-lg font-semibold text-[#202B49]'
							>
								{title}
							</h2>

							<p
								id='security-dialog-description'
								className='mt-2 text-sm leading-6 text-[#6B7280]'
							>
								{description}
							</p>
						</div>
					</div>

					<button
						type='button'
						onClick={onClose}
						disabled={isLoading}
						aria-label='Close confirmation dialog'
						className='flex size-8 shrink-0 items-center justify-center rounded-lg text-[#6B7280] transition-colors hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50'
					>
						<X size={18} />
					</button>
				</div>

				<div className='mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					<button
						ref={cancelButtonRef}
						type='button'
						onClick={onClose}
						disabled={isLoading}
						className='inline-flex items-center justify-center rounded-lg border border-[#E2E5F0] bg-white px-4 py-2.5 text-sm font-medium text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
					>
						Cancel
					</button>

					<button
						type='button'
						onClick={onConfirm}
						disabled={isLoading}
						className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#DC2626] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B91C1C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
					>
						{isLoading && (
							<LoaderCircle
								size={16}
								className='animate-spin'
							/>
						)}

						{isLoading ? 'Processing...' : confirmLabel}
					</button>
				</div>
			</div>
		</div>
	)
}