'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	ArrowRight,
	Check,
	Eye,
	EyeOff,
	Landmark,
	ShieldCheck,
	AlertCircle,
	Mail,
	UserRound,
} from 'lucide-react'

const USERNAME_MAX_LENGTH = 15

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PASSWORD_RULES = [
	{
		id: 'length',
		label: 'At least 8 characters',
		test: (value) => value.length >= 8,
	},
	{
		id: 'lowercase',
		label: 'One lowercase letter',
		test: (value) => /[a-z]/.test(value),
	},
	{
		id: 'uppercase',
		label: 'One uppercase letter',
		test: (value) => /[A-Z]/.test(value),
	},
	{
		id: 'number',
		label: 'One number',
		test: (value) => /\d/.test(value),
	},
	{
		id: 'symbol',
		label: 'One special character',
		test: (value) => /[^A-Za-z0-9\s]/.test(value),
	},
	{
		id: 'spaces',
		label: 'No spaces',
		test: (value) => value.length > 0 && !/\s/.test(value),
	},
]

const FIELD_ORDER = ['username', 'email', 'password', 'confirmPassword']

const inputBaseClass =
	'h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-[#202B49] outline-none transition-colors placeholder:text-slate-400 focus-visible:ring-4'

const inputNormalClass =
	'border-[#E2E5F0] hover:border-slate-300 focus:border-indigo-500 focus-visible:ring-indigo-100'

const inputErrorClass =
	'border-red-400 focus:border-red-500 focus-visible:ring-red-100'

const labelClass = 'mb-2 block text-sm font-medium text-[#202B49]'

function validate(formData) {
	const errors = {}

	const username = formData.username.trim()
	const email = formData.email.trim()

	if (!username) {
		errors.username = 'Please enter a username.'
	} else if (username.length > USERNAME_MAX_LENGTH) {
		errors.username = `Username must be ${USERNAME_MAX_LENGTH} characters or fewer.`
	}

	if (!email) {
		errors.email = 'Please enter your email address.'
	} else if (!EMAIL_REGEX.test(email)) {
		errors.email = 'Enter a valid email address.'
	}

	if (!formData.password) {
		errors.password = 'Please create a password.'
	} else if (!PASSWORD_RULES.every((rule) => rule.test(formData.password))) {
		errors.password = 'Your password does not meet all requirements.'
	}

	if (!formData.confirmPassword) {
		errors.confirmPassword = 'Please confirm your password.'
	} else if (formData.password !== formData.confirmPassword) {
		errors.confirmPassword = 'Passwords do not match.'
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

function PasswordInput({
	id,
	label,
	value,
	onChange,
	onBlur,
	onFocus,
	error,
	autoComplete,
	placeholder,
	inputRef,
}) {
	const [visible, setVisible] = useState(false)

	return (
		<div>
			<label
				htmlFor={id}
				className={labelClass}
			>
				{label}
			</label>

			<div className='relative'>
				<input
					ref={inputRef}
					id={id}
					name={id}
					type={visible ? 'text' : 'password'}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					onFocus={onFocus}
					autoComplete={autoComplete}
					placeholder={placeholder}
					required
					aria-invalid={Boolean(error)}
					aria-describedby={error ? `${id}-error` : undefined}
					className={`${inputBaseClass} pr-12 ${
						error ? inputErrorClass : inputNormalClass
					}`}
				/>

				<button
					type='button'
					onClick={() => setVisible((previous) => !previous)}
					aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
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
				id={`${id}-error`}
				message={error}
			/>
		</div>
	)
}

export default function Signup() {
	const router = useRouter()

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [touched, setTouched] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const [passwordFocused, setPasswordFocused] = useState(false)
	const [serverMessage, setServerMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

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

		setServerMessage('')
	}

	const handleBlur = (event) => {
		const { name } = event.target

		setTouched((previous) => ({
			...previous,
			[name]: true,
		}))

		if (name === 'password') {
			setPasswordFocused(false)
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (isSubmitting) return

		setSubmitted(true)
		setServerMessage('')

		const validationErrors = validate(formData)

		const firstInvalidField = FIELD_ORDER.find(
			(field) => validationErrors[field],
		)

		if (firstInvalidField) {
			inputRefs.current[firstInvalidField]?.focus()
			return
		}

		setIsSubmitting(true)

		try {
			// UI-only placeholder: replace with the actual signup API request.
			await new Promise((resolve) => {
				setTimeout(resolve, 900)
			})

			router.push(
				`/verify-email?email=${encodeURIComponent(
					formData.email.trim(),
				)}`,
			)
		} catch {
			setServerMessage(
				'We could not complete your request. Please try again.',
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	const usernameLength = formData.username.trim().length

	const showPasswordChecklist =
		formData.password.length > 0 && (passwordFocused || submitted)

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

			<div className='relative w-full max-w-2xl'>
				{/* Signup card */}
				<section className='rounded-2xl border border-[#E2E5F0] bg-white p-5 shadow-xl shadow-slate-900/4 sm:p-8 md:p-9'>
					{/* Card top bar: security badge and app branding */}
					<div className='mb-6 flex items-center justify-between gap-3'>
						<div className='inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700'>
							<ShieldCheck
								size={14}
								aria-hidden='true'
							/>
							SECURE BANKING
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
							Create your account
						</h1>

						<p className='mt-2 max-w-md text-sm leading-6 text-slate-500'>
							Open your NexBank account and manage your finances
							with confidence.
						</p>
					</header>

					<form
						onSubmit={handleSubmit}
						noValidate
						className='space-y-5'
					>
						{/* Username and email */}
						<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
							<div>
								<div className='mb-2 flex items-center justify-between gap-2'>
									<label
										htmlFor='username'
										className='text-sm font-medium text-[#202B49]'
									>
										Username
									</label>

									<span
										aria-hidden='true'
										className={`text-xs tabular-nums ${
											usernameLength > USERNAME_MAX_LENGTH
												? 'text-red-600'
												: 'text-slate-400'
										}`}
									>
										{usernameLength}/{USERNAME_MAX_LENGTH}
									</span>
								</div>

								<div className='relative'>
									<UserRound
										size={17}
										className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
										aria-hidden='true'
									/>

									<input
										ref={(element) => {
											inputRefs.current.username = element
										}}
										id='username'
										name='username'
										type='text'
										value={formData.username}
										onChange={updateField}
										onBlur={handleBlur}
										autoComplete='username'
										placeholder='Choose a username'
										maxLength={50}
										required
										aria-invalid={Boolean(
											getError('username'),
										)}
										aria-describedby={
											getError('username')
												? 'username-error'
												: undefined
										}
										className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-[#202B49] outline-none transition-colors placeholder:text-slate-400 focus-visible:ring-4 ${
											getError('username')
												? inputErrorClass
												: inputNormalClass
										}`}
									/>
								</div>

								<FieldError
									id='username-error'
									message={getError('username')}
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className={labelClass}
								>
									Email address
								</label>

								<div className='relative'>
									<Mail
										size={17}
										className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400'
										aria-hidden='true'
									/>

									<input
										ref={(element) => {
											inputRefs.current.email = element
										}}
										id='email'
										name='email'
										type='email'
										value={formData.email}
										onChange={updateField}
										onBlur={handleBlur}
										autoComplete='email'
										placeholder='you@example.com'
										maxLength={254}
										required
										aria-invalid={Boolean(
											getError('email'),
										)}
										aria-describedby={
											getError('email')
												? 'email-error'
												: undefined
										}
										className={`h-11 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-[#202B49] outline-none transition-colors placeholder:text-slate-400 focus-visible:ring-4 ${
											getError('email')
												? inputErrorClass
												: inputNormalClass
										}`}
									/>
								</div>

								<FieldError
									id='email-error'
									message={getError('email')}
								/>
							</div>
						</div>

						{/* Password */}
						<PasswordInput
							id='password'
							label='Password'
							value={formData.password}
							onChange={updateField}
							onBlur={handleBlur}
							onFocus={() => setPasswordFocused(true)}
							error={getError('password')}
							autoComplete='new-password'
							placeholder='Create a strong password'
							inputRef={(element) => {
								inputRefs.current.password = element
							}}
						/>

						{/* Password requirements */}
						{showPasswordChecklist && (
							<div
								id='password-checklist'
								className='-mt-2 rounded-xl border border-[#E2E5F0] bg-[#F8FAFF] p-3.5'
							>
								<p className='mb-2.5 text-xs font-medium text-slate-600'>
									Password requirements
								</p>

								<ul className='grid grid-cols-1 gap-x-4 gap-y-2 min-[420px]:grid-cols-2'>
									{PASSWORD_RULES.map((rule) => {
										const passed = rule.test(
											formData.password,
										)

										return (
											<li
												key={rule.id}
												className={`flex items-center gap-2 text-xs ${
													passed
														? 'text-green-700'
														: 'text-slate-500'
												}`}
											>
												<span
													className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
														passed
															? 'bg-green-100'
															: 'bg-slate-200'
													}`}
												>
													{passed && (
														<Check
															size={11}
															strokeWidth={2.5}
															aria-hidden='true'
														/>
													)}
												</span>

												<span>{rule.label}</span>

												<span className='sr-only'>
													{passed
														? 'Requirement met'
														: 'Requirement not met'}
												</span>
											</li>
										)
									})}
								</ul>
							</div>
						)}

						{/* Confirm password */}
						<PasswordInput
							id='confirmPassword'
							label='Confirm password'
							value={formData.confirmPassword}
							onChange={updateField}
							onBlur={handleBlur}
							error={getError('confirmPassword')}
							autoComplete='new-password'
							placeholder='Re-enter your password'
							inputRef={(element) => {
								inputRefs.current.confirmPassword = element
							}}
						/>

						{/* Email verification notice */}
						<div className='flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5'>
							<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100'>
								<ShieldCheck
									size={19}
									aria-hidden='true'
								/>
							</div>

							<div>
								<p className='text-sm font-medium text-[#202B49]'>
									Email verification required
								</p>

								<p className='mt-1 text-xs leading-5 text-slate-600'>
									We will send a one-time verification code to
									your email address to help secure your
									account.
								</p>
							</div>
						</div>

						{/* Server feedback */}
						{serverMessage && (
							<div
								role='status'
								aria-live='polite'
								className='rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800'
							>
								{serverMessage}
							</div>
						)}

						{/* Submit */}
						<button
							type='submit'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
							className='group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-600/15 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60'
						>
							{isSubmitting
								? 'Preparing your account...'
								: 'Create account'}

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
						Already have an account?{' '}
						<Link
							href='/signin'
							className='font-semibold text-indigo-600 underline-offset-4 transition-colors hover:text-indigo-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
						>
							Sign in
						</Link>
					</p>
				</section>
			</div>
		</main>
	)
}