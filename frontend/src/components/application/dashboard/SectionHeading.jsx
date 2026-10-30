export default function SectionHeading({ title, description, action }) {
	return (
		<div className='mb-5 flex items-start justify-between gap-4'>
			<div className='min-w-0'>
				<h2 className='text-base font-semibold text-[#202B49] sm:text-lg'>
					{title}
				</h2>

				{description && (
					<p className='mt-1 text-sm leading-6 text-[#6B7280]'>
						{description}
					</p>
				)}
			</div>

			{action && <div className='shrink-0'>{action}</div>}
		</div>
	)
}