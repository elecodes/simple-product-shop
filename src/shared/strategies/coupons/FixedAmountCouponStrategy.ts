import type { CartItem } from '../../types'
import type { CouponStrategy } from '../CouponStrategy'

export class FixedAmountCouponStrategy implements CouponStrategy {
  readonly code: string
  readonly name: string
  readonly description: string
  readonly type = 'fixed' as const

  private readonly amount: number

  constructor(config: { code: string; name: string; description: string; amount: number }) {
    this.code = config.code
    this.name = config.name
    this.description = config.description
    this.amount = config.amount
  }

  isValid(_items: CartItem[], subtotal: number): boolean {
    return subtotal > 0
  }

  calculate(_items: CartItem[], _subtotal: number): number {
    return this.amount
  }
}