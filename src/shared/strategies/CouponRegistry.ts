import type { CouponStrategy } from './CouponStrategy'
import type { CouponConfig } from './CouponStrategy'
import { CouponStrategyFactory } from './CouponStrategyFactory'

export class CouponRegistry {
  private static instance: CouponRegistry
  private readonly strategies = new Map<string, CouponStrategy>()

  private constructor() {}

  static getInstance(): CouponRegistry {
    if (!CouponRegistry.instance) {
      CouponRegistry.instance = new CouponRegistry()
    }
    return CouponRegistry.instance
  }

  register(config: CouponConfig): void {
    const strategy = CouponStrategyFactory.create(config)
    this.strategies.set(config.code, strategy)
  }

  registerMultiple(configs: CouponConfig[]): void {
    configs.forEach(config => this.register(config))
  }

  getCoupon(code: string): CouponStrategy | undefined {
    return this.strategies.get(code.toUpperCase())
  }

  getAllCoupons(): CouponStrategy[] {
    return Array.from(this.strategies.values())
  }

  isValidCoupon(code: string): boolean {
    return this.strategies.has(code.toUpperCase())
  }

  clear(): void {
    this.strategies.clear()
  }
}