import { render, screen } from '@testing-library/react'
import { CartSummary } from './CartSummary'

const ORDER_DISCOUNT_NAME = 'Order Discount'

describe('CartSummary', () => {
  it('renders subtotal', () => {
    render(<CartSummary subtotal={100} total={100} itemCount={3} discountBreakdown={[]} />)
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getAllByText('$100.00')).toHaveLength(2) // subtotal y total
  })

  it('renders discount breakdown when discounts applied', () => {
    render(<CartSummary
      subtotal={100}
      total={85}
      itemCount={3}
      discountBreakdown={[{ name: ORDER_DISCOUNT_NAME, amount: 15 }]}
    />)
    expect(screen.getByText(ORDER_DISCOUNT_NAME)).toBeInTheDocument()
    expect(screen.getByText('-$15.00')).toBeInTheDocument()
  })

  it('hides discount when no discounts', () => {
    render(<CartSummary subtotal={50} total={50} itemCount={2} discountBreakdown={[]} />)
    expect(screen.queryByText(ORDER_DISCOUNT_NAME)).not.toBeInTheDocument()
  })

  it('renders total', () => {
    render(<CartSummary
      subtotal={100}
      total={85}
      itemCount={3}
      discountBreakdown={[{ name: ORDER_DISCOUNT_NAME, amount: 15 }]}
    />)
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('$85.00')).toBeInTheDocument()
  })

  it('shows promo message when subtotal < $100 and no order discount', () => {
    render(<CartSummary subtotal={80} total={80} itemCount={2} discountBreakdown={[]} />)
    expect(screen.getByText(/add \$20.00 more for 15% off/i)).toBeInTheDocument()
  })

  it('hides promo message when order discount already applied', () => {
    render(<CartSummary
      subtotal={100}
      total={85}
      itemCount={3}
      discountBreakdown={[{ name: ORDER_DISCOUNT_NAME, amount: 15 }]}
    />)
    expect(screen.queryByText(/add .* more for 15% off/i)).not.toBeInTheDocument()
  })

  it('renders checkout button', () => {
    render(<CartSummary subtotal={100} total={100} itemCount={3} discountBreakdown={[]} />)
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
  })
})