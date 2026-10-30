export function formatCurrency(amount, currency = 'BDT') {
	const value = Number(amount)

	if (!Number.isFinite(value)) {
		return '—'
	}

	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value)
}

export function formatDate(dateString) {
	const date = new Date(dateString)

	if (Number.isNaN(date.getTime())) {
		return 'Date unavailable'
	}

	return new Intl.DateTimeFormat('en-BD', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'Asia/Dhaka',
	}).format(date)
}

export function maskAccountNumber(accountNumber = '') {
	const value = String(accountNumber)

	if (!value) {
		return 'Account number unavailable'
	}

	return `•••• ${value.slice(-4)}`
}

export function getCustomerInitials(customer = {}) {
	const fullName = [customer.firstName, customer.lastName]
		.filter(Boolean)
		.join(' ')

	if (!fullName) {
		return 'NA'
	}

	return fullName
		.split(/\s+/)
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase()
}