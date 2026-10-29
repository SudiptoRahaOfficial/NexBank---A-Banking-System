'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import {
	ArrowRight,
	Eye,
	EyeOff,
	Landmark,
	ShieldCheck,
	AlertCircle,
	UserRound,
} from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBaseClass =
	'h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-[#202B49] outline-none transition-colors placeholder:text-slate-400 focus-visible:ring-4'

const inputNormalClass =
	'border-[#E2E5F0] hover:border-slate-300 focus:border-indigo-500 focus-visible:ring-indigo-100'

const inputErrorClass =
	'border-red-400 focus:border-red-500 focus-visible:ring-red-100'

const labelClass = 'mb-2 block text-sm font-medium text-[#202B49]'

function validate(formData) {
	const errors = {}
	const identifier = formData.identifier.trim()

	if (!identifier) {
		errors.identifier = 'Enter your username or email address.'
	} else if (identifier.includes('@') && !EMAIL_REGEX.test(identifier)) {
		errors.identifier = 'Enter a valid email address.'
	}

	if (!formData.password) {
		errors.password = 'Please enter your password.'
	}

	return errors
}

function FieldError({ id, message }) {
	if (!message) return null

	return (
		<p
			id={id}
			role='alert'
			className='mt-1.5 flex items-start gap-1.5 text-xs leading-5 text-red-600'
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

function PasswordInput({ value, onChange, onBlur, error, inputRef }) {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			<label
				htmlFor='password'
				className={labelClass}
			>
				Password
			</label>

			<div className='relative'>
				<input
					ref={inputRef}
					id='password'
					name='password'
					type={visible ? 'text' : 'password'}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					autoComplete='current-password'
					placeholder='Enter your password'
					required
					aria-invalid={Boolean(error)}
					aria-describedby={error ? 'password-error' : undefined}
					className={`${inputBaseClass} pr-12 ${
						error ? inputErrorClass : inputNormalClass
					}`}
				/>

				<button
					type='button'
					onClick={() => setVisible((previous) => !previous)}
					aria-label={`${visible ? 'Hide' : 'Show'} password`}
					aria-pressed={visible}
					className='absolute inset-y-0 right-0 inline-flex w-11 cursor-pointer items-center justify-center rounded-r-xl text-slate-500 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500'
				>
					{visible ? (
						<EyeOff
							size={18}
							aria-hidden='true'
						/>
					) : (
						<Eye
							size={18}
							aria-hidden='true'
						/>
					)}
				</button>
			</div>

			<FieldError
				id='password-error'
				message={error}
			/>
		</div>
	)
}

export default function Signin() {
	const [formData, setFormData] = useState({
		identifier: '',
		password: '',
	})

	const [touched, setTouched] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [feedback, setFeedback] = useState('')

	const inputRefs = useRef({})

	const errors = validate(formData)

	const getError = (field) => {
		if (!submitted && !touched[field]) return ''
		return errors[field] || ''
	}

	const updateField = (event) => {
		const { name, value } = event.target

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}))

		setFeedback('')
	}

	const handleBlur = (event) => {
		const { name } = event.target

		setTouched((previous) => ({
			...previous,
			[name]: true,
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (isSubmitting) return

		setSubmitted(true)
		setFeedback('')

		const validationErrors = validate(formData)

		const firstInvalidField = ['identifier', 'password'].find(
			(field) => validationErrors[field],
		)

		if (firstInvalidField) {
			inputRefs.current[firstInvalidField]?.focus()
			return
		}

		// UI-only placeholder. Replace with the actual sign-in API request.
		setIsSubmitting(true)

		try {
			await new Promise((resolve) => {
				setTimeout(resolve, 900)
			})

			setFeedback(
				'The sign-in UI is ready. Connect the authentication API to sign in.',
			)
		} catch {
			setFeedback('We could not complete your request. Please try again.')
		} finally {
			setIsSubmitting(false)
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
				{/* Sign-in card */}
				<section className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-xl shadow-slate-900/4 sm:p-8'>
					{/* Card top bar: security badge and app branding */}
					<div className='mb-6 flex items-center justify-between gap-3'>
						<div className='inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700'>
							<ShieldCheck
								size={14}
								aria-hidden='true'
							/>
							SECURE SIGN IN
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
							Welcome back
						</h1>

						<p className='mt-2 text-sm leading-6 text-slate-500'>
							Sign in to access your accounts and manage your
							finances securely.
						</p>
					</header>

					<form
						onSubmit={handleSubmit}
						noValidate
						className='space-y-5'
					>
						{/* Username or email */}
						<div>
							<label
								htmlFor='identifier'
								className={labelClass}
							>
								Username or email address
							</label>

							<div className='relative'>
								<UserRound
									size={17}
									className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
									aria-hidden='true'
								/>

								<input
									ref={(element) => {
										inputRefs.current.identifier = element
									}}
									id='identifier'
									name='identifier'
									type='text'
									value={formData.identifier}
									onChange={updateField}
									onBlur={handleBlur}
									autoComplete='username'
									placeholder='Enter username or email'
									maxLength={254}
									required
									aria-invalid={Boolean(
										getError('identifier'),
									)}
									aria-describedby={
										getError('identifier')
											? 'identifier-error'
											: undefined
									}
									className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-[#202B49] outline-none transition-colors placeholder:text-slate-400 focus-visible:ring-4 ${
										getError('identifier')
											? inputErrorClass
											: inputNormalClass
									}`}
								/>
							</div>

							<FieldError
								id='identifier-error'
								message={getError('identifier')}
							/>
						</div>

						{/* Password */}
						<PasswordInput
							value={formData.password}
							onChange={updateField}
							onBlur={handleBlur}
							error={getError('password')}
							inputRef={(element) => {
								inputRefs.current.password = element
							}}
						/>

						{/* Feedback */}
						{feedback && (
							<div
								role='status'
								aria-live='polite'
								className='rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800'
							>
								{feedback}
							</div>
						)}

						{/* Submit */}
						<button
							type='submit'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
							className='group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-600/15 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60'
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}

							{!isSubmitting && (
								<ArrowRight
									size={17}
									className='transition-transform group-hover:translate-x-0.5'
									aria-hidden='true'
								/>
							)}
						</button>
					</form>

					<div className='my-6 border-t border-[#E2E5F0]' />

					<p className='text-center text-sm text-slate-600'>
						New to NexBank?{' '}
						<Link
							href='/signup'
							className='font-semibold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
						>
							Create an account
						</Link>
					</p>
				</section>
			</div>
		</main>
	)
}