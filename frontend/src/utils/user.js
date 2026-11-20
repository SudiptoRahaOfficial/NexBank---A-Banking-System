// The backend docs are inconsistent: refresh returns `username`,
// signup/signin return `name`, and lists use `_id`. We normalize once here
// so no component ever has to care.
export const normalizeUser = (raw) => {
	if (!raw) return null

	return {
		id: raw.id ?? raw._id,
		name: raw.name ?? raw.username ?? '',
		email: raw.email,
		verified: Boolean(raw.verified),
		// Not in the documented responses yet. Needs the backend change below.
		systemUser: Boolean(raw.systemUser),
	}
}