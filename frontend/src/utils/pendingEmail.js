// The email isn't secret, but putting it in the URL leaks it into
// browser history, analytics, and server logs. sessionStorage is
// per-tab and survives a refresh. Tokens never go here.
const KEY = 'nexbank.pendingEmail'

export const pendingEmail = {
	get() {
		try {
			return sessionStorage.getItem(KEY) || ''
		} catch {
			return ''
		}
	},
	set(email) {
		try {
			sessionStorage.setItem(KEY, email)
		} catch {}
	},
	clear() {
		try {
			sessionStorage.removeItem(KEY)
		} catch {}
	},
}