import { ArrowRight, ShieldAlert } from 'lucide-react'

export default function SecurityActionCard({
	title,
	description,
	buttonLabel,
	onAction,
	variant = 'default',
}) {
	const isDanger = variant === 'danger'

	return (
		<div className='flex flex-col gap-4 rounded-xl border border-[#E2E5F0] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
			<div className='flex min-w-0 items-start gap-3'>
				<div
					className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
						isDanger
							? 'bg-[#FEF2F2] text-[#DC2626]'
							: 'bg-[#E9EFFF] text-[#4F46E5]'
					}`}
				>
					<ShieldAlert size={19} />
				</div>

				<div className='min-w-0'>
					<h3 className='text-sm font-semibold text-[#202B49]'>
						{title}
					</h3>

					<p className='mt-1 text-sm leading-5 text-[#6B7280]'>
						{description}
					</p>
				</div>
			</div>

			<button
				type='button'
				onClick={onAction}
				className={`inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto ${
					isDanger
						? 'border-[#FECACA] bg-white text-[#DC2626] hover:bg-[#FEF2F2] focus-visible:outline-[#DC2626]'
						: 'border-[#E2E5F0] bg-white text-[#202B49] hover:bg-[#F4F6FB] focus-visible:outline-[#4F46E5]'
				} cursor-pointer`}
			>
				{buttonLabel}
				<ArrowRight size={15} />
			</button>
		</div>
	)
}