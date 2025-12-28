import type { CartItem } from '@/shared/types'
import { businessRules } from '@/shared/constants/businessRules'

export const calculateDiscountedTotal = (items: CartItem[]): number => {
  let total = 0
  for (const item of items) {
    let itemTotal = item.product.price * item.quantity
    if (item.quantity >= businessRules.bulkDiscount.threshold) {
      itemTotal *= (1 - businessRules.bulkDiscount.percentage)
    }
    total += itemTotal
  }
  if (total >= businessRules.orderDiscount.threshold) {
    total *= (1 - businessRules.orderDiscount.percentage)
  }
  return total
}