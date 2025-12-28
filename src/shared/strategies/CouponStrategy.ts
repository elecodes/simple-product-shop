import type { CartItem } from '../types'

export interface CouponStrategy {
  readonly code: string
  readonly name: string
  readonly description: string
  readonly type: 'percentage' | 'fixed' | 'conditional'
  
  isValid(items: CartItem[], subtotal: number): boolean
  calculate(items: CartItem[], subtotal: number): number
}

export interface CouponConfig {
  code: string
  name: string
  description: string
  type: 'percentage' | 'fixed' | 'conditional'
  value: number
  conditions?: {
    minAmount?: number
    maxAmount?: number
    minItems?: number
    maxItems?: number
    validProducts?: number[]
  }
}