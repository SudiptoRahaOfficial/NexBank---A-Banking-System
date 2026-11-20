// Keeps the access token in a module-level variable (memory only).
// It is NOT in localStorage/sessionStorage, so XSS cannot read it from storage,
// and it disappears on reload. The refresh-token cookie restores it.

let accessToken = null

// Listeners let React (AuthContext) react when the session is cleared
// by the interceptor, e.g. after a failed refresh.
let onSessionExpired = null

export const tokenManager = {
	getToken() {
		return accessToken
	},

	setToken(token) {
		accessToken = token
	},

	clearToken() {
		accessToken = null
	},

	// AuthContext registers a callback here in Step 2
	setSessionExpiredHandler(handler) {
		onSessionExpired = handler
	},

	notifySessionExpired() {
		if (onSessionExpired) onSessionExpired()
	},
}