import type { CartItem } from '../types'
import type { DiscountStrategy } from './DiscountStrategy'
import { businessRules } from '../constants/businessRules'

export class OrderDiscountStrategy implements DiscountStrategy {
  name = 'Order Discount'
  description = `${businessRules.orderDiscount.percentage * 100}% off orders over $${businessRules.orderDiscount.threshold}`

  isApplicable(_items: CartItem[], subtotal: number): boolean {
    return subtotal >= businessRules.orderDiscount.threshold
  }

  calculate(_items: CartItem[], subtotal: number): number {
    if (!this.isApplicable(_items, subtotal)) {
      return 0
    }
    return subtotal * businessRules.orderDiscount.percentage
  }
}