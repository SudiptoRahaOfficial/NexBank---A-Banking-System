'use client'

import { useMemo, useState } from 'react'

import TransactionsOverview from './TransactionsOverview'
import TransactionsToolbar from './TransactionsToolbar'
import TransactionsList from './TransactionsList'
import TransactionsPagination from './TransactionsPagination'
import TransactionDetailsDialog from './TransactionDetailsDialog'

import {
	MOCK_TRANSACTIONS_RESPONSE,
	MOCK_TRANSACTION_DETAILS_RESPONSE,
	MOCK_RECEIVED_TRANSACTION_DETAILS_RESPONSE,
} from './transactions.data'

const ALL_TRANSACTIONS = MOCK_TRANSACTIONS_RESPONSE.transactions

const MOCK_TRANSACTION_DETAILS = [
	MOCK_TRANSACTION_DETAILS_RESPONSE.transaction,
	MOCK_RECEIVED_TRANSACTION_DETAILS_RESPONSE.transaction,
]

export default function TransactionsContent() {
	// Search and filter state
	const [searchQuery, setSearchQuery] = useState('')
	const [directionFilter, setDirectionFilter] = useState('ALL')
	const [statusFilter, setStatusFilter] = useState('ALL')

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1)
	const [limit, setLimit] = useState(
		MOCK_TRANSACTIONS_RESPONSE.pagination.limit,
	)

	// Transaction details dialog state
	const [selectedTransactionDetails, setSelectedTransactionDetails] =
		useState(null)
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	// Search and filter the complete local mock dataset
	const filteredTransactions = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase()

		return ALL_TRANSACTIONS.filter((transaction) => {
			const matchesSearch =
				normalizedQuery === '' ||
				transaction.id.toLowerCase().includes(normalizedQuery) ||
				transaction.fromAccount
					.toLowerCase()
					.includes(normalizedQuery) ||
				transaction.toAccount.toLowerCase().includes(normalizedQuery)

			const matchesDirection =
				directionFilter === 'ALL' ||
				transaction.direction === directionFilter

			const matchesStatus =
				statusFilter === 'ALL' || transaction.status === statusFilter

			return matchesSearch && matchesDirection && matchesStatus
		})
	}, [searchQuery, directionFilter, statusFilter])

	// Calculate pagination from the filtered records
	const totalTransactions = filteredTransactions.length

	const totalPages = Math.ceil(totalTransactions / limit)

	const paginatedTransactions = useMemo(() => {
		const startIndex = (currentPage - 1) * limit

		return filteredTransactions.slice(startIndex, startIndex + limit)
	}, [filteredTransactions, currentPage, limit])

	// Navigation handlers
	function handlePageChange(nextPage) {
		const maximumPage = Math.max(totalPages, 1)

		const validPage = Math.min(Math.max(nextPage, 1), maximumPage)

		setCurrentPage(validPage)
	}

	function handleLimitChange(nextLimit) {
		const validLimit = Math.min(50, Math.max(1, Number(nextLimit) || 10))

		setLimit(validLimit)
		setCurrentPage(1)
	}

	// Search and filter handlers
	function handleSearchChange(value) {
		setSearchQuery(value)
		setCurrentPage(1)
	}

	function handleDirectionChange(value) {
		setDirectionFilter(value)
		setCurrentPage(1)
	}

	function handleStatusChange(value) {
		setStatusFilter(value)
		setCurrentPage(1)
	}

	function handleClearFilters() {
		setSearchQuery('')
		setDirectionFilter('ALL')
		setStatusFilter('ALL')
		setCurrentPage(1)
	}

	// Transaction details handler
	function handleViewDetails(transaction) {
		const existingDetails = MOCK_TRANSACTION_DETAILS.find(
			(details) => details.id === transaction.id,
		)

		/*
		 * The mock details dataset currently contains only selected
		 * transaction examples.
		 *
		 * For other records, display the information available from
		 * the history response without inventing owner names,
		 * currencies, or update timestamps.
		 */
		const details = existingDetails ?? {
			id: transaction.id,
			amount: transaction.amount,
			status: transaction.status,
			direction: transaction.direction,
			fromAccount: {
				id: transaction.fromAccount,
			},
			toAccount: {
				id: transaction.toAccount,
			},
			createdAt: transaction.createdAt,
		}

		setSelectedTransactionDetails(details)
		setIsDetailsOpen(true)
	}

	function handleDialogClose() {
		setIsDetailsOpen(false)
		setSelectedTransactionDetails(null)
	}

	return (
		<div className='space-y-8'>
			{/* Transaction Overview */}
			<TransactionsOverview />

			{/* Search and Filters */}
			<TransactionsToolbar
				searchQuery={searchQuery}
				onSearchChange={handleSearchChange}
				directionFilter={directionFilter}
				onDirectionChange={handleDirectionChange}
				statusFilter={statusFilter}
				onStatusChange={handleStatusChange}
				onClearFilters={handleClearFilters}
			/>

			{/* Transaction History */}
			<TransactionsList
				transactions={paginatedTransactions}
				totalTransactions={ALL_TRANSACTIONS.length}
				onViewDetails={handleViewDetails}
			/>

			{/* Pagination */}
			<TransactionsPagination
				currentPage={currentPage}
				totalPages={totalPages}
				totalTransactions={totalTransactions}
				limit={limit}
				hasNextPage={currentPage < totalPages}
				hasPreviousPage={currentPage > 1}
				onPageChange={handlePageChange}
				onLimitChange={handleLimitChange}
			/>

			{/* Transaction Details */}
			<TransactionDetailsDialog
				isOpen={isDetailsOpen}
				transactionDetails={selectedTransactionDetails}
				onDialogClose={handleDialogClose}
			/>
		</div>
	)
}