import { calculateBulkDiscount } from './calculateBulkDiscount'
import { CartItem } from '../../types'

describe('calculateBulkDiscount', () => {
  const makeItem = (price: number, quantity: number): CartItem => ({
    product: { id: 1, name: 'Test', price, image: '', description: '' },
    quantity
  })

  it('returns 0 for less than 5 items', () => {
    expect(calculateBulkDiscount([makeItem(10, 4)])).toBe(0)
  })

  it('calculates 10% discount for 5 items', () => {
    expect(calculateBulkDiscount([makeItem(10, 5)])).toBe(5) // $50 * 10% = $5
  })

  it('calculates 10% discount for 10 items', () => {
    expect(calculateBulkDiscount([makeItem(10, 10)])).toBe(10) // $100 * 10% = $10
  })

  it('only applies to items with 5+ quantity', () => {
    const items = [makeItem(10, 3), makeItem(20, 5)] // Solo el segundo aplica
    expect(calculateBulkDiscount(items)).toBe(10) // $100 * 10% = $10
  })
})