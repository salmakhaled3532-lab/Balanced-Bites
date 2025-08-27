import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! (Demo)');
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Cart | Balanced Bites</title>
        </Head>
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Please Login to View Cart</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be logged in to access your shopping cart.</p>
            <Link href="/" className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}>
              Go to Homepage
            </Link>
          </div>
        </main>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Head>
          <title>Cart | Balanced Bites</title>
        </Head>
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.35M7 13h10m-10 0v4a1 1 0 001 1h8a1 1 0 001-1v-4m-9 0h10" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Add some delicious products to get started!</p>
            <Link href="/shop" className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}>
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cart | Balanced Bites</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    <p className="font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <Link href="/shop" className="block text-center mt-4 text-green-600 dark:text-green-400 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
