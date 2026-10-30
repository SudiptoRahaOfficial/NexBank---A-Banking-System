'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, ImagePlus, Trash2, UserRound } from 'lucide-react'

const MAX_FILE_SIZE = 3 * 1024 * 1024

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ProfileImageUpload({
	initialImage = null,
	onImageChange,
}) {
	const fileInputRef = useRef(null)

	const [preview, setPreview] = useState(initialImage)
	const [error, setError] = useState('')

	useEffect(() => {
		setPreview(initialImage)
	}, [initialImage])

	useEffect(() => {
		return () => {
			if (preview?.startsWith('blob:')) {
				URL.revokeObjectURL(preview)
			}
		}
	}, [preview])

	const handleImageSelect = (event) => {
		const file = event.target.files?.[0]

		if (!file) return

		setError('')

		if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
			setError('Please select a JPG, PNG, or WebP image.')
			event.target.value = ''
			return
		}

		if (file.size > MAX_FILE_SIZE) {
			setError('Image size must not exceed 3 MB.')
			event.target.value = ''
			return
		}

		const imageUrl = URL.createObjectURL(file)

		setPreview(imageUrl)
		onImageChange?.(file)

		event.target.value = ''
	}

	const handleRemoveImage = () => {
		setPreview(null)
		setError('')
		onImageChange?.(null)

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	return (
		<div className='flex flex-col gap-5 sm:flex-row sm:items-center'>
			<div className='relative size-24 shrink-0'>
				<div className='flex size-24 items-center justify-center overflow-hidden rounded-full border border-[#E2E5F0] bg-[#F4F6FB]'>
					{preview ? (
						<img
							src={preview}
							alt='Profile preview'
							className='size-full object-cover'
						/>
					) : (
						<UserRound
							size={38}
							strokeWidth={1.5}
							className='text-[#9CA3AF]'
						/>
					)}
				</div>

				<button
					type='button'
					onClick={() => fileInputRef.current?.click()}
					aria-label='Choose profile image'
					className='absolute right-0 bottom-0 flex size-9 items-center justify-center rounded-full border-2 border-white bg-[#4F46E5] text-white shadow-sm transition-colors hover:bg-[#4338CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
				>
					<Camera size={16} />
				</button>
			</div>

			<div className='min-w-0 space-y-3'>
				<div>
					<h3 className='text-sm font-semibold text-[#202B49]'>
						Profile photo
					</h3>

					<p className='mt-1 text-sm leading-5 text-[#6B7280]'>
						Choose a clear photo to personalize your banking
						profile.
					</p>
				</div>

				<div className='flex flex-wrap items-center gap-3'>
					<button
						type='button'
						onClick={() => fileInputRef.current?.click()}
						className='inline-flex items-center gap-2 rounded-lg border border-[#E2E5F0] bg-white px-3.5 py-2 text-sm font-medium text-[#202B49] transition-colors hover:bg-[#F4F6FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer'
					>
						<ImagePlus size={16} />
						Choose image
					</button>

					{preview && (
						<button
							type='button'
							onClick={handleRemoveImage}
							className='inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#DC2626] transition-colors hover:bg-[#FEF2F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626] cursor-pointer'
						>
							<Trash2 size={15} />
							Remove
						</button>
					)}
				</div>

				<p className='text-xs text-[#6B7280]'>
					JPG, PNG, or WebP. Maximum file size: 3 MB.
				</p>

				{error && (
					<p
						role='alert'
						className='text-sm font-medium text-[#DC2626]'
					>
						{error}
					</p>
				)}
			</div>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/jpeg,image/png,image/webp'
				onChange={handleImageSelect}
				className='hidden'
				aria-label='Upload profile image'
			/>
		</div>
	)
}