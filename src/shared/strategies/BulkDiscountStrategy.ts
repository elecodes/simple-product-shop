import type { CartItem } from '../types'
import type { DiscountStrategy } from './DiscountStrategy'
import { businessRules } from '../constants/businessRules'

export class BulkDiscountStrategy implements DiscountStrategy {
  name = 'Bulk Discount'
  description = '10% off when purchasing 5 or more items'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isApplicable(items: CartItem[], _subtotal: number): boolean {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    return totalQuantity >= businessRules.bulkDiscount.threshold
  }

  calculate(items: CartItem[], subtotal: number): number {
    if (!this.isApplicable(items, subtotal)) {
      return 0
    }
    return subtotal * businessRules.bulkDiscount.percentage
  }
}