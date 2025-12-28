import type { CartItem } from '../types'
import { BulkDiscountStrategy } from './BulkDiscountStrategy'
import { OrderDiscountStrategy } from './OrderDiscountStrategy'
import { EnhancedCouponDiscountStrategy } from './EnhancedCouponDiscountStrategy'
import type { DiscountStrategy } from './DiscountStrategy'

interface DiscountBreakdownItem {
  name: string
  amount: number
}

export class DiscountCalculator {
  private strategies: DiscountStrategy[] = [
    new BulkDiscountStrategy(),
    new OrderDiscountStrategy(),
    new EnhancedCouponDiscountStrategy()
  ]

  calculate(items: CartItem[], subtotal: number, couponCode: string = ''): number {
    let remainingSubtotal = subtotal
    let totalDiscount = 0

    for (const strategy of this.strategies) {
      // Handle coupon strategy separately
      const isApplicable = strategy.name === 'Coupon Discount' 
        ? (strategy as EnhancedCouponDiscountStrategy).isApplicable(items, remainingSubtotal, couponCode)
        : strategy.isApplicable(items, remainingSubtotal)
      
      if (isApplicable) {
        const discount = strategy.name === 'Coupon Discount'
          ? (strategy as EnhancedCouponDiscountStrategy).calculate(items, remainingSubtotal, couponCode)
          : strategy.calculate(items, remainingSubtotal)
        
        totalDiscount += discount
        remainingSubtotal -= discount
      }
    }

    return totalDiscount
  }

  getBreakdown(items: CartItem[], subtotal: number, couponCode: string = ''): DiscountBreakdownItem[] {
    const breakdown: DiscountBreakdownItem[] = []
    let remainingSubtotal = subtotal

    for (const strategy of this.strategies) {
      // Handle coupon strategy separately
      const isApplicable = strategy.name === 'Coupon Discount' 
        ? (strategy as EnhancedCouponDiscountStrategy).isApplicable(items, remainingSubtotal, couponCode)
        : strategy.isApplicable(items, remainingSubtotal)
      
      if (isApplicable) {
        const discount = strategy.name === 'Coupon Discount'
          ? (strategy as EnhancedCouponDiscountStrategy).calculate(items, remainingSubtotal, couponCode)
          : strategy.calculate(items, remainingSubtotal)
        
        breakdown.push({
          name: strategy.name,
          amount: discount
        })
        remainingSubtotal -= discount
      }
    }

    return breakdown
  }
}