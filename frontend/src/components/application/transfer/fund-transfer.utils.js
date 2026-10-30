const MIN_TRANSFER_AMOUNT = 100

/**
 * Formats an amount as Bangladeshi Taka.
 *
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
	const numericAmount = Number(amount)

	if (!Number.isFinite(numericAmount)) {
		return '৳0.00'
	}

	return new Intl.NumberFormat('en-BD', {
		style: 'currency',
		currency: 'BDT',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(numericAmount)
}

/**
 * Validates the transfer amount.
 *
 * @param {string | number} amount
 * @returns {string | null}
 */
export function validateTransferAmount(amount) {
	if (amount === '' || amount === null || amount === undefined) {
		return 'Enter a transfer amount.'
	}

	const numericAmount = Number(amount)

	if (!Number.isFinite(numericAmount)) {
		return 'Enter a valid amount.'
	}

	if (numericAmount < MIN_TRANSFER_AMOUNT) {
		return `The minimum transfer amount is ${formatCurrency(MIN_TRANSFER_AMOUNT)}.`
	}

	if (!Number.isSafeInteger(numericAmount * 100)) {
		return 'Enter an amount with no more than two decimal places.'
	}

	return null
}

/**
 * Validates the source and destination accounts.
 *
 * @param {object | null} sourceAccount
 * @param {string} destinationAccountId
 * @returns {string | null}
 */
export function validateTransferAccounts(sourceAccount, destinationAccountId) {
	if (!sourceAccount) {
		return 'Select a source account.'
	}

	if (sourceAccount.status !== 'ACTIVE') {
		return 'Your source account must be active.'
	}

	if (!destinationAccountId.trim()) {
		return 'Enter the recipient account ID.'
	}

	if (sourceAccount._id === destinationAccountId.trim()) {
		return 'The source and destination accounts must be different.'
	}

	return null
}

/**
 * Checks whether the source account has enough funds.
 *
 * @param {string | number} amount
 * @param {number} availableBalance
 * @returns {string | null}
 */
export function validateAvailableBalance(amount, availableBalance) {
	const numericAmount = Number(amount)

	if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
		return null
	}

	if (!Number.isFinite(availableBalance) || availableBalance < 0) {
		return 'The available balance could not be verified.'
	}

	if (numericAmount > availableBalance) {
		return 'Insufficient funds in the selected source account.'
	}

	return null
}

/**
 * Calculates the estimated balance after a transfer.
 *
 * This is a UI estimate, not an authoritative bank balance.
 *
 * @param {number} currentBalance
 * @param {string | number} amount
 * @returns {number | null}
 */
export function calculateRemainingBalance(currentBalance, amount) {
	const balance = Number(currentBalance)
	const transferAmount = Number(amount)

	if (
		!Number.isFinite(balance) ||
		!Number.isFinite(transferAmount) ||
		balance < 0 ||
		transferAmount < 0
	) {
		return null
	}

	return Math.round((balance - transferAmount) * 100) / 100
}