'use client'

import Link from 'next/link'
import { Suspense, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
	ArrowLeft,
	ArrowRight,
	Clock3,
	Landmark,
	RefreshCw,
	ShieldCheck,
	AlertCircle,
} from 'lucide-react'

const OTP_LENGTH = 6

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function FieldError({ message }) {
	if (!message) return null

	return (
		<p
			role='alert'
			className='mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-600'
		>
			<AlertCircle
				size={14}
				className='mt-0.5 shrink-0'
				aria-hidden='true'
			/>
			{message}
		</p>
	)
}

function VerifyEmailContent() {
	const searchParams = useSearchParams()
	const emailFromUrl = searchParams.get('email') || ''

	const [email] = useState(emailFromUrl)
	const [otp, setOtp] = useState('')
	const [emailTouched, setEmailTouched] = useState(false)
	const [otpTouched, setOtpTouched] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [isVerifying, setIsVerifying] = useState(false)
	const [isResending, setIsResending] = useState(false)
	const [feedback, setFeedback] = useState(null)

	const emailRef = useRef(null)
	const otpRef = useRef(null)

	const normalizedEmail = email.trim()

	const emailError =
		(emailTouched || submitted) &&
		(!normalizedEmail
			? 'Please enter your email address.'
			: !EMAIL_REGEX.test(normalizedEmail)
				? 'Enter a valid email address.'
				: '')

	const otpError =
		(otpTouched || submitted) &&
		!new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp)
			? `Enter the complete ${OTP_LENGTH}-digit verification code.`
			: ''

	const updateOtp = (event) => {
		const numericValue = event.target.value
			.replace(/\D/g, '')
			.slice(0, OTP_LENGTH)

		setOtp(numericValue)
		setFeedback(null)
	}

	const handleVerify = async (event) => {
		event.preventDefault()

		if (isVerifying || isResending) return

		setSubmitted(true)
		setFeedback(null)

		const validEmail = EMAIL_REGEX.test(normalizedEmail)
		const validOtp = new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp)

		if (!validEmail) {
			emailRef.current?.focus()
			return
		}

		if (!validOtp) {
			otpRef.current?.focus()
			return
		}

		// UI-only placeholder. Replace with the actual OTP verification request.
		setIsVerifying(true)

		try {
			await new Promise((resolve) => {
				setTimeout(resolve, 900)
			})

			setFeedback({
				type: 'info',
				message:
					'The verification UI is ready. Connect the email verification API to verify your account.',
			})
		} catch {
			setFeedback({
				type: 'error',
				message: 'We could not verify your email. Please try again.',
			})
		} finally {
			setIsVerifying(false)
		}
	}

	const handleResend = async () => {
		if (isVerifying || isResending) return

		setEmailTouched(true)
		setFeedback(null)

		if (!EMAIL_REGEX.test(normalizedEmail)) {
			emailRef.current?.focus()
			return
		}

		// UI-only placeholder. Replace with the actual resend-code request.
		setIsResending(true)

		try {
			await new Promise((resolve) => {
				setTimeout(resolve, 900)
			})

			setFeedback({
				type: 'info',
				message:
					'The resend UI is ready. Connect the resend verification API to request a new code.',
			})
		} catch {
			setFeedback({
				type: 'error',
				message:
					'We could not resend the verification code. Please try again.',
			})
		} finally {
			setIsResending(false)
		}
	}

	return (
		<main className='relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#F4F6FB] px-4 py-8 text-[#202B49] sm:px-6 sm:py-10'>
			{/* Background decoration */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 overflow-hidden'
			>
				<div className='absolute -left-28 -top-32 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl' />
				<div className='absolute -right-28 top-1/3 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl' />
				<div className='absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-100/40 blur-3xl' />
			</div>

			<div className='relative w-full max-w-xl'>
				{/* Verification card */}
				<section className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-xl shadow-slate-900/4 sm:p-8'>
					{/* Card top bar: security badge and app branding */}
					<div className='mb-6 flex items-center justify-between gap-3'>
						<div className='inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700'>
							<ShieldCheck
								size={14}
								aria-hidden='true'
							/>
							EMAIL VERIFICATION
						</div>

						<Link
							href='/'
							aria-label='NexBank home'
							className='group inline-flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
						>
							<span className='flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/15 transition-colors group-hover:bg-indigo-700'>
								<Landmark
									size={19}
									strokeWidth={2}
									aria-hidden='true'
								/>
							</span>

							<span className='text-lg font-bold tracking-tight text-[#202B49] sm:text-xl'>
								Nex<span className='text-indigo-600'>Bank</span>
							</span>
						</Link>
					</div>

					{/* Card heading */}
					<header className='mb-7'>
						<h1 className='text-2xl font-semibold tracking-tight text-[#202B49] sm:text-3xl'>
							Verify your email
						</h1>

						<p className='mt-2 text-sm leading-6 text-slate-500'>
							Enter the six-digit verification code sent to your
							email address to continue setting up your NexBank
							account.
						</p>
					</header>

					<form
						onSubmit={handleVerify}
						noValidate
						className='space-y-5'
					>
						{/* Email address */}
						<div>
							<label
								htmlFor='email'
								className='mb-2 block text-sm font-medium text-[#202B49]'
							>
								Email address
							</label>

							<input
								ref={emailRef}
								id='email'
								name='email'
								type='email'
								value={email}
								readOnly
								disabled
								autoComplete='email'
								placeholder='you@example.com'
								maxLength={254}
								required
								aria-invalid={Boolean(emailError)}
								aria-describedby={
									emailError ? 'email-error' : undefined
								}
								className={`h-11 w-full rounded-xl border bg-slate-50 px-3.5 text-center text-sm text-[#202B49] outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-100 ${
									emailError
										? 'border-red-400'
										: 'border-[#E2E5F0]'
								}`}
							/>

							<FieldError message={emailError} />
						</div>

						{/* OTP */}
						<div>
							<label
								htmlFor='otp'
								className='mb-2 block text-sm font-medium text-[#202B49]'
							>
								Verification code
							</label>

							<input
								ref={otpRef}
								id='otp'
								name='otp'
								type='text'
								inputMode='numeric'
								autoComplete='one-time-code'
								pattern='[0-9]{6}'
								maxLength={OTP_LENGTH}
								value={otp}
								onChange={updateOtp}
								onBlur={() => setOtpTouched(true)}
								placeholder='000000'
								required
								aria-invalid={Boolean(otpError)}
								aria-describedby={
									otpError ? 'otp-error' : 'otp-description'
								}
								className={`h-14 w-full rounded-xl border bg-white px-4 text-center font-mono text-2xl font-semibold tracking-[0.45em] text-[#202B49] outline-none transition-colors placeholder:text-slate-300 placeholder:opacity-100 focus-visible:ring-4 ${
									otpError
										? 'border-red-400 focus:border-red-500 focus-visible:ring-red-100'
										: 'border-[#E2E5F0] hover:border-slate-300 focus:border-indigo-500 focus-visible:ring-indigo-100'
								}`}
							/>

							{otpError ? (
								<div id='otp-error'>
									<FieldError message={otpError} />
								</div>
							) : (
								<p
									id='otp-description'
									className='mt-2 text-xs leading-5 text-slate-500'
								>
									Enter all six digits. Numbers only.
								</p>
							)}
						</div>

						{/* Verification information */}
						<div className='flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5'>
							<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100'>
								<Clock3
									size={18}
									aria-hidden='true'
								/>
							</div>

							<div>
								<p className='text-sm font-medium text-[#202B49]'>
									Check your inbox
								</p>

								<p className='mt-1 text-xs leading-5 text-slate-600'>
									If the message is not in your inbox, check
									your spam or junk folder.
								</p>
							</div>
						</div>

						{/* Feedback */}
						{feedback && (
							<div
								role={
									feedback.type === 'error'
										? 'alert'
										: 'status'
								}
								aria-live='polite'
								className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-5 ${
									feedback.type === 'error'
										? 'border-red-200 bg-red-50 text-red-700'
										: 'border-amber-200 bg-amber-50 text-amber-800'
								}`}
							>
								<AlertCircle
									size={17}
									className='mt-0.5 shrink-0'
									aria-hidden='true'
								/>
								<p>{feedback.message}</p>
							</div>
						)}

						{/* Verify button */}
						<button
							type='submit'
							disabled={isVerifying || isResending}
							aria-busy={isVerifying}
							className='group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-600/15 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60'
						>
							{isVerifying
								? 'Verifying email...'
								: 'Verify email'}

							{!isVerifying && (
								<ArrowRight
									size={17}
									className='transition-transform group-hover:translate-x-0.5'
									aria-hidden='true'
								/>
							)}
						</button>

						{/* Divider immediately after verify button */}
						<div className='border-t border-[#E2E5F0]' />
					</form>

					{/* Resend and back to signup */}
					<div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
						<div className='flex min-w-0 flex-wrap items-center gap-1'>
							<p className='text-sm text-slate-500'>
								Didn't receive the code?
							</p>

							<button
								type='button'
								onClick={handleResend}
								disabled={isVerifying || isResending}
								className='inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
							>
								<RefreshCw
									size={15}
									className={
										isResending ? 'animate-spin' : ''
									}
									aria-hidden='true'
								/>

								{isResending
									? 'Requesting code...'
									: 'Resend code'}
							</button>
						</div>

						<Link
							href='/signup'
							className='inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#202B49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
						>
							<ArrowLeft
								size={15}
								aria-hidden='true'
							/>
							Back to signup
						</Link>
					</div>
				</section>
			</div>
		</main>
	)
}

function VerifyEmailFallback() {
	return (
		<main className='flex min-h-dvh items-center justify-center bg-[#F4F6FB] px-4'>
			<div
				role='status'
				aria-label='Loading email verification'
				className='flex items-center gap-3 rounded-xl border border-[#E2E5F0] bg-white px-5 py-4 text-sm text-slate-600 shadow-sm'
			>
				<span
					aria-hidden='true'
					className='h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600'
				/>
				Loading email verification...
			</div>
		</main>
	)
}

export default function VerifyEmail() {
	return (
		<Suspense fallback={<VerifyEmailFallback />}>
			<VerifyEmailContent />
		</Suspense>
	)
}