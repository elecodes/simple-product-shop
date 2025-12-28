import { calculateSubtotal } from './calculateSubtotal'
import type { CartItem } from '../types'

describe('calculateSubtotal', () => {
  it('returns 0 for empty cart', () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it('calculates subtotal for single item', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 2 }
    ]
    expect(calculateSubtotal(items)).toBe(20)
  })

  it('calculates subtotal for multiple items', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 2 },
      { product: { id: 2, name: 'B', price: 5, image: '', description: '' }, quantity: 3 }
    ]
    expect(calculateSubtotal(items)).toBe(35) // 20 + 15
  })
})