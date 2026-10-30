'use client'

import { Suspense } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Search, SlidersHorizontal, X } from 'lucide-react'

const STATUS_OPTIONS = [
	{ label: 'All Accounts', value: 'ALL' },
	{ label: 'Active', value: 'ACTIVE' },
	{ label: 'Inactive', value: 'INACTIVE' },
]

function AccountsToolbarContent() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const searchQuery = searchParams.get('search') || ''
	const statusFilter = searchParams.get('status') || 'ALL'

	const hasActiveFilters = searchQuery.length > 0 || statusFilter !== 'ALL'

	function updateFilters(updates) {
		const params = new URLSearchParams(searchParams.toString())

		Object.entries(updates).forEach(([key, value]) => {
			if (value) {
				params.set(key, value)
			} else {
				params.delete(key)
			}
		})

		const queryString = params.toString()

		router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
			scroll: false,
		})
	}

	function handleClearFilters() {
		updateFilters({
			search: '',
			status: '',
		})
	}

	return (
		<section
			aria-label='Account search and filters'
			className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
		>
			<div className='relative w-full sm:max-w-md'>
				<Search
					size={19}
					aria-hidden='true'
					className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]'
				/>

				<input
					type='search'
					value={searchQuery}
					onChange={(event) =>
						updateFilters({
							search: event.target.value,
						})
					}
					placeholder='Search by account ID...'
					aria-label='Search accounts by account ID'
					className='h-11 w-full rounded-lg border border-[#E2E5F0] bg-white py-2 pl-11 pr-4 text-sm text-[#202B49] outline-none transition placeholder:text-[#9CA3AF] hover:border-[#C7CCE0] focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/10'
				/>
			</div>

			<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
				<div className='flex items-center gap-2'>
					<SlidersHorizontal
						size={17}
						aria-hidden='true'
						className='shrink-0 text-[#6B7280]'
					/>

					<label
						htmlFor='account-status-filter'
						className='shrink-0 text-sm font-medium text-[#6B7280]'
					>
						Status
					</label>

					<select
						id='account-status-filter'
						value={statusFilter}
						onChange={(event) =>
							updateFilters({
								status:
									event.target.value === 'ALL'
										? ''
										: event.target.value,
							})
						}
						className='h-11 min-w-0 flex-1 rounded-lg border border-[#E2E5F0] bg-white px-3 text-sm font-medium text-[#202B49] outline-none transition hover:border-[#C7CCE0] focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/10 sm:min-w-40'
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

				{hasActiveFilters && (
					<button
						type='button'
						onClick={handleClearFilters}
						className='inline-flex h-10 items-center justify-center gap-1.5 self-start rounded-lg px-3 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F4F6FB] hover:text-[#4F46E5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] sm:self-auto'
					>
						<X
							size={15}
							aria-hidden='true'
						/>
						Clear filters
					</button>
				)}
			</div>
		</section>
	)
}

function AccountsToolbarFallback() {
	return (
		<div
			aria-hidden='true'
			className='h-11 w-full animate-pulse rounded-lg bg-[#E9ECF4]'
		/>
	)
}

export default function AccountsToolbar() {
	return (
		<Suspense fallback={<AccountsToolbarFallback />}>
			<AccountsToolbarContent />
		</Suspense>
	)
}