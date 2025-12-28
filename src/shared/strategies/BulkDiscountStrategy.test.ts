import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import type { CartItem } from '../types'
import { businessRules } from '../constants/businessRules'

describe('BulkDiscountStrategy', () => {
  const strategy = new BulkDiscountStrategy()

  it('has correct name and description', () => {
    expect(strategy.name).toBe('Bulk Discount')
    expect(strategy.description).toBe('10% off when purchasing 5 or more items')
  })

  it('is not applicable for less than 5 items', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 4 }
    ]
    expect(strategy.isApplicable(items, 40)).toBe(false)
  })

  it('is applicable for 5 or more items', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 5 }
    ]
    expect(strategy.isApplicable(items, 50)).toBe(true)
  })

  it('calculates 0 discount when not applicable', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 4 }
    ]
    expect(strategy.calculate(items, 40)).toBe(0)
  })

  it('calculates 10% discount when applicable', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 5 }
    ]
    const subtotal = 50
    const expectedDiscount = subtotal * businessRules.bulkDiscount.percentage
    expect(strategy.calculate(items, subtotal)).toBe(expectedDiscount)
  })

  it('works with multiple items totaling 5+', () => {
    const items: CartItem[] = [
      { product: { id: 1, name: 'A', price: 10, image: '', description: '' }, quantity: 3 },
      { product: { id: 2, name: 'B', price: 5, image: '', description: '' }, quantity: 2 }
    ]
    const subtotal = 40 // 3*10 + 2*5
    expect(strategy.isApplicable(items, subtotal)).toBe(true)
    const expectedDiscount = subtotal * businessRules.bulkDiscount.percentage
    expect(strategy.calculate(items, subtotal)).toBe(expectedDiscount)
  })
})