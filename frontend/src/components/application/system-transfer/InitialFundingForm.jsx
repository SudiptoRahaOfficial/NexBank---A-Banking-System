'use client'

import { useState } from 'react'
import { ArrowRight, Banknote, LoaderCircle } from 'lucide-react'

import ReceiverAccountField from './ReceiverAccountField'
import FundingSummary from './FundingSummary'
import FundingConfirmation from './FundingConfirmation'
import FundingStatus from './FundingStatus'

import {
	MINIMUM_FUNDING_AMOUNT,
	MOCK_FUNDING_RESPONSES,
	FUNDING_STATUS,
} from './system-funding.data'

import {
	formatFundingAmount,
	validateFundingAmount,
	validateReceiverAccountId,
} from './system-funding.utils'

const INITIAL_FORM_STATE = {
	receiverAccountId: '',
	amount: '',
}

export default function InitialFundingForm() {
	const [formData, setFormData] = useState(INITIAL_FORM_STATE)
	const [errors, setErrors] = useState({})
	const [showConfirmation, setShowConfirmation] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [deposit, setDeposit] = useState(null)

	const handleReceiverAccountChange = (value) => {
		setFormData((previous) => ({
			...previous,
			receiverAccountId: value,
		}))

		setErrors((previous) => ({
			...previous,
			receiverAccountId: '',
		}))
	}

	const handleAmountChange = (event) => {
		const value = event.target.value

		if (value !== '' && !/^\d*$/.test(value)) {
			return
		}

		setFormData((previous) => ({
			...previous,
			amount: value,
		}))

		setErrors((previous) => ({
			...previous,
			amount: '',
		}))
	}

	const validateForm = () => {
		const nextErrors = {
			receiverAccountId: validateReceiverAccountId(
				formData.receiverAccountId,
			),
			amount: validateFundingAmount(formData.amount),
		}

		setErrors(nextErrors)

		return !Object.values(nextErrors).some(Boolean)
	}

	const handleReviewDeposit = (event) => {
		event.preventDefault()

		if (!validateForm()) {
			return
		}

		setShowConfirmation(true)
	}

	const handleCancelConfirmation = () => {
		if (isSubmitting) return

		setShowConfirmation(false)
	}

	const handleConfirmDeposit = async () => {
		if (isSubmitting) return

		setIsSubmitting(true)
		setShowConfirmation(false)
		setDeposit(null)

		try {
			// Mock-only simulation.
			// Replace this block with the API integration later.
			await new Promise((resolve) => setTimeout(resolve, 1200))

			const mockResponse = MOCK_FUNDING_RESPONSES.COMPLETED

			const simulatedDeposit = {
				...mockResponse.deposit,
				receiverAccount: formData.receiverAccountId.trim(),
				amount: Number(formData.amount),
				idempotencyKey: `mock-${Date.now()}`,
			}

			setDeposit(simulatedDeposit)
		} catch {
			setDeposit({
				status: FUNDING_STATUS.FAILED,
				receiverAccount: formData.receiverAccountId.trim(),
				amount: Number(formData.amount),
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleResetForm = () => {
		if (isSubmitting) return

		setFormData(INITIAL_FORM_STATE)
		setErrors({})
		setDeposit(null)
		setShowConfirmation(false)
	}

	const isFormDisabled = isSubmitting || Boolean(deposit)

	return (
		<section className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-sm sm:p-7'>
			<div className='mb-6 space-y-1'>
				<h2 className='text-lg font-semibold text-[#202B49]'>
					Deposit details
				</h2>

				<p className='text-sm text-[#6B7280]'>
					Enter the receiver account and the amount you want to
					deposit.
				</p>
			</div>

			<form
				onSubmit={handleReviewDeposit}
				noValidate
			>
				<div className='space-y-6'>
					<ReceiverAccountField
						value={formData.receiverAccountId}
						onChange={handleReceiverAccountChange}
						error={errors.receiverAccountId}
						disabled={isFormDisabled}
					/>

					<div className='space-y-2'>
						<label
							htmlFor='funding-amount'
							className='block text-sm font-medium text-[#202B49]'
						>
							Deposit amount
							<span
								className='ml-1 text-[#DC2626]'
								aria-hidden='true'
							>
								*
							</span>
						</label>

						<div className='relative'>
							<Banknote
								size={18}
								className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]'
								aria-hidden='true'
							/>

							<input
								id='funding-amount'
								name='amount'
								type='text'
								inputMode='numeric'
								value={formData.amount}
								onChange={handleAmountChange}
								placeholder='Enter deposit amount'
								disabled={isFormDisabled}
								aria-invalid={Boolean(errors.amount)}
								aria-describedby={
									errors.amount
										? 'funding-amount-error'
										: 'funding-amount-help'
								}
								className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-[#202B49] outline-none transition-colors placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] ${
									errors.amount
										? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/10'
										: 'border-[#E2E5F0] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10'
								}`}
							/>
						</div>

						{errors.amount ? (
							<p
								id='funding-amount-error'
								className='text-xs text-[#DC2626]'
								role='alert'
							>
								{errors.amount}
							</p>
						) : (
							<p
								id='funding-amount-help'
								className='text-xs text-[#6B7280]'
							>
								Minimum deposit:{' '}
								{formatFundingAmount(MINIMUM_FUNDING_AMOUNT)}
							</p>
						)}
					</div>

					<FundingSummary
						receiverAccountId={formData.receiverAccountId}
						amount={formData.amount}
					/>

					{!deposit && (
						<button
							type='submit'
							disabled={isSubmitting}
							className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
						>
							Review deposit
							<ArrowRight
								size={17}
								aria-hidden='true'
							/>
						</button>
					)}
				</div>
			</form>

			{isSubmitting && (
				<div
					role='status'
					className='mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#EEF2FF] p-4 text-sm font-medium text-[#4F46E5]'
				>
					<LoaderCircle
						size={18}
						className='animate-spin'
						aria-hidden='true'
					/>
					Processing simulated deposit...
				</div>
			)}

			{deposit && (
				<div className='mt-6 space-y-4'>
					<FundingStatus deposit={deposit} />

					<button
						type='button'
						onClick={handleResetForm}
						className='w-full rounded-xl border border-[#E2E5F0] bg-white px-5 py-3 text-sm font-semibold text-[#4B5563] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
					>
						Start another funding operation
					</button>
				</div>
			)}

			{showConfirmation && (
				<div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#111827]/50 p-4'>
					<FundingConfirmation
						receiverAccountId={formData.receiverAccountId.trim()}
						amount={formData.amount}
						onConfirm={handleConfirmDeposit}
						onCancel={handleCancelConfirmation}
						isSubmitting={isSubmitting}
					/>
				</div>
			)}
		</section>
	)
}