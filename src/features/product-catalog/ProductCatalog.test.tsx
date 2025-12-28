import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import { ProductCatalog } from './ProductCatalog'

// Mock de productos para el test (usando alias)
vi.mock('@/shared/data/products', () => ({
  products: [
    { id: 1, name: 'Product 1', price: 10, image: '/1.jpg', description: 'Desc 1' },
    { id: 2, name: 'Product 2', price: 20, image: '/2.jpg', description: 'Desc 2' },
  ]
}))

describe('ProductCatalog', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders all products', () => {
    render(<ProductCatalog onAddToCart={vi.fn()} />)
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('renders catalog title', () => {
    render(<ProductCatalog onAddToCart={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument()
  })
})