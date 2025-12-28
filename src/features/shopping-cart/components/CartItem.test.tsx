import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CartItem } from './CartItem'

describe('CartItem', () => {
  const mockItem = {
    product: { id: 1, name: 'Test Product', price: 25, image: '/test.jpg', description: 'Test' },
    quantity: 2,
  }
  const mockOnUpdate = vi.fn()
  const mockOnRemove = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('renders product name and price', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Check that product name appears (may appear in both desktop and mobile layouts)
    const productNames = screen.getAllByText('Test Product')
    expect(productNames.length).toBeGreaterThan(0)
    // Check that price appears (may appear in both desktop and mobile layouts)
    const prices = screen.getAllByText('$25.00 each')
    expect(prices.length).toBeGreaterThan(0)
  })

  it('renders quantity in desktop layout', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Check for quantity in desktop layout (w-12 class)
    expect(screen.getByText('2', { selector: 'span.w-12' })).toBeInTheDocument()
  })

  it('renders quantity in mobile layout', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Check for quantity in mobile layout (w-8 class)
    expect(screen.getByText('2', { selector: 'span.w-8' })).toBeInTheDocument()
  })

  it('renders subtotal (price × quantity)', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Get all instances of $50.00 and ensure at least one exists
    const subtotalElements = screen.getAllByText('$50.00')
    expect(subtotalElements.length).toBeGreaterThan(0)
  })

  it('calls onUpdateQuantity with incremented value when + clicked', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Click the first increase button (desktop layout)
    const increaseButtons = screen.getAllByRole('button', { name: /increase/i })
    await user.click(increaseButtons[0])
    expect(mockOnUpdate).toHaveBeenCalledWith(3)
  })

  it('calls onUpdateQuantity with decremented value when - clicked', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Click the first decrease button (desktop layout)
    const decreaseButtons = screen.getAllByRole('button', { name: /decrease/i })
    await user.click(decreaseButtons[0])
    expect(mockOnUpdate).toHaveBeenCalledWith(1)
  })

  it('disables - button when quantity is 1', () => {
    render(<CartItem item={{ ...mockItem, quantity: 1 }} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Check the first decrease button (desktop layout)
    const decreaseButtons = screen.getAllByRole('button', { name: /decrease/i })
    expect(decreaseButtons[0]).toBeDisabled()
  })

  it('calls onRemove when remove button clicked', async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockItem} onUpdateQuantity={mockOnUpdate} onRemove={mockOnRemove} />)
    // Click the first remove button
    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    await user.click(removeButtons[0])
    expect(mockOnRemove).toHaveBeenCalled()
  })
})