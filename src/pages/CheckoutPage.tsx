import { Link } from 'react-router-dom';
import { Checkout } from '@/features/checkout/components';

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Simple Product Shop
            </Link>
            <Link
              to="/cart"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <Checkout />
      </main>
    </div>
  );
}

export default CheckoutPage;