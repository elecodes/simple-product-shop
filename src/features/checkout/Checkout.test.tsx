import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkout } from './Checkout';
import { CartProvider } from '../../context/CartContext';

// Mock the discounts utility
vi.mock('@/shared/utils/discounts', () => ({
  calculateDiscountedTotal: vi.fn(() => 85),
}));

// Mock useCart hook
const mockUseCart = vi.fn();
vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => mockUseCart(),
  };
});

const mockCartItems = [
  {
    product: {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      image: '/images/headphones.svg',
      description: 'High-quality wireless headphones',
    },
    quantity: 2,
  },
];

describe('Checkout', () => {
  const mockClearCart = vi.fn();

  beforeEach(() => {
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      subtotal: 159.98,
      clearCart: mockClearCart,
    });
  });

  it('renders checkout form with order summary', () => {
    render(
      <CartProvider>
        <Checkout />
      </CartProvider>
    );

    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Shipping & Payment')).toBeInTheDocument();
  });

  it('shows empty cart message when no items', () => {
    mockUseCart.mockReturnValue({
      items: [],
      subtotal: 0,
      clearCart: mockClearCart,
    });

    render(
      <CartProvider>
        <Checkout />
      </CartProvider>
    );

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('submits form successfully', async () => {
    // Mock window.alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <CartProvider>
        <Checkout />
      </CartProvider>
    );

    // Fill out form
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Anytown' } });
    fireEvent.change(screen.getByLabelText('ZIP Code'), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText('Card Number'), { target: { value: '1234567890123456' } });
    fireEvent.change(screen.getByLabelText('Expiry Date'), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText('CVV'), { target: { value: '123' } });

    fireEvent.click(screen.getByRole('button', { name: /pay/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Order placed successfully!');
    }, { timeout: 3000 });

    alertMock.mockRestore();
  });
});