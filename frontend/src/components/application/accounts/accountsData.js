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
			_id: '6ae2048701c1ae1bf4884cbf',
			user: '6ae1ff0a01c1ae1bf4884cba',
			status: 'ACTIVE',
			currency: 'BDT',
		},
		{
			_id: '6ae2048701c1ae1bf4884cc0',
			user: '6ae1ff0a01c1ae1bf4884cba',
			status: 'ACTIVE',
			currency: 'BDT',
		},
	],
}

export const MOCK_ACCOUNT_BALANCES = [
	{
		message: 'Account balance fetched',
		status: 'success',
		balance: {
			account: '6ae2048701c1ae1bf4884cbe',
			currentBalance: 125000.5,
		},
	},
	{
		message: 'Account balance fetched',
		status: 'success',
		balance: {
			account: '6ae2048701c1ae1bf4884cbf',
			currentBalance: 98500,
		},
	},
	{
		message: 'Account balance fetched',
		status: 'success',
		balance: {
			account: '6ae2048701c1ae1bf4884cc0',
			currentBalance: 25250,
		},
	},
]