import { FUNDING_CURRENCY, MINIMUM_FUNDING_AMOUNT } from './system-funding.data'

/**
 * Format a numeric amount as Bangladeshi Taka.
 */
export function formatFundingAmount(amount) {
	const numericAmount = Number(amount)

	if (!Number.isFinite(numericAmount)) {
		return new Intl.NumberFormat('en-BD', {
			style: 'currency',
			currency: FUNDING_CURRENCY,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(0)
	}

	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency: FUNDING_CURRENCY,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(numericAmount)
}

/**
 * Validate the funding amount.
 */
export function validateFundingAmount(amount) {
	if (amount === '' || amount === null || amount === undefined) {
		return 'Deposit amount is required.'
	}

	const numericAmount = Number(amount)

	if (!Number.isFinite(numericAmount)) {
		return 'Enter a valid deposit amount.'
	}

	if (numericAmount < MINIMUM_FUNDING_AMOUNT) {
		return `Minimum deposit amount is ${formatFundingAmount(MINIMUM_FUNDING_AMOUNT)}.`
	}

	if (!Number.isSafeInteger(numericAmount)) {
		return 'Deposit amount must be a whole number.'
	}

	return ''
}

/**
 * Validate the receiver account ID format.
 *
 * This checks only the expected MongoDB ObjectId format.
 * It does not verify that the account exists or is active.
 */
export function validateReceiverAccountId(accountId) {
	const normalizedId = accountId.trim()

	if (!normalizedId) {
		return 'Receiver account ID is required.'
	}

	if (!/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
		return 'Enter a valid 24-character account ID.'
	}

	return ''
}

/**
 * Check whether the receiver and system accounts are different.
 */
export function validateDifferentAccounts(receiverAccountId, systemAccountId) {
	if (!receiverAccountId || !systemAccountId) {
		return ''
	}

	if (
		receiverAccountId.trim().toLowerCase() ===
		systemAccountId.trim().toLowerCase()
	) {
		return 'Receiver account must be different from the system account.'
	}

	return ''
}