import React from 'react';
import { formatPrice } from '@/shared/utils';
import { businessRules } from '@/shared/constants/businessRules';
import { UI_TEXT } from '@/shared/constants/ui';
import { DiscountCouponInput } from './DiscountCouponInput';

interface DiscountBreakdownItem {
  name: string;
  amount: number;
}

interface CartSummaryProps {
  subtotal: number;
  total: number;
  itemCount: number;
  discountBreakdown: DiscountBreakdownItem[];
  onApplyCoupon?: (couponCode: string) => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  total,
  itemCount,
  discountBreakdown,
  onApplyCoupon
}) => {
   const remainingForOrderDiscount = businessRules.orderDiscount.threshold - subtotal;
  const hasOrderDiscount = discountBreakdown.some(d => d.name === 'Order Discount');

  const getPromoMessage = () => {
    if (hasOrderDiscount) return null; // Already has order discount

    if (remainingForOrderDiscount > 0) {
      return `🎉 Add ${formatPrice(remainingForOrderDiscount)} more for ${businessRules.orderDiscount.percentage * 100}% off your entire order!`;
    }

    return null;
  };

  const promoMessage = getPromoMessage();

  return (
    <>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium" data-testid="subtotal">{formatPrice(subtotal)}</span>
        </div>

        {discountBreakdown.map((discountItem, index) => (
          <div key={index} className="flex justify-between items-center py-2 text-green-600">
            <span className="font-medium">{discountItem.name}</span>
            <span className="font-medium">-{formatPrice(discountItem.amount)}</span>
          </div>
        ))}

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Total</span>
            <span className="text-2xl font-bold text-green-600" data-testid="total">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {promoMessage && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800 font-medium">
            {promoMessage}
          </p>
        </div>
      )}

      {onApplyCoupon && (
        <div className="mb-4">
          <label htmlFor="coupon-input" className="block text-sm font-medium text-gray-700 mb-2">
            Discount Code
          </label>
          <DiscountCouponInput onApply={onApplyCoupon} />
        </div>
      )}

      <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg shadow-sm">
        {UI_TEXT.checkout}
      </button>
    </>
  );
};