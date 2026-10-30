import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50]

export default function TransactionsPagination({
	currentPage,
	totalPages,
	totalTransactions,
	limit,
	hasNextPage,
	hasPreviousPage,
	onPageChange,
	onLimitChange,
}) {
	if (totalTransactions === 0 || totalPages === 0) {
		return null
	}

	const startRecord = (currentPage - 1) * limit + 1
	const endRecord = Math.min(currentPage * limit, totalTransactions)

	return (
		<nav
			aria-label='Transaction history pagination'
			className='flex flex-col gap-4 rounded-2xl border border-[#E2E5F0] bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'
		>
			{/* Pagination Information */}
			<div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4'>
				<p className='text-sm text-[#6B7280]'>
					Showing{' '}
					<span className='font-semibold text-[#202B49] tabular-nums'>
						{startRecord}–{endRecord}
					</span>{' '}
					of{' '}
					<span className='font-semibold text-[#202B49] tabular-nums'>
						{totalTransactions}
					</span>{' '}
					transactions
				</p>

				<div className='flex items-center gap-2'>
					<label
						htmlFor='transaction-page-size'
						className='text-xs font-medium text-[#6B7280]'
					>
						Rows per page
					</label>

					<select
						id='transaction-page-size'
						value={limit}
						onChange={(event) =>
							onLimitChange(Number(event.target.value))
						}
						className='h-8 rounded-lg border border-[#E2E5F0] bg-white px-2 text-sm text-[#202B49] outline-none transition hover:border-[#C7CCDA] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/10'
					>
						{PAGE_SIZE_OPTIONS.map((option) => (
							<option
								key={option}
								value={option}
							>
								{option}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Navigation */}
			<div className='flex items-center justify-between gap-3 sm:justify-end'>
				<p
					className='text-sm font-medium text-[#202B49] tabular-nums'
					aria-live='polite'
				>
					Page {currentPage} of {totalPages}
				</p>

				<div className='flex items-center gap-2'>
					<button
						type='button'
						onClick={() => onPageChange(currentPage - 1)}
						disabled={!hasPreviousPage}
						aria-label='Go to previous page'
						className='inline-flex size-9 items-center justify-center rounded-lg border border-[#E2E5F0] text-[#6B7280] transition hover:border-[#C7CCDA] hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#6B7280]'
					>
						<ChevronLeft
							size={18}
							aria-hidden='true'
						/>
					</button>

					<button
						type='button'
						onClick={() => onPageChange(currentPage + 1)}
						disabled={!hasNextPage}
						aria-label='Go to next page'
						className='inline-flex size-9 items-center justify-center rounded-lg border border-[#E2E5F0] text-[#6B7280] transition hover:border-[#C7CCDA] hover:bg-[#F4F6FB] hover:text-[#202B49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#6B7280]'
					>
						<ChevronRight
							size={18}
							aria-hidden='true'
						/>
					</button>
				</div>
			</div>
		</nav>
	)
}