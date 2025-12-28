import { OrderDiscountStrategy } from './OrderDiscountStrategy'
import type { CartItem } from '../types'

const makeItem = (price: number, quantity: number): CartItem => ({
  product: { id: 1, name: 'Test', price, image: '', description: '' },
  quantity
})

describe('OrderDiscountStrategy', () => {
  const strategy = new OrderDiscountStrategy()

  it('has correct name', () => {
    expect(strategy.name).toBe('Order Discount')
  })

  it('is not applicable for subtotal < $100', () => {
    expect(strategy.isApplicable([makeItem(10, 5)], 50)).toBe(false)
  })

  it('is applicable for subtotal >= $100', () => {
    expect(strategy.isApplicable([makeItem(50, 2)], 100)).toBe(true)
  })

  it('calculates 15% discount', () => {
    expect(strategy.calculate([makeItem(50, 2)], 100)).toBe(15)
  })

  it('returns 0 when not applicable', () => {
    expect(strategy.calculate([makeItem(10, 5)], 50)).toBe(0)
  })
})