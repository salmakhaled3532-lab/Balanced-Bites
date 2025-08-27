import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Orders() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    // Mock order data - in real app, this would come from an API
    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'Delivered',
        total: 45.99,
        items: [
          { name: 'Organic Granola Mix', quantity: 2, price: 12.99 },
          { name: 'Dried Mango Slices', quantity: 1, price: 8.99 },
          { name: 'Matcha Green Tea', quantity: 1, price: 11.02 }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-01-10',
        status: 'Processing',
        total: 23.98,
        items: [
          { name: 'Mixed Nuts Premium', quantity: 1, price: 15.99 },
          { name: 'Hojicha Tea', quantity: 1, price: 7.99 }
        ]
      },
      {
        id: 'ORD-003',
        date: '2024-01-05',
        status: 'Shipped',
        total: 34.97,
        items: [
          { name: 'Chocolate Granola', quantity: 1, price: 13.99 },
          { name: 'Butterfly Pea Tea', quantity: 2, price: 10.49 }
        ]
      }
    ];

    setOrders(mockOrders);
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      case 'shipped':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  return (
    <>
      <Head>
        <title>Order History | Balanced Bites</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage your orders</p>
          </div>
          <Link href="/shop" className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}>
            Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Orders Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't placed any orders yet. Start shopping to see your order history here!</p>
            <Link href="/shop" className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order {order.id}</h3>
                      <p className="text-gray-600 dark:text-gray-400">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Items ({order.items.length})</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
                    View Details
                  </button>
                  {order.status.toLowerCase() === 'delivered' && (
                    <button className="px-4 py-2 text-sm rounded-md transition-colors text-white" style={{ backgroundColor: '#A8C686' }}>
                      Reorder Items
                    </button>
                  )}
                  {order.status.toLowerCase() === 'processing' && (
                    <button className="px-4 py-2 text-sm border border-red-300 dark:border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-red-900 transition-colors text-red-600 dark:text-red-400">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-green-600 dark:text-green-400 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </>
  );
}
