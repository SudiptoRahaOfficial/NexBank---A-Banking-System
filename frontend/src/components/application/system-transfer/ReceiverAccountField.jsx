import { useId } from 'react'
import { AlertCircle, Hash } from 'lucide-react'

export default function ReceiverAccountField({
	value,
	onChange,
	error = '',
	disabled = false,
}) {
	const inputId = useId()
	const errorId = `${inputId}-error`

	return (
		<div className='space-y-2'>
			<label
				htmlFor={inputId}
				className='block text-sm font-medium text-[#202B49]'
			>
				Receiver account ID
				<span
					className='ml-1 text-[#DC2626]'
					aria-hidden='true'
				>
					*
				</span>
			</label>

			<div className='relative'>
				<Hash
					size={18}
					className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]'
					aria-hidden='true'
				/>

				<input
					id={inputId}
					type='text'
					name='receiverAccountId'
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder='Enter receiver account ID'
					autoComplete='off'
					spellCheck={false}
					disabled={disabled}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? errorId : undefined}
					className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-[#202B49] outline-none transition-colors placeholder:text-[#9CA3AF] disabled:cursor-not-allowed disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] ${
						error
							? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/10'
							: 'border-[#E2E5F0] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/10'
					}`}
				/>
			</div>

			{error ? (
				<p
					id={errorId}
					className='flex items-center gap-1.5 text-xs text-[#DC2626]'
					role='alert'
				>
					<AlertCircle
						size={14}
						aria-hidden='true'
					/>
					{error}
				</p>
			) : (
				<p className='text-xs leading-5 text-[#6B7280]'>
					Enter the 24-character ID of the customer account you want
					to fund.
				</p>
			)}
		</div>
	)
}