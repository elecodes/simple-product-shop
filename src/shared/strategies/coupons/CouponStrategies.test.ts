import { describe, it, expect } from 'vitest'
import { PercentageCouponStrategy } from './PercentageCouponStrategy'
import { FixedAmountCouponStrategy } from './FixedAmountCouponStrategy'
import { ConditionalCouponStrategy } from './ConditionalCouponStrategy'
import { CouponStrategyFactory } from '../CouponStrategyFactory'
import { CouponRegistry } from '../CouponRegistry'
import type { CartItem } from '../../types'

describe('Coupon Strategies', () => {
  const makeItem = (price: number, quantity: number): CartItem => ({
    product: { id: 1, name: 'Test Product', price, image: '', description: '' },
    quantity
  })

  describe('PercentageCouponStrategy', () => {
    it('should create percentage coupon', () => {
      const coupon = new PercentageCouponStrategy({
        code: 'SAVE20',
        name: '20% Off',
        description: 'Save 20%',
        percentage: 0.2
      })

      expect(coupon.code).toBe('SAVE20')
      expect(coupon.type).toBe('percentage')
    })

    it('should calculate percentage discount', () => {
      const coupon = new PercentageCouponStrategy({
        code: 'SAVE10',
        name: '10% Off',
        description: 'Save 10%',
        percentage: 0.1
      })

      const items = [makeItem(100, 1)]
      expect(coupon.calculate(items, 100)).toBe(10)
    })

    it('should be valid for positive subtotal', () => {
      const coupon = new PercentageCouponStrategy({
        code: 'SAVE10',
        name: '10% Off',
        description: 'Save 10%',
        percentage: 0.1
      })

      expect(coupon.isValid([], 100)).toBe(true)
      expect(coupon.isValid([], 0)).toBe(false)
    })
  })

  describe('FixedAmountCouponStrategy', () => {
    it('should create fixed amount coupon', () => {
      const coupon = new FixedAmountCouponStrategy({
        code: 'SAVE20',
        name: '$20 Off',
        description: 'Save $20',
        amount: 20
      })

      expect(coupon.code).toBe('SAVE20')
      expect(coupon.type).toBe('fixed')
    })

    it('should calculate fixed discount', () => {
      const coupon = new FixedAmountCouponStrategy({
        code: 'SAVE20',
        name: '$20 Off',
        description: 'Save $20',
        amount: 20
      })

      const items = [makeItem(100, 1)]
      expect(coupon.calculate(items, 100)).toBe(20)
    })
  })

  describe('ConditionalCouponStrategy', () => {
    it('should create conditional coupon', () => {
      const coupon = new ConditionalCouponStrategy({
        code: 'WELCOME15',
        name: 'Welcome Discount',
        description: '$15 off for orders over $50',
        minAmount: 50,
        discountValue: 15
      })

      expect(coupon.code).toBe('WELCOME15')
      expect(coupon.type).toBe('conditional')
    })

    it('should be valid only when conditions are met', () => {
      const coupon = new ConditionalCouponStrategy({
        code: 'WELCOME15',
        name: 'Welcome Discount',
        description: '$15 off for orders over $50',
        minAmount: 50,
        discountValue: 15
      })

      expect(coupon.isValid([], 60)).toBe(true)
      expect(coupon.isValid([], 40)).toBe(false)
    })

    it('should calculate discount only when valid', () => {
      const coupon = new ConditionalCouponStrategy({
        code: 'WELCOME15',
        name: 'Welcome Discount',
        description: '$15 off for orders over $50',
        minAmount: 50,
        discountValue: 15
      })

      expect(coupon.calculate([], 60)).toBe(15)
      expect(coupon.calculate([], 40)).toBe(0)
    })
  })

  describe('CouponStrategyFactory', () => {
    it('should create percentage strategy', () => {
      const config = {
        code: 'SAVE10',
        name: '10% Off',
        description: 'Save 10%',
        type: 'percentage' as const,
        value: 0.1
      }

      const strategy = CouponStrategyFactory.create(config)
      expect(strategy.type).toBe('percentage')
    })

    it('should create fixed strategy', () => {
      const config = {
        code: 'SAVE20',
        name: '$20 Off',
        description: 'Save $20',
        type: 'fixed' as const,
        value: 20
      }

      const strategy = CouponStrategyFactory.create(config)
      expect(strategy.type).toBe('fixed')
    })

    it('should create conditional strategy', () => {
      const config = {
        code: 'WELCOME15',
        name: 'Welcome Discount',
        description: '$15 off for orders over $50',
        type: 'conditional' as const,
        value: 15,
        conditions: { minAmount: 50 }
      }

      const strategy = CouponStrategyFactory.create(config)
      expect(strategy.type).toBe('conditional')
    })
  })

  describe('CouponRegistry', () => {
    let registry: CouponRegistry

    beforeEach(() => {
      registry = CouponRegistry.getInstance()
      registry.clear()
    })

    it('should register and retrieve coupons', () => {
      const config = {
        code: 'TEST10',
        name: 'Test Coupon',
        description: 'Test description',
        type: 'percentage' as const,
        value: 0.1
      }

      registry.register(config)
      const coupon = registry.getCoupon('TEST10')

      expect(coupon).toBeDefined()
      expect(coupon?.code).toBe('TEST10')
    })

    it('should validate coupon codes', () => {
      const config = {
        code: 'TEST10',
        name: 'Test Coupon',
        description: 'Test description',
        type: 'percentage' as const,
        value: 0.1
      }

      registry.register(config)
      expect(registry.isValidCoupon('TEST10')).toBe(true)
      expect(registry.isValidCoupon('INVALID')).toBe(false)
    })
  })
})