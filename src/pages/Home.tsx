import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ProductCatalog } from '@/features/product-catalog/ProductCatalog';
import { ShoppingCart } from '@/features/shopping-cart/ShoppingCart';
import { Link } from 'react-router-dom';
import { LoginDemo } from '@/features/auth/LoginDemo';
import { Toast } from '@/shared/components/Toast';

function Home() {
  const { itemCount, addItem } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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
               <button
                 onClick={() => setShowLogin(!showLogin)}
                 className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
               >
                 Account
               </button>
                <button
                 onClick={() => setShowCart(!showCart)}
                  aria-label={`View cart, ${itemCount} items`}
                  className="relative bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                 Cart ({itemCount})
               </button>
               {itemCount > 0 && (
                 <Link
                   to="/checkout"
                   className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                 >
                   Checkout
                 </Link>
               )}
               {import.meta.env.DEV && (
                 <button
                   onClick={() => {
                     throw new Error('Test error from React')
                   }}
                   className="bg-red-500 text-white px-2 py-1 text-sm rounded"
                 >
                   Test Error
                 </button>
               )}
            </div>
          </div>
        </div>
       </header>

      {/* Login Section */}
      {showLogin && (
        <div className="bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <LoginDemo />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Catalog */}
          <div className={`${showCart ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <ProductCatalog onAddToCart={(product) => {
              addItem(product)
              setToast({ message: 'Added to cart!', type: 'success' })
            }} />
          </div>

          {/* Shopping Cart - Hidden on mobile unless toggled */}
          {showCart && (
            <div className="lg:col-span-1">
              <ShoppingCart />
            </div>
          )}
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Home;