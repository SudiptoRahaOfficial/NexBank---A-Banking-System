const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const OTP_REGEX = /^\d{6}$/

export const validateEmail = (email) => {
	if (!email.trim()) return 'Email is required.'
	if (!EMAIL_REGEX.test(email.trim())) return 'Enter a valid email address.'
	return ''
}

export const validatePassword = (password) => {
	if (!password) return 'Password is required.'
	if (password.length < 6) return 'Password must be at least 6 characters.'
	return ''
}

export const validateSignup = ({ name, email, password }) => {
	const errors = {}
	if (!name.trim()) errors.name = 'Name is required.'
	const emailError = validateEmail(email)
	if (emailError) errors.email = emailError
	const passwordError = validatePassword(password)
	if (passwordError) errors.password = passwordError
	return errors
}

export const validateSignin = ({ email, password }) => {
	const errors = {}
	const emailError = validateEmail(email)
	if (emailError) errors.email = emailError
	if (!password) errors.password = 'Password is required.'
	return errors
}

export const validateOtp = (otp) =>
	OTP_REGEX.test(otp) ? '' : 'Enter the 6-digit code.'