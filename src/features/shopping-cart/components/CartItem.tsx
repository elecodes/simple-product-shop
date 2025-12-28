import React from 'react';
import type { CartItem as CartItemData } from '@/shared/types';
import { formatPrice } from '@/shared/utils';
import { businessRules } from '@/shared/constants/businessRules';
import { UI_TEXT } from '@/shared/constants/ui';

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow" data-testid="cart-item">
      <div className="p-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex gap-10">
          {/* Product Info and Quantity */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-6">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">{item.product.name}</h3>
                <p className="text-gray-600 text-sm font-medium mb-4">{formatPrice(item.product.price)} each</p>

                {/* Quantity Controls - Below description */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 font-medium">Qty:</span>
                  <div className="flex items-center border rounded-lg bg-white shadow-sm">
                      <button
                        onClick={() => onUpdateQuantity(item.quantity - 1)}
                        disabled={item.quantity <= businessRules.quantity.min}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-semibold"
                      >
                      -
                    </button>
                    <span className="w-12 h-9 flex items-center justify-center bg-white font-bold text-center border-x text-gray-900" data-testid="quantity">
                      {item.quantity}
                    </span>
                      <button
                        onClick={() => onUpdateQuantity(item.quantity + 1)}
                        disabled={item.quantity >= businessRules.quantity.max}
                        aria-label={`Increase quantity of ${item.product.name}`}
                        className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-semibold"
                      >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtotal and Remove */}
          <div className="text-right flex-shrink-0 min-w-[7rem]">
            <p className="font-bold text-xl text-green-600 mb-2">{formatPrice(subtotal)}</p>
            <button
              onClick={onRemove}
              aria-label={`Remove ${item.product.name} from cart`}
              className="text-red-500 hover:text-red-700 text-sm underline transition-colors hover:no-underline"
            >
              {UI_TEXT.removeFromCart}
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-start space-x-4 mb-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">{item.product.name}</h3>
              <p className="text-gray-600 text-sm font-medium mb-3">{formatPrice(item.product.price)} each</p>

              {/* Quantity Controls - Below description */}
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                <div className="flex items-center border rounded-lg bg-white shadow-sm">
                   <button
                     onClick={() => onUpdateQuantity(item.quantity - 1)}
                     disabled={item.quantity <= businessRules.quantity.min}
                     aria-label={`Decrease quantity of ${item.product.name}`}
                     className="w-7 h-7 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-semibold"
                   >
                    -
                  </button>
                   <span className="w-8 h-7 flex items-center justify-center bg-white font-bold text-center border-x text-gray-900 text-xs" data-testid="quantity">
                     {item.quantity}
                   </span>
                   <button
                     onClick={() => onUpdateQuantity(item.quantity + 1)}
                     disabled={item.quantity >= businessRules.quantity.max}
                     aria-label={`Increase quantity of ${item.product.name}`}
                     className="w-7 h-7 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700 font-semibold"
                   >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold text-lg text-green-600">{formatPrice(subtotal)}</p>
                <button
                  onClick={onRemove}
                  aria-label={`Remove ${item.product.name} from cart`}
                  className="text-red-500 hover:text-red-700 text-sm underline hover:no-underline"
                >
                  {UI_TEXT.removeFromCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};