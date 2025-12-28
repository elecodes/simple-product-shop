import React, { useState } from 'react'
import { validatePassword } from '@/shared/utils/validatePassword'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  showRequirements: boolean
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, showRequirements }) => {
  const [showPassword, setShowPassword] = useState(false)
  const validation = showRequirements ? validatePassword(value) : null

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'strong': return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  const getCheckmark = (isValid: boolean) => isValid ? '✓' : '✗'
  const getErrorColor = (isValid: boolean) => isValid ? 'text-green-600' : 'text-red-600'

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Password"
          className="w-full px-3 py-2 border rounded-md pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Show"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {showRequirements && validation && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span>Strength:</span>
            <div className={`px-2 py-1 rounded text-white text-sm ${getStrengthColor(validation.strength)}`}>
              {validation.strength}
            </div>
          </div>

          <ul className="space-y-1 text-sm">
            <li className={getErrorColor(value.length >= 12)}>
              {getCheckmark(value.length >= 12)} At least 12 characters
            </li>
            <li className={getErrorColor(/[A-Z]/.test(value))}>
              {getCheckmark(/[A-Z]/.test(value))} At least one uppercase letter
            </li>
            <li className={getErrorColor(/[a-z]/.test(value))}>
              {getCheckmark(/[a-z]/.test(value))} At least one lowercase letter
            </li>
            <li className={getErrorColor(/\d/.test(value))}>
              {getCheckmark(/\d/.test(value))} At least one number
            </li>
            <li className={getErrorColor(/[!@#$%^&*()_+\-=[\]{};"\\|,.<>?/]/.test(value))}>
              {getCheckmark(/[!@#$%^&*()_+\-=[\]{};"\\|,.<>?/]/.test(value))} At least one special character
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}