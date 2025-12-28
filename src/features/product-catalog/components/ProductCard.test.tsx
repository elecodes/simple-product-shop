import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { ProductCard } from './ProductCard'
import type { Product } from '../../../shared/types'

const ADD_TO_CART_TEXT = 'Add to Cart'
const TEST_PRODUCT_NAME = 'Test Product'

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: TEST_PRODUCT_NAME,
    price: 79.99,
    image: 'https://picsum.photos/200',
    description: 'High-quality wireless headphones',
  }
  const mockOnAdd = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

it('renders product name', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAdd} />)
    expect(screen.getByText(TEST_PRODUCT_NAME)).toBeInTheDocument()
  })

  it('calls onAddToCart when button clicked', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAdd} />)
    await user.click(screen.getByText(ADD_TO_CART_TEXT))
    
    await waitFor(() => expect(mockOnAdd).toHaveBeenCalledWith(mockProduct), { timeout: 2000 })
  })

  it('shows "Added!" feedback after clicking', async () => {
    const user = userEvent.setup()
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAdd} />)
    await user.click(screen.getByText(ADD_TO_CART_TEXT))
    
    expect(await screen.findByText('Added!')).toBeInTheDocument()
  }, 3000)

  it('shows error feedback when add to cart fails', async () => {
    const user = userEvent.setup()
    
    // Mock onAddToCart to throw an error
    const mockOnError = vi.fn(() => {
      throw new Error('Failed to add to cart')
    })
    
    render(<ProductCard product={mockProduct} onAddToCart={mockOnError} />)
    
    await user.click(screen.getByText(ADD_TO_CART_TEXT))
    
    // Wait for error state and check button shows 'Failed'
    expect(await screen.findByText('Failed')).toBeInTheDocument()
  }, 3000)


})