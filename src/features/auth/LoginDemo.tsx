import React, { useState, useEffect } from 'react'
import { PasswordInput } from './components/PasswordInput'
import { validatePassword } from '@/shared/utils/validatePassword'
import * as Sentry from '@sentry/react'

export const LoginDemo: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null)

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordValidation = validatePassword(password)
  const isFormValid = isValidEmail(email) && passwordValidation.isValid

  useEffect(() => {
    if (blockedUntil) {
      const timer = setTimeout(() => {
        setIsBlocked(false)
        setBlockedUntil(null)
        setAttempts(0)
      }, blockedUntil - Date.now())
      return () => clearTimeout(timer)
    }
  }, [blockedUntil])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isBlocked) return

    setErrorMessage('')

    if (email === 'demo@example.com' && passwordValidation.isValid) {
      setSuccessMessage(`Welcome, ${email}!`)
      setAttempts(0)
      Sentry.setUser({
        email: email,
        id: 'demo-user-123',
      })
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setErrorMessage('Invalid credentials')
      if (newAttempts >= 3) {
        setIsBlocked(true)
        setBlockedUntil(Date.now() + 30000) // 30 seconds
      }
    }
  }

  if (successMessage) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-600 mb-4">{successMessage}</h2>
        <p>You have successfully logged in.</p>
      </div>
    )
  }

  if (isBlocked) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Too many attempts</h2>
        <p>Please try again in 30 seconds.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </span>
          <PasswordInput
            value={password}
            onChange={setPassword}
            showRequirements={true}
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}