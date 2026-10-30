/*
|--------------------------------------------------------------------------
| NexBank — Transaction Mock Data
|--------------------------------------------------------------------------
|
| This file contains mock responses matching the existing backend API.
|
| Important:
| - These are frontend mock objects, not API responses.
| - Do not add properties that are not documented by the backend.
| - History and details responses intentionally have different structures.
|
*/

/*
|--------------------------------------------------------------------------
| Mock Transaction History Response
|--------------------------------------------------------------------------
|
| Backend endpoint:
| GET /api/transactions?page=1&limit=10
|
| Each transaction contains:
| id, fromAccount, toAccount, amount, status, direction, createdAt
|
*/

export const MOCK_TRANSACTIONS_RESPONSE = {
	message: 'Transaction history fetched successfully',
	status: 'success',

	transactions: [
		{
			id: '6ae205a901c1ae1bf4884cc0',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2051201c1ae1bf4884cbf',
			amount: 1500,
			status: 'COMPLETED',
			direction: 'SENT',
			createdAt: '2026-10-29T05:30:00.000Z',
		},
		{
			id: '6ae206a901c1ae1bf4884cc1',
			fromAccount: '6ae2051201c1ae1bf4884cbf',
			toAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 500,
			status: 'COMPLETED',
			direction: 'RECEIVED',
			createdAt: '2026-10-28T10:15:00.000Z',
		},
		{
			id: '6ae207a901c1ae1bf4884cc2',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2081201c1ae1bf4884cc3',
			amount: 2500,
			status: 'PENDING',
			direction: 'SENT',
			createdAt: '2026-10-27T09:20:00.000Z',
		},
		{
			id: '6ae209a901c1ae1bf4884cc4',
			fromAccount: '6ae2091201c1ae1bf4884cc5',
			toAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 3200,
			status: 'COMPLETED',
			direction: 'RECEIVED',
			createdAt: '2026-10-26T14:45:00.000Z',
		},
		{
			id: '6ae210a901c1ae1bf4884cc6',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2111201c1ae1bf4884cc7',
			amount: 850,
			status: 'FAILED',
			direction: 'SENT',
			createdAt: '2026-10-25T08:10:00.000Z',
		},
		{
			id: '6ae212a901c1ae1bf4884cc8',
			fromAccount: '6ae2131201c1ae1bf4884cc9',
			toAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 4500,
			status: 'COMPLETED',
			direction: 'RECEIVED',
			createdAt: '2026-10-24T11:30:00.000Z',
		},
		{
			id: '6ae214a901c1ae1bf4884cca',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2151201c1ae1bf4884ccb',
			amount: 1200,
			status: 'REVERSED',
			direction: 'SENT',
			createdAt: '2026-10-23T07:50:00.000Z',
		},
		{
			id: '6ae216a901c1ae1bf4884ccc',
			fromAccount: '6ae2171201c1ae1bf4884ccd',
			toAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 750,
			status: 'COMPLETED',
			direction: 'RECEIVED',
			createdAt: '2026-10-22T16:25:00.000Z',
		},
		{
			id: '6ae218a901c1ae1bf4884cce',
			fromAccount: '6ae2048701c1ae1bf4884cbe',
			toAccount: '6ae2191201c1ae1bf4884ccf',
			amount: 1800,
			status: 'COMPLETED',
			direction: 'SENT',
			createdAt: '2026-10-21T06:40:00.000Z',
		},
		{
			id: '6ae220a901c1ae1bf4884cd0',
			fromAccount: '6ae2211201c1ae1bf4884cd1',
			toAccount: '6ae2048701c1ae1bf4884cbe',
			amount: 2200,
			status: 'PENDING',
			direction: 'RECEIVED',
			createdAt: '2026-10-20T12:05:00.000Z',
		},
	],

	pagination: {
		currentPage: 1,
		limit: 10,
		totalTransactions: 10,
		totalPages: 1,
		hasNextPage: false,
		hasPreviousPage: false,
	},
}

/*
|--------------------------------------------------------------------------
| Mock Transaction Details Response — Sender
|--------------------------------------------------------------------------
|
| Backend endpoint:
| GET /api/transactions/:transactionId
|
| This represents the same transaction as the first history record.
|
| The idempotencyKey is included because this is the sender's response.
|
*/

export const MOCK_TRANSACTION_DETAILS_RESPONSE = {
	message: 'Transaction details fetched successfully',
	status: 'success',

	transaction: {
		id: '6ae205a901c1ae1bf4884cc0',
		amount: 1500,
		status: 'COMPLETED',
		direction: 'SENT',

		fromAccount: {
			id: '6ae2048701c1ae1bf4884cbe',
			currency: 'BDT',
			ownerName: 'Sudipto Raha',
		},

		toAccount: {
			id: '6ae2051201c1ae1bf4884cbf',
			currency: 'BDT',
			ownerName: 'John Smith',
		},

		createdAt: '2026-10-29T05:30:00.000Z',
		updatedAt: '2026-10-29T05:30:01.000Z',

		idempotencyKey: 'transaction-unique-key-001',
	},
}

/*
|--------------------------------------------------------------------------
| Mock Transaction Details Response — Receiver
|--------------------------------------------------------------------------
|
| This represents a receiver-side transaction details response.
|
| Important:
| The backend does not return idempotencyKey to receivers.
| Therefore, this property is intentionally omitted.
|
*/

export const MOCK_RECEIVED_TRANSACTION_DETAILS_RESPONSE = {
	message: 'Transaction details fetched successfully',
	status: 'success',

	transaction: {
		id: '6ae206a901c1ae1bf4884cc1',
		amount: 500,
		status: 'COMPLETED',
		direction: 'RECEIVED',

		fromAccount: {
			id: '6ae2051201c1ae1bf4884cbf',
			currency: 'BDT',
			ownerName: 'John Smith',
		},

		toAccount: {
			id: '6ae2048701c1ae1bf4884cbe',
			currency: 'BDT',
			ownerName: 'Sudipto Raha',
		},

		createdAt: '2026-10-28T10:15:00.000Z',
		updatedAt: '2026-10-28T10:15:02.000Z',
	},
}