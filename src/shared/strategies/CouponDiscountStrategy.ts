import type { CartItem } from '../types'
import type { DiscountStrategy } from './DiscountStrategy'
import { calculateDiscountCoupon } from '../utils/calculateDiscountCoupon'

export class CouponDiscountStrategy implements DiscountStrategy {
  name = 'Coupon Discount'
  description = 'Apply coupon code discount'
  private couponCode: string

  constructor(couponCode: string = '') {
    this.couponCode = couponCode
  }

  setCouponCode(couponCode: string): void {
    this.couponCode = couponCode
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isApplicable(_items: CartItem[], _subtotal: number): boolean {
    return !!this.couponCode
  }

  calculate(items: CartItem[], subtotal: number): number {
    return calculateDiscountCoupon(items, subtotal, this.couponCode)
  }
}