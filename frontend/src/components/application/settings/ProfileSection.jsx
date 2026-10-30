'use client'

import { useState } from 'react'
import {
	Check,
	CheckCircle2,
	Edit3,
	LoaderCircle,
	Mail,
	MapPin,
	Phone,
	UserRound,
	X,
} from 'lucide-react'

import { MOCK_SETTINGS_DATA } from './settings.data'
import ProfileImageUpload from './ProfileImageUpload'

const INITIAL_PROFILE = {
	...MOCK_SETTINGS_DATA.profile,
}

export default function ProfileSection() {
	const [profile, setProfile] = useState(INITIAL_PROFILE)
	const [formData, setFormData] = useState(INITIAL_PROFILE)
	const [isEditing, setIsEditing] = useState(false)
	const [profileImageFile, setProfileImageFile] = useState(null)
	const [errors, setErrors] = useState({})
	const [message, setMessage] = useState('')

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}))

		setErrors((previous) => ({
			...previous,
			[name]: '',
		}))

		setMessage('')
	}

	const validateForm = () => {
		const newErrors = {}

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required.'
		}

		if (
			formData.phone.trim() &&
			!/^\+?[0-9\s-]{7,20}$/.test(formData.phone)
		) {
			newErrors.phone = 'Enter a valid phone number.'
		}

		if (formData.bio.length > 300) {
			newErrors.bio = 'Bio must not exceed 300 characters.'
		}

		setErrors(newErrors)

		return Object.keys(newErrors).length === 0
	}

	const handleEdit = () => {
		setFormData({ ...profile })
		setProfileImageFile(null)
		setErrors({})
		setMessage('')
		setIsEditing(true)
	}

	const handleCancel = () => {
		setFormData({ ...profile })
		setProfileImageFile(null)
		setErrors({})
		setMessage('')
		setIsEditing(false)
	}

	const handleSave = (event) => {
		event.preventDefault()

		if (!validateForm()) return

		setProfile({
			...formData,
			profileImage: profileImageFile
				? URL.createObjectURL(profileImageFile)
				: formData.profileImage,
		})

		setIsEditing(false)
		setProfileImageFile(null)
		setMessage(
			'Profile changes have been applied locally. They will not persist after leaving this page.',
		)
	}

	const handleImageChange = (file) => {
		setProfileImageFile(file)
		setMessage('')
	}

	const inputClassName =
		'w-full rounded-lg border border-[#E2E5F0] bg-white px-3.5 py-2.5 text-sm text-[#202B49] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10 disabled:cursor-not-allowed disabled:bg-[#F4F6FB] disabled:text-[#6B7280]'

	const labelClassName = 'mb-2 block text-sm font-medium text-[#202B49]'

	const renderField = ({
		label,
		name,
		placeholder,
		type = 'text',
		icon: Icon,
		disabled = false,
	}) => (
		<div>
			<label
				htmlFor={name}
				className={labelClassName}
			>
				{label}
			</label>

			<div className='relative'>
				{Icon && (
					<Icon
						size={17}
						className='pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9CA3AF]'
					/>
				)}

				<input
					id={name}
					name={name}
					type={type}
					value={formData[name] ?? ''}
					onChange={handleChange}
					placeholder={placeholder}
					disabled={!isEditing || disabled}
					className={`${inputClassName} ${Icon ? 'pl-10' : ''}`}
					aria-invalid={Boolean(errors[name])}
					aria-describedby={
						errors[name] ? `${name}-error` : undefined
					}
				/>
			</div>

			{errors[name] && (
				<p
					id={`${name}-error`}
					role='alert'
					className='mt-1.5 text-xs text-[#DC2626]'
				>
					{errors[name]}
				</p>
			)}
		</div>
	)

	return (
		<section className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-sm'>
			<div className='flex flex-col gap-4 border-b border-[#E2E5F0] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7'>
				<div>
					<h2 className='text-lg font-semibold text-[#202B49]'>
						Profile Information
					</h2>

					<p className='mt-1 text-sm text-[#6B7280]'>
						Manage your personal information and profile details.
					</p>
				</div>

				{!isEditing && (
					<button
						type='button'
						onClick={handleEdit}
						className='inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-[#E2E5F0] bg-white px-4 py-2.5 text-sm font-medium text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
					>
						<Edit3 size={16} />
						Edit profile
					</button>
				)}
			</div>

			<form
				onSubmit={handleSave}
				noValidate
			>
				<div className='space-y-7 px-5 py-6 sm:px-7'>
					<ProfileImageUpload
						initialImage={profile.profileImage}
						onImageChange={handleImageChange}
					/>

					<div className='border-t border-[#E2E5F0]' />

					<div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
						{renderField({
							label: 'Full name',
							name: 'name',
							placeholder: 'Enter your full name',
							icon: UserRound,
						})}

						<div>
							<label
								htmlFor='email'
								className={labelClassName}
							>
								Email address
							</label>

							<div className='relative'>
								<Mail
									size={17}
									className='pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9CA3AF]'
								/>

								<input
									id='email'
									type='email'
									value={formData.email}
									disabled
									className={`${inputClassName} cursor-not-allowed pl-10`}
								/>
							</div>

							<div className='mt-2 flex items-center gap-1.5'>
								{formData.verified ? (
									<>
										<CheckCircle2
											size={14}
											className='text-[#15803D]'
										/>
										<span className='text-xs font-medium text-[#15803D]'>
											Verified email
										</span>
									</>
								) : (
									<span className='text-xs font-medium text-[#B45309]'>
										Email not verified
									</span>
								)}
							</div>
						</div>

						{renderField({
							label: 'Phone number',
							name: 'phone',
							placeholder: '+880 1XXX-XXXXXX',
							icon: Phone,
							type: 'tel',
						})}

						{renderField({
							label: 'Profession',
							name: 'profession',
							placeholder: 'e.g. Software Engineer',
						})}

						<div className='md:col-span-2'>
							{renderField({
								label: 'Location',
								name: 'location',
								placeholder: 'City, Country',
								icon: MapPin,
							})}
						</div>

						<div className='md:col-span-2'>
							<label
								htmlFor='bio'
								className={labelClassName}
							>
								About you
							</label>

							<textarea
								id='bio'
								name='bio'
								value={formData.bio ?? ''}
								onChange={handleChange}
								placeholder='Write a short introduction about yourself...'
								rows={4}
								maxLength={300}
								disabled={!isEditing}
								className={`${inputClassName} resize-y py-3`}
								aria-invalid={Boolean(errors.bio)}
								aria-describedby='bio-description'
							/>

							<div
								id='bio-description'
								className='mt-1.5 flex items-center justify-between gap-3'
							>
								{errors.bio ? (
									<p
										role='alert'
										className='text-xs text-[#DC2626]'
									>
										{errors.bio}
									</p>
								) : (
									<p className='text-xs text-[#6B7280]'>
										Keep your introduction short and clear.
									</p>
								)}

								<span className='shrink-0 text-xs text-[#9CA3AF]'>
									{formData.bio?.length ?? 0}/300
								</span>
							</div>
						</div>
					</div>

					{message && (
						<div
							role='status'
							className='rounded-lg border border-[#E2E5F0] bg-[#F4F6FB] px-4 py-3 text-sm text-[#6B7280]'
						>
							{message}
						</div>
					)}
				</div>

				{isEditing && (
					<div className='flex flex-col-reverse gap-3 border-t border-[#E2E5F0] bg-[#FAFBFE] px-5 py-4 sm:flex-row sm:justify-end sm:px-7'>
						<button
							type='button'
							onClick={handleCancel}
							className='inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E5F0] bg-white px-4 py-2.5 text-sm font-medium text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
						>
							<X size={16} />
							Cancel
						</button>

						<button
							type='submit'
							className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
						>
							<Check size={16} />
							Save changes
						</button>
					</div>
				)}
			</form>
		</section>
	)
}