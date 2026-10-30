'use client'

import { Check, X } from 'lucide-react'

export default function PreferenceItem({
	title,
	description,
	checked,
	onChange,
	disabled = false,
}) {
	return (
		<div className='flex items-center justify-between gap-5 py-4'>
			<div className='min-w-0 flex-1'>
				<h3 className='text-sm font-medium text-[#202B49]'>{title}</h3>

				<p className='mt-1 text-sm leading-5 text-[#6B7280]'>
					{description}
				</p>
			</div>

			<button
				type='button'
				role='switch'
				aria-checked={checked}
				aria-label={title}
				disabled={disabled}
				onClick={() => onChange?.(!checked)}
				className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-50 ${
					checked ? 'bg-[#4F46E5]' : 'bg-[#D1D5DB]'
				} cursor-pointer`}
			>
				<span
					className={`absolute flex size-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
						checked ? 'translate-x-6' : 'translate-x-1'
					}`}
				>
					{checked ? (
						<Check
							size={12}
							className='text-[#4F46E5]'
						/>
					) : (
						<X
							size={12}
							className='text-[#9CA3AF]'
						/>
					)}
				</span>
			</button>
		</div>
	)
}