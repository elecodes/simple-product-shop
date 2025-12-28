import type { CartItem } from '@/shared/types'
import { businessRules } from '@/shared/constants/businessRules'

export const calculateBulkDiscount = (items: CartItem[]): number => {
  return items.reduce((totalDiscount, item) => {
    if (item.quantity >= businessRules.bulkDiscount.threshold) {
      return totalDiscount + (item.product.price * item.quantity * businessRules.bulkDiscount.percentage)
    }
    return totalDiscount
  }, 0)
}