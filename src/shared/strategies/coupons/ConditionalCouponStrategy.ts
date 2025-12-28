import type { CartItem } from '../../types'
import type { CouponStrategy } from '../CouponStrategy'

export class ConditionalCouponStrategy implements CouponStrategy {
  readonly code: string
  readonly name: string
  readonly description: string
  readonly type = 'conditional' as const
  private readonly minAmount: number
  private readonly discountValue: number

  constructor(config: {
    code: string
    name: string
    description: string
    minAmount: number
    discountValue: number
  }) {
    this.code = config.code
    this.name = config.name
    this.description = config.description
    this.minAmount = config.minAmount
    this.discountValue = config.discountValue
  }

  isValid(_items: CartItem[], subtotal: number): boolean {
    return subtotal >= this.minAmount
  }

  calculate(_items: CartItem[], subtotal: number): number {
    if (!this.isValid(_items, subtotal)) {
      return 0
    }
    return this.discountValue
  }
}