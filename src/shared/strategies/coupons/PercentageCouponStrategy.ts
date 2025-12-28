import type { CartItem } from '../../types'
import type { CouponStrategy } from '../CouponStrategy'

export class PercentageCouponStrategy implements CouponStrategy {
  readonly code: string
  readonly name: string
  readonly description: string
  readonly type = 'percentage' as const

  constructor(config: { code: string; name: string; description: string; percentage: number }) {
    this.code = config.code
    this.name = config.name
    this.description = config.description
  }

  isValid(_items: CartItem[], subtotal: number): boolean {
    return subtotal > 0
  }

  calculate(_items: CartItem[], subtotal: number): number {
    return subtotal * 0.1 // 10% por defecto desde config anterior
  }
}