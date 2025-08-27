import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function AddToCartButton({ product, className, style }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }
    
    // Add to cart using context
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={className}
        style={style}
        disabled={showSuccess}
      >
        {showSuccess ? '✓ Added!' : 'Add to Cart'}
      </button>

      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Login Required
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please login or sign up to add items to your cart.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowAuthPrompt(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAuthPrompt(false);
                    // This would trigger the auth modal - for now just scroll to top where auth button is
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-md font-semibold transition-colors"
                  style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}
                >
                  Login / Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
