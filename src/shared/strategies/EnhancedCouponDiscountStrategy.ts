import type { CartItem } from '../types'
import type { DiscountStrategy } from './DiscountStrategy'
import { CouponRegistry } from './CouponRegistry'

export class EnhancedCouponDiscountStrategy implements DiscountStrategy {
  name = 'Coupon Discount'
  description = 'Apply coupon code discount using Strategy Pattern'
  private readonly couponRegistry: CouponRegistry

  constructor() {
    this.couponRegistry = CouponRegistry.getInstance()
    this.initializeCoupons()
  }

  private initializeCoupons(): void {
    import('@/shared/constants/businessRules').then(({ businessRules }) => {
      this.couponRegistry.registerMultiple([...businessRules.coupons])
    })
  }

  isApplicable(_items: CartItem[], _subtotal: number, couponCode: string = ''): boolean {
    return !!couponCode && this.couponRegistry.isValidCoupon(couponCode)
  }

  calculate(items: CartItem[], subtotal: number, couponCode: string = ''): number {
    if (!this.isApplicable(items, subtotal, couponCode)) {
      return 0
    }

    const coupon = this.couponRegistry.getCoupon(couponCode)
    if (!coupon || !coupon.isValid(items, subtotal)) {
      return 0
    }

    return coupon.calculate(items, subtotal)
  }
}