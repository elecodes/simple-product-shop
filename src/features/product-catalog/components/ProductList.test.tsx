import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { ProductList } from './ProductList'
import type { Product } from '@/shared/types'

describe('ProductList', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10.99, image: 'img1.jpg', description: 'Desc 1' },
    { id: 2, name: 'Product 2', price: 20.99, image: 'img2.jpg', description: 'Desc 2' },
  ]
  const mockOnAdd = vi.fn()

  beforeEach(() => vi.clearAllMocks())

  it('renders all products', () => {
    render(<ProductList products={mockProducts} onAddToCart={mockOnAdd} />)
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('renders correct number of ProductCard components', () => {
    render(<ProductList products={mockProducts} onAddToCart={mockOnAdd} />)
    const cards = screen.getAllByRole('button', { name: /add .* to cart/i })
    expect(cards).toHaveLength(2)
  })
})