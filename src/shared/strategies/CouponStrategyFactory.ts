import type { CouponStrategy, CouponConfig } from './CouponStrategy'
import { PercentageCouponStrategy } from './coupons/PercentageCouponStrategy'
import { FixedAmountCouponStrategy } from './coupons/FixedAmountCouponStrategy'
import { ConditionalCouponStrategy } from './coupons/ConditionalCouponStrategy'

export class CouponStrategyFactory {
  static create(config: CouponConfig): CouponStrategy {
    switch (config.type) {
      case 'percentage':
        return new PercentageCouponStrategy({
          code: config.code,
          name: config.name,
          description: config.description,
          percentage: config.value
        })
      
      case 'fixed':
        return new FixedAmountCouponStrategy({
          code: config.code,
          name: config.name,
          description: config.description,
          amount: config.value
        })
      
      case 'conditional':
        return new ConditionalCouponStrategy({
          code: config.code,
          name: config.name,
          description: config.description,
          minAmount: config.conditions?.minAmount || 0,
          discountValue: config.value
        })
      
      default:
        throw new Error(`Unsupported coupon type: ${config.type}`)
    }
  }
}