// TODO: Remove debug console.log statements (priority: high, effort: 0.5h)
// TODO: Add accessibility attributes (aria-label, role) for better screen reader support (priority: medium, effort: 1h)
// TODO: Improve image alt text with more descriptive content (priority: low, effort: 0.5h)

import React, { useState } from 'react';
import type { Product } from '@/shared/types';
import { formatPrice } from '@/shared/utils';
import { UI_TEXT } from '@/shared/constants/ui';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

type ButtonState = 'idle' | 'loading' | 'success' | 'error'

const getButtonClassName = (state: ButtonState) => {
  switch (state) {
    case 'idle':
      return 'bg-indigo-600 text-white hover:bg-indigo-700'
    case 'loading':
      return 'bg-indigo-400 text-white cursor-not-allowed'
    case 'success':
      return 'bg-green-600 text-white'
    case 'error':
      return 'bg-red-600 text-white'
    default:
      return 'bg-indigo-600 text-white hover:bg-indigo-700'
  }
}

const getButtonText = (state: ButtonState) => {
  switch (state) {
    case 'idle':
      return UI_TEXT.addToCart
    case 'loading':
      return 'Adding...'
    case 'success':
      return 'Added!'
    case 'error':
      return 'Failed'
    default:
      return UI_TEXT.addToCart
  }
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [state, setState] = useState<ButtonState>('idle');

  const handleAddToCart = async () => {
    setState('loading')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      onAddToCart(product)
      setState('success')
      setTimeout(() => setState('idle'), 1500)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4" data-testid="product-card">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2 truncate">{product.description}</p>
      <p className="text-xl font-bold">{formatPrice(product.price)}</p>
        <button
          onClick={handleAddToCart}
          disabled={state === 'loading'}
          aria-label={`Add ${product.name} to cart`}
          className={`mt-4 w-full py-2 rounded font-semibold transition-colors ${getButtonClassName(state)}`}
        >
          {getButtonText(state)}
        </button>
    </div>
  );
};