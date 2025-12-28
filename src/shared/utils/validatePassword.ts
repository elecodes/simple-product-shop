interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
  strength: 'weak' | 'medium' | 'strong'
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = []

  // Check length
  if (password.length < 12) {
    errors.push('At least 12 characters')
  }

  // Check uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push('At least one uppercase letter')
  }

  // Check lowercase
  if (!/[a-z]/.test(password)) {
    errors.push('At least one lowercase letter')
  }

  // Check number
  if (!/\d/.test(password)) {
    errors.push('At least one number')
  }

  // Check special character
  if (!/[!@#$%^&*()_+\-=[\]{};"\\|,.<>?/]/.test(password)) {
    errors.push('At least one special character')
  }

  const isValid = errors.length === 0

  let strength: 'weak' | 'medium' | 'strong' = 'weak'
  if (isValid) {
    if (password.length >= 16) {
      strength = 'strong'
    } else {
      strength = 'medium'
    }
  }

  return { isValid, errors, strength }
}