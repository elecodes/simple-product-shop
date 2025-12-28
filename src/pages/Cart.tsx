import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from '@/features/shopping-cart/ShoppingCart';
import { UI_TEXT } from '@/shared/constants/ui';

function Cart() {
  const { itemCount } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Simple Product Shop
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Cart ({itemCount})</span>
              {itemCount > 0 && (
                <Link
                  to="/checkout"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  {UI_TEXT.checkout}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShoppingCart />
      </main>
    </div>
  );
}

export default Cart;