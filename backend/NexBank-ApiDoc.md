# NexBank API Documentation

NexBank provides APIs for user authentication, bank account management, initial funding, and secure account-to-account transfers.

## 1. General Information

### Base URL

```text
http://localhost:3000
```

Replace the local URL with the deployed API URL in production.

### API conventions

- **Content type:** `application/json`
- **Response format:** JSON
- **Authentication:** Bearer access token for protected endpoints, except session-management endpoints that require the refresh-token cookie.
- **Access token lifetime:** 15 minutes
- **Refresh token lifetime:** 7 days

Most responses include a `message` and a `status` field. The `status` field may contain values such as `success`, `failed`, or `pending`, depending on the endpoint and operation.

### Authentication header

Include the access token when calling protected endpoints:

```http
Authorization: Bearer <accessToken>
```

For endpoints that require a refresh-token cookie, the client must send cookies with the request.

---

# 2. Authentication API

Authentication endpoints support account registration, email verification, sign-in, token renewal, and session revocation.

## 2.1 Sign Up

Create a user account and initiate email verification.

**Endpoint:** `POST /api/auth/signup`  
**Authentication:** Not required

### Request body

```json
{
	"name": "Jane Doe",
	"email": "jane@example.com",
	"password": "secret123"
}
```

### Success response — `201 Created`

```json
{
	"message": "Signup successful! Please verify your email.",
	"status": "success",
	"user": {
		"id": "6ae1ff0a01c1ae1bf4884cba",
		"name": "Jane Doe",
		"email": "jane@example.com",
		"verified": false
	}
}
```

### Validation and errors

- `400 Bad Request` — Required fields are missing or invalid.
- `409 Conflict` — An account already exists with the supplied email.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- `name`, `email`, and `password` are required.
- Email addresses are converted to lowercase.
- The documented minimum password length is six characters.
- Email verification is required before sign-in.

---

## 2.2 Verify Email

Verify the user's email address using the six-digit OTP sent by email.

**Endpoint:** `POST /api/auth/verify-email`  
**Authentication:** Not required

### Request body

```json
{
	"email": "jane@example.com",
	"otp": "123456"
}
```

### Success response — `200 OK`

```json
{
	"message": "Email verified successfully",
	"status": "success",
	"user": {
		"name": "Jane Doe",
		"email": "jane@example.com",
		"verified": true
	}
}
```

### Validation and errors

- `400 Bad Request` — Required fields are missing, the OTP format is invalid, or the OTP is invalid or expired.
- `404 Not Found` — The user does not exist.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- The OTP must contain exactly six digits.
- The OTP expires after three minutes.
- Verification attempts are limited by the server's security configuration.

---

## 2.3 Resend Verification Email

Send a new verification OTP to the user's email address.

**Endpoint:** `POST /api/auth/resend-verify-email`  
**Authentication:** Not required

### Request body

```json
{
	"email": "jane@example.com"
}
```

### Success response — `200 OK`

```json
{
	"message": "A new OTP has been sent",
	"status": "success"
}
```

### Validation and errors

- `400 Bad Request` — The email is missing or invalid.
- `200 OK` with `status: "failed"` — The user does not exist or the email is already verified.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- Requesting a new OTP invalidates the user's previous OTPs.
- The new OTP expires after three minutes.

---

## 2.4 Sign In

Authenticate a verified user using their email address and password.

**Endpoint:** `POST /api/auth/signin`  
**Authentication:** Not required

### Request body

```json
{
	"email": "jane@example.com",
	"password": "secret123"
}
```

### Success response — `200 OK`

```json
{
	"message": "User signed in successfully",
	"status": "success",
	"user": {
		"id": "6ae1ff0a01c1ae1bf4884cba",
		"name": "Jane Doe",
		"email": "jane@example.com",
		"verified": true
	},
	"accessToken": "<accessToken>"
}
```

The server also sets the `refreshToken` HTTP-only cookie.

### Validation and errors

- `400 Bad Request` — Required fields are missing or invalid.
- `401 Unauthorized` — The credentials are incorrect or the email has not been verified.
- `500 Internal Server Error` — An unexpected server error occurred.

### Token lifecycle

| Token         | Lifetime   | Purpose                                         |
| ------------- | ---------- | ----------------------------------------------- |
| Access token  | 15 minutes | Authorizes protected API requests               |
| Refresh token | 7 days     | Renews the access token and manages the session |

The refresh token is stored in an HTTP-only cookie rather than returned in the JSON response.

---

## 2.5 Refresh Access Token

Issue a new access token using the refresh-token cookie.

**Endpoint:** `POST /api/auth/refresh-token`  
**Authentication:** Valid refresh-token cookie required

### Request body

None.

### Success response — `200 OK`

```json
{
	"message": "Token refreshed successfully",
	"status": "success",
	"user": {
		"id": "6ae1ff0a01c1ae1bf4884cba",
		"username": "jane_doe",
		"email": "jane@example.com",
		"verified": true
	},
	"accessToken": "<newAccessToken>"
}
```

The server replaces the existing refresh-token cookie with a new one.

### Errors

- `401 Unauthorized` — The refresh token is missing, invalid, expired, or associated with an inactive session.
- `500 Internal Server Error` — An unexpected server error occurred.

---

## 2.6 Sign Out

Revoke the current session and clear the refresh-token cookie.

**Endpoint:** `POST /api/auth/signout`  
**Authentication:** Valid refresh-token cookie required

### Request body

None.

### Success response — `200 OK`

```json
{
	"message": "User signed out successfully",
	"status": "success"
}
```

### Errors

- `401 Unauthorized` — The refresh token is missing or invalid.
- `500 Internal Server Error` — An unexpected server error occurred.

---

## 2.7 Sign Out From All Devices

Revoke all active sessions belonging to the authenticated account.

**Endpoint:** `POST /api/auth/signout-all`  
**Authentication:** Valid refresh-token cookie required

### Request body

None.

### Success response — `200 OK`

```json
{
	"message": "Signed out from all devices successfully",
	"status": "success"
}
```

### Errors

- `401 Unauthorized` — The refresh token is missing or invalid.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- All active sessions belonging to the account are revoked.
- The current browser's refresh-token cookie is cleared.

### Cookie handling

For browser-based clients, configure the HTTP client to send cookies and configure the server's CORS settings to permit credentials for the intended frontend origin.

---

# 3. Account API

Account endpoints allow authenticated users to create bank accounts, retrieve their accounts, and check account balances.

All endpoints in this section require a valid access token.

## 3.1 Create Account

Create a new bank account for the authenticated user.

**Endpoint:** `POST /api/accounts/create-account`  
**Authentication:** Required

### Request body

None. The server associates the new account with the authenticated user.

### Success response — `201 Created`

```json
{
	"message": "Account created successfully",
	"status": "success",
	"account": {
		"id": "6ae2048701c1ae1bf4884cbe",
		"user": "6ae1ff0a01c1ae1bf4884cba",
		"status": "ACTIVE",
		"currency": "BDT"
	}
}
```

### Errors

- `401 Unauthorized` — Authentication is required.
- `400 Bad Request` — Account validation failed.
- `500 Internal Server Error` — An unexpected server error occurred.

---

## 3.2 Get All Accounts

Retrieve the bank accounts belonging to the authenticated user.

**Endpoint:** `GET /api/accounts`  
**Authentication:** Required

### Success response — `200 OK`

```json
{
	"message": "Fetched accounts successfully",
	"status": "success",
	"accounts": [
		{
			"_id": "6ae2048701c1ae1bf4884cbe",
			"user": "6ae1ff0a01c1ae1bf4884cba",
			"status": "ACTIVE",
			"currency": "BDT"
		}
	]
}
```

### Errors

- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- Only accounts belonging to the authenticated user are returned.
- A user may have multiple bank accounts.

---

## 3.3 Get Account Balance

Retrieve the current balance of an account owned by the authenticated user.

**Endpoint:** `GET /api/accounts/balance/:accountId`  
**Authentication:** Required

### Path parameter

| Parameter   | Description                                  |
| ----------- | -------------------------------------------- |
| `accountId` | ID of the account whose balance is requested |

### Example request

```http
GET /api/accounts/balance/6ae2048701c1ae1bf4884cbe
```

### Success response — `200 OK`

```json
{
	"message": "Account balance fetched",
	"status": "success",
	"balance": {
		"account": "6ae2048701c1ae1bf4884cbe",
		"currentBalance": 0
	}
}
```

### Errors

- `404 Not Found` — The account does not exist or does not belong to the authenticated user.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

The endpoint does not disclose whether an account exists when the account is not accessible to the authenticated user.

---

# 4. System API

## 4.1 Initial Fund

Deposit funds into a receiver's account through the system account.

This endpoint is intended for authorized system users, not ordinary users.

**Endpoint:** `POST /api/system/initial-fund`  
**Authentication:** Required; the authenticated user must have `systemUser: true`.

### Request body

```json
{
	"receiverAccountId": "6ae2048701c1ae1bf4884cbe",
	"amount": 5000,
	"idempotencyKey": "initial-deposit-unique-key-001"
}
```

### Success response — `201 Created`

```json
{
	"message": "Initial deposit completed successfully",
	"status": "success",
	"deposit": {
		"id": "6ae2051201c1ae1bf4884cbf",
		"receiverAccount": "6ae2048701c1ae1bf4884cbe",
		"amount": 5000,
		"idempotencyKey": "initial-deposit-unique-key-001",
		"status": "COMPLETED"
	}
}
```

### Validation and errors

- `400 Bad Request` — A required field is missing, the amount is invalid, the receiver account is invalid, the authenticated user is not an authorized system user, the system account is invalid, or an account is inactive.
- `400 Bad Request` with `status: "pending"` — The deposit could not be confirmed as completed.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- `receiverAccountId`, `amount`, and `idempotencyKey` are required.
- The minimum deposit amount is `1000`.
- The authenticated user must have `systemUser: true`.
- Both the system account and receiver account must have `ACTIVE` status.
- The system account and receiver account must be different.
- The operation creates a debit ledger entry for the system account and a credit ledger entry for the receiver account.
- The deposit and its ledger entries are processed within a MongoDB transaction.
- A successful deposit triggers a transaction alert email to the receiver. Email delivery failure does not change the successful deposit response.

### Idempotency

Use a unique `idempotencyKey` for each new deposit operation.

If the same key is submitted again, the server returns a response based on the existing transaction's status:

| Existing status | Response                                             |
| --------------- | ---------------------------------------------------- |
| `success`       | `200 OK`; the existing completed deposit is returned |
| `pending`       | `200 OK`; the existing deposit is pending            |
| `failed`        | `200 OK`; the existing deposit has failed            |
| `reversed`      | `200 OK`; the existing deposit has been reversed     |

**Important:** If an operation returns `pending`, check the existing transaction's status before attempting a new operation with another key. This helps prevent duplicate funding.

---

# 5. Transaction API

Transaction endpoints support account-to-account transfers, transaction history, and transaction details.

All endpoints in this section require a valid access token.

## 5.1 Create Transaction

Transfer funds from one bank account to another.

**Endpoint:** `POST /api/transactions/create-transaction`  
**Authentication:** Required

### Request body

```json
{
	"fromAccount": "6ae2048701c1ae1bf4884cbe",
	"toAccount": "6ae2051201c1ae1bf4884cbf",
	"amount": 1500,
	"idempotencyKey": "transaction-unique-key-001"
}
```

### Success response — `201 Created`

```json
{
	"message": "Transaction completed successfully",
	"status": "success",
	"transaction": {
		"id": "6ae205a901c1ae1bf4884cc0",
		"fromAccount": "6ae2048701c1ae1bf4884cbe",
		"toAccount": "6ae2051201c1ae1bf4884cbf",
		"amount": 1500,
		"idempotencyKey": "transaction-unique-key-001",
		"status": "COMPLETED"
	}
}
```

### Validation and errors

- `400 Bad Request` — A required field is missing, the amount is invalid, an account is invalid or inactive, both accounts are the same, or the source account has insufficient balance.
- `400 Bad Request` with `status: "pending"` — The transaction could not be confirmed as completed.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- `fromAccount`, `toAccount`, `amount`, and `idempotencyKey` are required.
- The minimum transfer amount is `100`.
- The authenticated user must own the source account specified by `fromAccount`.
- The destination account must exist and be active. It does not need to belong to the authenticated user.
- Both accounts must have `ACTIVE` status.
- The source account must have sufficient balance.
- The source and destination accounts must be different.
- The transfer and its debit and credit ledger entries are processed within a MongoDB transaction.
- A successful transfer triggers transaction alert emails for both the sender and receiver. Email delivery failure does not change the successful transaction response.

### Idempotency

Use a unique `idempotencyKey` for each new transfer.

When the same key is submitted again, the server responds according to the existing transaction's status:

| Existing status | Response                                                 |
| --------------- | -------------------------------------------------------- |
| `success`       | `200 OK`; the existing completed transaction is returned |
| `pending`       | `200 OK`; the existing transaction is pending            |
| `failed`        | `200 OK`; the existing transaction has failed            |
| `reversed`      | `200 OK`; the existing transaction has been reversed     |

If the transaction returns `pending`, check its status before retrying with a new idempotency key.

---

## 5.2 Get Transaction History

Retrieve paginated transaction history for all accounts belonging to the authenticated user.

**Endpoint:** `GET /api/transactions`  
**Authentication:** Required

### Query parameters

| Parameter | Type   | Default | Rules                        |
| --------- | ------ | ------- | ---------------------------- |
| `page`    | Number | `1`     | Must be a positive integer   |
| `limit`   | Number | `10`    | Must be between `1` and `50` |

### Example request

```http
GET /api/transactions?page=1&limit=10
```

### Success response — `200 OK`

```json
{
	"message": "Transaction history fetched successfully",
	"status": "success",
	"transactions": [
		{
			"id": "6ae205a901c1ae1bf4884cc0",
			"fromAccount": "6ae2048701c1ae1bf4884cbe",
			"toAccount": "6ae2051201c1ae1bf4884cbf",
			"amount": 1500,
			"status": "COMPLETED",
			"direction": "SENT",
			"createdAt": "2026-10-29T05:30:00.000Z"
		},
		{
			"id": "6ae206a901c1ae1bf4884cc1",
			"fromAccount": "6ae2051201c1ae1bf4884cbf",
			"toAccount": "6ae2048701c1ae1bf4884cbe",
			"amount": 500,
			"status": "COMPLETED",
			"direction": "RECEIVED",
			"createdAt": "2026-10-28T10:15:00.000Z"
		}
	],
	"pagination": {
		"currentPage": 1,
		"limit": 10,
		"totalTransactions": 2,
		"totalPages": 1,
		"hasNextPage": false,
		"hasPreviousPage": false
	}
}
```

### Errors

- `400 Bad Request` — The page or limit is invalid.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- Only transactions involving the authenticated user's accounts are returned.
- `direction` is `SENT` or `RECEIVED`, depending on the authenticated user's role in the transaction.
- Transactions are sorted by `createdAt` in descending order. The transaction ID is used as a secondary sort field when timestamps are equal.
- The response includes a `pagination` object with page information and navigation indicators.
- If no transactions exist, `transactions` is an empty array and `totalPages` is `0`.

---

## 5.3 Get Transaction Details

Retrieve details for a transaction involving an account owned by the authenticated user.

**Endpoint:** `GET /api/transactions/:transactionId`  
**Authentication:** Required

### Path parameter

| Parameter       | Description                       |
| --------------- | --------------------------------- |
| `transactionId` | ID of the transaction to retrieve |

### Example request

```http
GET /api/transactions/6ae205a901c1ae1bf4884cc0
```

### Success response — `200 OK`

```json
{
	"message": "Transaction details fetched successfully",
	"status": "success",
	"transaction": {
		"id": "6ae205a901c1ae1bf4884cc0",
		"amount": 1500,
		"status": "COMPLETED",
		"direction": "SENT",
		"fromAccount": {
			"id": "6ae2048701c1ae1bf4884cbe",
			"currency": "BDT",
			"ownerName": "Jane Doe"
		},
		"toAccount": {
			"id": "6ae2051201c1ae1bf4884cbf",
			"currency": "BDT",
			"ownerName": "John Smith"
		},
		"createdAt": "2026-10-29T05:30:00.000Z",
		"updatedAt": "2026-10-29T05:30:01.000Z",
		"idempotencyKey": "transaction-unique-key-001"
	}
}
```

### Errors

- `400 Bad Request` — The transaction ID is invalid.
- `404 Not Found` — The transaction does not exist or does not involve an account belonging to the authenticated user.
- `500 Internal Server Error` — An unexpected server error occurred.

### Rules

- The authenticated user can retrieve only transactions involving their own accounts, as sender or receiver.
- `direction` is `SENT` or `RECEIVED`.
- The `fromAccount` and `toAccount` objects include the account ID, currency, and owner's name.
- `createdAt` and `updatedAt` indicate when the transaction was created and last updated.
- The `idempotencyKey` is returned only to the sender. It is omitted for the receiver.
- The endpoint returns the same `404 Not Found` response for a nonexistent transaction and a transaction the user is not authorized to view. This avoids disclosing the existence of another user's transaction.

---

# 6. Endpoint Reference

| Method | Endpoint                               | Purpose                                | Authentication                         |
| ------ | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `POST` | `/api/auth/signup`                     | Register a user                        | Not required                           |
| `POST` | `/api/auth/verify-email`               | Verify email using OTP                 | Not required                           |
| `POST` | `/api/auth/resend-verify-email`        | Resend verification OTP                | Not required                           |
| `POST` | `/api/auth/signin`                     | Sign in                                | Not required                           |
| `POST` | `/api/auth/refresh-token`              | Renew access token                     | Refresh-token cookie                   |
| `POST` | `/api/auth/signout`                    | Revoke current session                 | Refresh-token cookie                   |
| `POST` | `/api/auth/signout-all`                | Revoke all sessions                    | Refresh-token cookie                   |
| `POST` | `/api/accounts/create-account`         | Create a bank account                  | Access token                           |
| `GET`  | `/api/accounts`                        | List the user's accounts               | Access token                           |
| `GET`  | `/api/accounts/balance/:accountId`     | Retrieve account balance               | Access token                           |
| `POST` | `/api/system/initial-fund`             | Fund a receiver account                | Access token and system-user privilege |
| `POST` | `/api/transactions/create-transaction` | Transfer funds between accounts        | Access token                           |
| `GET`  | `/api/transactions`                    | Retrieve paginated transaction history | Access token                           |
| `GET`  | `/api/transactions/:transactionId`     | Retrieve transaction details           | Access token                           |

---

# 7. Security and Operational Notes

- **Protect access tokens.** Send access tokens in the `Authorization` header and avoid exposing them in URLs or logs.
- **Protect refresh tokens.** Keep them in HTTP-only cookies and configure cookie, CORS, and credential settings appropriately for the deployment environment.
- **Use idempotency keys.** Supply a unique key for every new funding or transfer operation. Check the existing operation's status before retrying a pending transaction.
- **Enforce account ownership.** Account and transaction endpoints must restrict returned data to resources the authenticated user is authorized to access.
- **Preserve ledger consistency.** Transfers and initial funding use MongoDB transactions to process the transaction record and corresponding ledger entries together.
- **Handle notifications separately.** Email delivery failures do not change the success of a completed funding operation or transfer.
- **Validate pagination.** Transaction history supports positive page numbers and page sizes from `1` through `50`.
- **Use production configuration.** Replace the local base URL and configure secrets, cookie settings, CORS, database access, and rate limits for the deployment environment.

This documentation describes the API behavior reflected in the supplied documentation. Additional requirements may be enforced by route middleware, model validation, and server-wide configuration.