import { DiscountCalculator } from './DiscountCalculator'
import type { CartItem } from '../types'

const makeItem = (price: number, quantity: number): CartItem => ({
  product: { id: 1, name: 'Test', price, image: '', description: '' },
  quantity
})

describe('DiscountCalculator', () => {
  const calculator = new DiscountCalculator()

  it('returns 0 for empty cart', () => {
    expect(calculator.calculate([], 0)).toBe(0)
  })

  it('applies only bulk discount when applicable', () => {
    const items = [makeItem(10, 5)] // $50, bulk applies
    expect(calculator.calculate(items, 50)).toBe(5) // 10%
  })

  it('applies only order discount when applicable', () => {
    const items = [makeItem(50, 2)] // $100, no bulk (qty < 5), order applies
    expect(calculator.calculate(items, 100)).toBe(15) // 15%
  })

  it('applies both discounts when both applicable', () => {
    const items = [makeItem(25, 5)] // $125, bulk AND order apply
    // Bulk: $125 * 10% = $12.50
    // Order: ($125 - $12.50) * 15% = $16.875
    // Total: $29.375
    expect(calculator.calculate(items, 125)).toBeCloseTo(29.375, 2)
  })

  it('returns discount breakdown', () => {
    const items = [makeItem(25, 5)] // $125
    const breakdown = calculator.getBreakdown(items, 125)
    expect(breakdown).toHaveLength(2)
    expect(breakdown[0].name).toBe('Bulk Discount')
    expect(breakdown[1].name).toBe('Order Discount')
  })
})