import { calculateDiscountCoupon } from './calculateDiscountCoupon'
import type { CartItem } from '../types'
import { CouponRegistry } from '../strategies/CouponRegistry'

describe('calculateDiscountCoupon', () => {
  const makeItem = (price: number, quantity: number): CartItem => ({
    product: { id: 1, name: 'Test Product', price, image: '', description: '' },
    quantity
  })

  const TEST_SUBTOTAL = 100
  const VALID_COUPON = 'SAVE10'
  const INVALID_COUPON = 'INVALID'

  beforeAll(() => {
    // Initialize registry with test coupons
    const registry = CouponRegistry.getInstance()
    registry.register({
      code: 'SAVE10',
      name: '10% Off',
      description: 'Save 10%',
      type: 'percentage',
      value: 0.1
    })
  })

  it('returns 0 discount for invalid coupon', () => {
    const items = [makeItem(10, 10)]
    expect(calculateDiscountCoupon(items, TEST_SUBTOTAL, INVALID_COUPON)).toBe(0)
  })

  it('returns 0 discount for empty coupon', () => {
    const items = [makeItem(10, 10)]
    expect(calculateDiscountCoupon(items, TEST_SUBTOTAL, '')).toBe(0)
  })

  it('calculates 10% discount for SAVE10 coupon', () => {
    const items = [makeItem(10, 10)]
    expect(calculateDiscountCoupon(items, TEST_SUBTOTAL, VALID_COUPON)).toBe(10)
  })

  it('applies coupon discount only once regardless of items', () => {
    const items = [makeItem(10, 5), makeItem(20, 3)]
    expect(calculateDiscountCoupon(items, TEST_SUBTOTAL, VALID_COUPON)).toBe(10)
  })
})