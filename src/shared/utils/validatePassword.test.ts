import { validatePassword } from './validatePassword'

describe('validatePassword', () => {
  describe('length', () => {
    it('fails for < 12 characters', () => {
      const result = validatePassword('Short1!')
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('At least 12 characters')
    })

    it('passes for >= 12 characters', () => {
      const result = validatePassword('ValidPass123!')
      expect(result.errors).not.toContain('At least 12 characters')
    })
  })

  describe('uppercase', () => {
    it('fails without uppercase', () => {
      const result = validatePassword('nouppercase123!')
      expect(result.errors).toContain('At least one uppercase letter')
    })
  })

  describe('lowercase', () => {
    it('fails without lowercase', () => {
      const result = validatePassword('NOLOWERCASE123!')
      expect(result.errors).toContain('At least one lowercase letter')
    })
  })

  describe('number', () => {
    it('fails without number', () => {
      const result = validatePassword('NoNumbersHere!')
      expect(result.errors).toContain('At least one number')
    })
  })

  describe('special character', () => {
    it('fails without special character', () => {
      const result = validatePassword('NoSpecialChar123')
      expect(result.errors).toContain('At least one special character')
    })
  })

  describe('strength', () => {
    it('returns weak for invalid', () => {
      expect(validatePassword('weak').strength).toBe('weak')
    })

    it('returns medium for valid 12-15 chars', () => {
      expect(validatePassword('ValidPass123!').strength).toBe('medium')
    })

    it('returns strong for valid 16+ chars', () => {
      expect(validatePassword('VeryStrongPass123!').strength).toBe('strong')
    })
  })

  describe('valid password', () => {
    it('passes all rules', () => {
      const result = validatePassword('MySecurePass123!')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })
})