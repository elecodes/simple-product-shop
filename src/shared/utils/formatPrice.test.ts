import { formatPrice } from './formatPrice'

describe('formatPrice', () => {
  it('formats 10 as $10.00', () => {
    expect(formatPrice(10)).toBe('$10.00')
  })

  it('formats 19.99 as $19.99', () => {
    expect(formatPrice(19.99)).toBe('$19.99')
  })

  it('formats 0 as $0.00', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats 1234.5 as $1,234.50', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50')
  })
})