import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'
import type { ReactNode } from 'react'
import { vi } from 'vitest'

const STORAGE_ERROR_MESSAGE = 'Storage error'
const INVALID_JSON_MESSAGE = 'invalid json'

const STORAGE_KEY = 'cart-items'

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(function() { return null }),
      setItem: vi.fn(function() {}),
      removeItem: vi.fn(function() {}),
      clear: vi.fn(function() {}),
    },
    writable: true,
  });
});

describe('CartContext', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 25,
    image: '/test.jpg',
    description: 'Test'
  }

  // No localStorage in this context

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.itemCount).toBe(0)
    expect(result.current.subtotal).toBe(0)
    expect(result.current.discount).toBe(0)
    expect(result.current.total).toBe(0)
    expect(result.current.discountBreakdown).toHaveLength(0)
  })

  it('adds new product with quantity 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('increments quantity when adding existing product', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('updates quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.updateQuantity(1, 5))
    expect(result.current.items[0].quantity).toBe(5)
  })

  it('removes item when quantity set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.updateQuantity(1, 0))
    expect(result.current.items).toHaveLength(0)
  })

  it('removes item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.removeItem(1))
    expect(result.current.items).toHaveLength(0)
  })

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem({ ...mockProduct, id: 2 }))
    act(() => result.current.clearCart())
    expect(result.current.items).toHaveLength(0)
  })

  it('calculates itemCount correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem(mockProduct))
    act(() => result.current.addItem({ ...mockProduct, id: 2 }))
    expect(result.current.itemCount).toBe(3) // 2 + 1
  })

  it('calculates subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockProduct)) // $25
    act(() => result.current.addItem(mockProduct)) // $25 más
    expect(result.current.subtotal).toBe(50)
  })

  it('calculates discount and total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    // Add 5 items of $10 = $50 subtotal (bulk discount 10% = $5, no order discount)
    const cheapProduct = { ...mockProduct, price: 10, id: 99 }
    for (let i = 0; i < 5; i++) {
      act(() => result.current.addItem(cheapProduct))
    }
    expect(result.current.subtotal).toBe(50)
    expect(result.current.discount).toBe(5) // 10% of 50
    expect(result.current.total).toBe(45) // 50 - 5
    expect(result.current.discountBreakdown).toHaveLength(1)
    expect(result.current.discountBreakdown[0].name).toBe('Bulk Discount')
    expect(result.current.discountBreakdown[0].amount).toBe(5)
  })

  it('applies both discounts when eligible', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    const expensiveProduct = { ...mockProduct, price: 50, id: 2 }
    // Add 5 items of $50 = $250 subtotal (bulk 10% = $25, then order 15% on $225 = $33.75, total discount $58.75)
    for (let i = 0; i < 5; i++) {
      act(() => result.current.addItem(expensiveProduct))
    }
    expect(result.current.subtotal).toBe(250)
    expect(result.current.discount).toBeCloseTo(58.75, 2)
    expect(result.current.total).toBeCloseTo(191.25, 2)
    expect(result.current.discountBreakdown).toHaveLength(2)
  })

  describe('localStorage integration', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('handles localStorage load errors gracefully', () => {
      const mockLocalStorage = {
        getItem: vi.fn(() => { throw new Error(STORAGE_ERROR_MESSAGE) }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      })

      renderHook(() => useCart(), { wrapper })
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY)
    })

    it('handles invalid JSON in localStorage gracefully', () => {
      const mockLocalStorage = {
        getItem: vi.fn(() => INVALID_JSON_MESSAGE),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      })

      renderHook(() => useCart(), { wrapper })
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY)
    })

    it('handles non-array data in localStorage gracefully', () => {
      const mockLocalStorage = {
        getItem: vi.fn(() => '{"not": "an array"}'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      })

      renderHook(() => useCart(), { wrapper })
      
      expect(mockLocalStorage.removeItem).not.toHaveBeenCalledWith(STORAGE_KEY)
    })

it('handles localStorage save errors gracefully', () => {
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(() => { throw new Error(STORAGE_ERROR_MESSAGE) }),
        removeItem: vi.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      })

      const { result } = renderHook(() => useCart(), { wrapper })
      
      act(() => result.current.addItem(mockProduct))
      
      // Should not throw error
      expect(result.current.items).toHaveLength(1)
    })
  })

  describe('error handling for useCart hook', () => {
    it('throws error when useCart is used outside CartProvider', () => {
      expect(() => {
        renderHook(() => useCart())
      }).toThrow('useCart must be used within a CartProvider')
    })
  })
})