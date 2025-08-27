import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { cartItems, getCartTotal, getCartItemsCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Dashboard | Balanced Bites</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and view your shopping activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Cart Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Cart</h2>
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.35M7 13h10m-10 0v4a1 1 0 001 1h8a1 1 0 001-1v-4m-9 0h10" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {getCartItemsCount()} items
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Total: ${getCartTotal().toFixed(2)}
              </p>
              <Link href="/cart" className="inline-block mt-2 text-green-600 dark:text-green-400 hover:underline">
                View Cart →
              </Link>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Info</h2>
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <Link href="/profile" className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:underline">
                Edit Profile →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="space-y-3">
              <Link href="/shop" className="block text-purple-600 dark:text-purple-400 hover:underline">
                Browse Products →
              </Link>
              <Link href="/orders" className="block text-purple-600 dark:text-purple-400 hover:underline">
                View Orders →
              </Link>
              <Link href="/contact" className="block text-purple-600 dark:text-purple-400 hover:underline">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Cart Items */}
        {cartItems.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Items in Your Cart</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cartItems.slice(0, 4).map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            {cartItems.length > 4 && (
              <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
                +{cartItems.length - 4} more items in cart
              </p>
            )}
          </div>
        )}

        {/* Empty State */}
        {cartItems.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.35 2.35M7 13h10m-10 0v4a1 1 0 001 1h8a1 1 0 001-1v-4m-9 0h10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Start shopping to see your items here!</p>
            <Link href="/shop" className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}>
              Start Shopping
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
