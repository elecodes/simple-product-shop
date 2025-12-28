import { calculateTax } from './calculateTax'

describe('calculateTax', () => {
  it('calculates tax for subtotal', () => {
    expect(calculateTax(100)).toBe(10)
  })

  it('calculates tax for different subtotal', () => {
    expect(calculateTax(200)).toBe(20)
  })
})