export const MOCK_ACCOUNTS_RESPONSE = {
	message: 'Fetched accounts successfully',
	status: 'success',

	accounts: [
		{
			_id: '6ae2048701c1ae1bf4884cbe',
			user: '6ae1ff0a01c1ae1bf4884cba',
			status: 'ACTIVE',
			currency: 'BDT',
		},
		{
			_id: '6ae2051201c1ae1bf4884cbf',
			user: '6ae1ff0a01c1ae1bf4884cba',
			status: 'ACTIVE',
			currency: 'BDT',
		},
		{
			_id: '6ae2073401c1ae1bf4884cc2',
			user: '6ae1ff0a01c1ae1bf4884cba',
			status: 'INACTIVE',
			currency: 'BDT',
		},
	],
}

export const MOCK_ACCOUNT_BALANCES = {
	'6ae2048701c1ae1bf4884cbe': {
		message: 'Account balance fetched',
		status: 'success',

		balance: {
			account: '6ae2048701c1ae1bf4884cbe',
			currentBalance: 125000.5,
		},
	},

	'6ae2051201c1ae1bf4884cbf': {
		message: 'Account balance fetched',
		status: 'success',

		balance: {
			account: '6ae2051201c1ae1bf4884cbf',
			currentBalance: 18750,
		},
	},
}

export const MOCK_TRANSACTION_RESPONSES = {
	completed: {
		message: 'Transaction completed successfully',
		status: 'success',

		transaction: {
			id: '6ae205a901c1ae1bf4884cc0',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2051201c1ae1bf4884cbf',
			amount: 1500,
			idempotencyKey: 'transaction-unique-key-001',
			status: 'COMPLETED',
		},
	},

	pending: {
		message: 'Transaction could not be confirmed as completed',
		status: 'pending',

		transaction: {
			id: '6ae205a901c1ae1bf4884cc1',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2099901c1ae1bf4884cc9',
			amount: 2500,
			idempotencyKey: 'transaction-unique-key-002',
			status: 'PENDING',
		},
	},

	failed: {
		message: 'Transaction failed',
		status: 'failed',

		transaction: {
			id: '6ae205a901c1ae1bf4884cc2',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2099901c1ae1bf4884cc9',
			amount: 3000,
			idempotencyKey: 'transaction-unique-key-003',
			status: 'FAILED',
		},
	},

	reversed: {
		message: 'Transaction has been reversed',
		status: 'reversed',

		transaction: {
			id: '6ae205a901c1ae1bf4884cc3',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2099901c1ae1bf4884cc9',
			amount: 4000,
			idempotencyKey: 'transaction-unique-key-004',
			status: 'REVERSED',
		},
	},
}