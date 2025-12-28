import { describe, it, expect } from 'vitest'
import { calculateDiscountedTotal } from '../discounts'

describe('Discounts', () => {
  it('applies 10% bulk discount for items with 5+ quantity', () => {
    const items = [
      { product: { id: 1, name: 'Test', price: 20, image: '', description: '' }, quantity: 5 },
    ]
    expect(calculateDiscountedTotal(items)).toBe(90) // 100 - 10% = 90
  })

  it('applies 15% order discount for total >= $100', () => {
    const items = [
      { product: { id: 1, name: 'Test', price: 20, image: '', description: '' }, quantity: 6 },
    ]
    expect(calculateDiscountedTotal(items)).toBeCloseTo(91.8) // 120 * 0.9 = 108, then 108 * 0.85 = 91.8
  })

  it('combines bulk and order discounts correctly', () => {
    const items = [
      { product: { id: 1, name: 'Test', price: 20, image: '', description: '' }, quantity: 5 },
      { product: { id: 2, name: 'Test2', price: 20, image: '', description: '' }, quantity: 1 },
    ]
    expect(calculateDiscountedTotal(items)).toBeCloseTo(93.5) // 90 + 20 = 110, 110 * 0.85 = 93.5
  })

  it('combines bulk and order discounts correctly', () => {
    // Test combination
  })

  it('no discount for small quantities and low total', () => {
    const items = [
      { product: { id: 1, name: 'Test', price: 20, image: '', description: '' }, quantity: 2 },
    ]
    expect(calculateDiscountedTotal(items)).toBe(40)
  })
})