import { Search, X } from 'lucide-react'

const DIRECTION_OPTIONS = [
	{ label: 'All Directions', value: 'ALL' },
	{ label: 'Sent', value: 'SENT' },
	{ label: 'Received', value: 'RECEIVED' },
]

const STATUS_OPTIONS = [
	{ label: 'All Statuses', value: 'ALL' },
	{ label: 'Completed', value: 'COMPLETED' },
	{ label: 'Pending', value: 'PENDING' },
	{ label: 'Failed', value: 'FAILED' },
	{ label: 'Reversed', value: 'REVERSED' },
]

export default function TransactionsToolbar({
	searchQuery,
	onSearchChange,
	directionFilter,
	onDirectionChange,
	statusFilter,
	onStatusChange,
	onClearFilters,
}) {
	const hasActiveFilters =
		searchQuery.trim() !== '' ||
		directionFilter !== 'ALL' ||
		statusFilter !== 'ALL'

	return (
		<section
			aria-label='Transaction search and filters'
			className='rounded-2xl border border-[#E2E5F0] bg-white p-4 shadow-sm sm:p-5'
		>
			<div className='flex flex-col gap-4'>
				{/* Search */}
				<div className='relative'>
					<Search
						size={19}
						strokeWidth={1.8}
						className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]'
						aria-hidden='true'
					/>

					<input
						type='search'
						value={searchQuery}
						onChange={(event) => onSearchChange(event.target.value)}
						placeholder='Search by transaction or account ID'
						aria-label='Search transactions by transaction ID or account ID'
						className='h-11 w-full rounded-xl border border-[#E2E5F0] bg-white pl-11 pr-4 text-sm text-[#202B49] outline-none transition placeholder:text-[#9CA3AF] hover:border-[#C7CCDA] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/10'
					/>
				</div>

				{/* Filters */}
				<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<div className='grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center'>
						<div className='flex flex-col gap-1.5'>
							<label
								htmlFor='transaction-direction-filter'
								className='text-xs font-medium text-[#6B7280]'
							>
								Direction
							</label>

							<select
								id='transaction-direction-filter'
								value={directionFilter}
								onChange={(event) =>
									onDirectionChange(event.target.value)
								}
								className='h-10 min-w-40 rounded-lg border border-[#E2E5F0] bg-white px-3 text-sm text-[#202B49] outline-none transition hover:border-[#C7CCDA] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/10'
							>
								{DIRECTION_OPTIONS.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>

						<div className='flex flex-col gap-1.5'>
							<label
								htmlFor='transaction-status-filter'
								className='text-xs font-medium text-[#6B7280]'
							>
								Status
							</label>

							<select
								id='transaction-status-filter'
								value={statusFilter}
								onChange={(event) =>
									onStatusChange(event.target.value)
								}
								className='h-10 min-w-40 rounded-lg border border-[#E2E5F0] bg-white px-3 text-sm text-[#202B49] outline-none transition hover:border-[#C7CCDA] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/10'
							>
								{STATUS_OPTIONS.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{hasActiveFilters && (
						<button
							type='button'
							onClick={onClearFilters}
							className='inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-[#6B7280] transition hover:bg-[#F4F6FB] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5]'
						>
							<X
								size={16}
								aria-hidden='true'
							/>
							Clear filters
						</button>
					)}
				</div>
			</div>
		</section>
	)
}