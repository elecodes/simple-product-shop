export const businessRules = {
  bulkDiscount: {
    threshold: 5,      // 5+ items
    percentage: 0.1,   // 10% off
  },
  orderDiscount: {
    threshold: 100,    // $100+
    percentage: 0.15,  // 15% off
  },
  tax: {
    percentage: 0.1,   // 10% tax
  },
  quantity: {
    min: 1,
    max: 99,
  },
  coupons: [
    {
      code: 'SAVE10',
      name: '10% Off',
      description: 'Save 10% on your order',
      type: 'percentage' as const,
      value: 0.1,  // 10%
    },
    {
      code: 'SAVE20',
      name: '$20 Off',
      description: 'Save $20 on orders over $100',
      type: 'fixed' as const,
      value: 20
    },
    {
      code: 'WELCOME15',
      name: 'Welcome Discount',
      description: '$15 off for orders over $50',
      type: 'conditional' as const,
      value: 15,
      conditions: {
        minAmount: 50
      }
    }
  ],
} as const