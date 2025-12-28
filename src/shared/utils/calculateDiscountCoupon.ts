import type { CartItem } from '@/shared/types'
import { CouponRegistry } from '@/shared/strategies/CouponRegistry'

export const calculateDiscountCoupon = (
  items: CartItem[],
  subtotal: number,
  couponCode: string
): number => {
  if (!couponCode) {
    return 0
  }

  const couponRegistry = CouponRegistry.getInstance()
  const coupon = couponRegistry.getCoupon(couponCode)
  
  if (!coupon || !coupon.isValid(items, subtotal)) {
    return 0
  }

  return coupon.calculate(items, subtotal)
}