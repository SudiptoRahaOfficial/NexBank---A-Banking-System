export const MINIMUM_FUNDING_AMOUNT = 1000

export const FUNDING_CURRENCY = 'BDT'

export const FUNDING_STATUS = {
	COMPLETED: 'COMPLETED',
	PENDING: 'PENDING',
	FAILED: 'FAILED',
	REVERSED: 'REVERSED',
}

export const MOCK_FUNDING_RESPONSES = {
	COMPLETED: {
		message: 'Initial deposit completed successfully',
		status: 'success',
		deposit: {
			id: 'mock-deposit-001',
			receiverAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 5000,
			idempotencyKey: 'mock-initial-deposit-001',
			status: FUNDING_STATUS.COMPLETED,
		},
	},

	PENDING: {
		message: 'Initial deposit is currently pending',
		status: 'pending',
		deposit: {
			id: 'mock-deposit-002',
			receiverAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 5000,
			idempotencyKey: 'mock-initial-deposit-002',
			status: FUNDING_STATUS.PENDING,
		},
	},

	FAILED: {
		message: 'Initial deposit failed',
		status: 'failed',
		deposit: {
			id: 'mock-deposit-003',
			receiverAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 5000,
			idempotencyKey: 'mock-initial-deposit-003',
			status: FUNDING_STATUS.FAILED,
		},
	},

	REVERSED: {
		message: 'Initial deposit was reversed',
		status: 'reversed',
		deposit: {
			id: 'mock-deposit-004',
			receiverAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 5000,
			idempotencyKey: 'mock-initial-deposit-004',
			status: FUNDING_STATUS.REVERSED,
		},
	},
}