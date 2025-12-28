import { useState } from 'react'
import type { DiscountCouponInputProps } from '../types'

export const DiscountCouponInput = ({ onApply }: DiscountCouponInputProps) => {
  const [couponCode, setCouponCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.trim()) {
      onApply(couponCode.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className="flex gap-2">
        <input
          id="coupon-input"
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      <button
        onClick={handleSubmit}
        disabled={!couponCode.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Apply
      </button>
    </div>
  )
}