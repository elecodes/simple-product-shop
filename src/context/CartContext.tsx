// TODO: Remove debug console.log statements throughout the file (priority: high, effort: 1h)
// TODO: Implement proper error boundaries for discount calculation failures (priority: medium, effort: 2h)
// TODO: Add input validation for product data in addItem method (priority: medium, effort: 1h)

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '@/shared/types';
import { DiscountCalculator } from '@/shared/strategies/DiscountCalculator';
import * as Sentry from '@sentry/react';

interface DiscountBreakdownItem {
  name: string;
  amount: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
  discountBreakdown: DiscountBreakdownItem[];
  couponCode: string;
  addItem: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  applyCoupon: (couponCode: string) => void;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; items: CartItem[] }
  | { type: 'APPLY_COUPON'; couponCode: string }
  | { type: 'REMOVE_COUPON' };

const STORAGE_KEY = 'cart-items';

const getInitialState = (): { items: CartItem[]; itemCount: number; subtotal: number; couponCode: string } => {
  return { items: [], itemCount: 0, subtotal: 0, couponCode: '' };
};

const cartReducer = (state: { items: CartItem[]; itemCount: number; subtotal: number; couponCode: string }, action: CartAction) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      if (!existingItem) {
        const newItems = [...state.items, { product: action.product, quantity: 1 }];
        return {
          items: newItems,
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
          couponCode: state.couponCode,
        };
      }
      const updatedItems = state.items.map(item =>
        item.product.id === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        couponCode: state.couponCode,
      };
    }
    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.product.id !== action.productId);
      return {
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        couponCode: state.couponCode,
      };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      return {
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        couponCode: state.couponCode,
      };
    }
    case 'CLEAR_CART':
      return { items: [], itemCount: 0, subtotal: 0, couponCode: '' };
    case 'APPLY_COUPON':
      return { ...state, couponCode: action.couponCode };
    case 'REMOVE_COUPON':
      return { ...state, couponCode: '' };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const items = JSON.parse(stored);
          if (Array.isArray(items)) {
            dispatch({ type: 'LOAD_FROM_STORAGE', items });
          }
        }
      } catch (error) {
        console.warn('Failed to load cart from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.warn('Failed to save cart to localStorage:', error);
      }
    }
  }, [state.items]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Added ${product.name} to cart`,
      level: 'info',
      data: { productId: product.id, productName: product.name }
    });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Removed item ${productId} from cart`,
      level: 'info',
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'Cleared cart',
      level: 'info',
    });
  };

  const applyCoupon = (couponCode: string) => {
    dispatch({ type: 'APPLY_COUPON', couponCode });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: `Applied coupon: ${couponCode}`,
      level: 'info',
    });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'Removed coupon',
      level: 'info',
    });
  };

  // Discount calculation
  const discountCalculator = new DiscountCalculator();
  let discount = 0;
  let total = state.subtotal;
  let discountBreakdown: DiscountBreakdownItem[] = [];

  try {
    discount = discountCalculator.calculate(state.items, state.subtotal, state.couponCode);
    total = state.subtotal - discount;
    discountBreakdown = discountCalculator.getBreakdown(state.items, state.subtotal, state.couponCode);
  } catch (error) {
    console.error('Error calculating discounts:', error);
    // Fallback to no discounts
    discount = 0;
    total = state.subtotal;
    discountBreakdown = [];
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount: state.itemCount,
      subtotal: state.subtotal,
      discount,
      total,
      discountBreakdown,
      couponCode: state.couponCode,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};