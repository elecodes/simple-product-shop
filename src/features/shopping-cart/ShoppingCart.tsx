import React from 'react';
import { CartItem, CartSummary } from './components';
import { useCart } from '@/context/CartContext';
import { UI_TEXT } from '@/shared/constants/ui';
import { formatPrice } from '@/shared/utils';

export const ShoppingCart: React.FC = () => {
  const { items, itemCount, subtotal, total, discountBreakdown, updateQuantity, removeItem, applyCoupon } = useCart();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: number) => {
    removeItem(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Cart updated: {itemCount} items, total {formatPrice(total)}
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          {UI_TEXT.shoppingCart}
          {itemCount > 0 && (
            <span className="ml-3 bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          )}
        </h2>
        <p className="text-gray-600">Review and manage your items</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-8xl mb-6">🛒</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some amazing products to get started!</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={(qty) => handleUpdateQuantity(item.product.id, qty)}
                onRemove={() => handleRemove(item.product.id)}
              />
            ))}
          </div>

          {/* Order Summary - Always below cart items */}
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <CartSummary
              subtotal={subtotal}
              total={total}
              itemCount={itemCount}
              discountBreakdown={discountBreakdown}
              onApplyCoupon={applyCoupon}
            />
          </div>
        </div>
      )}
    </div>
  );
};