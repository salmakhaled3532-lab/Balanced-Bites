import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '@/contexts/AdminContext';
import { useProducts } from '@/contexts/ProductContext';

export default function AdminDashboard() {
  const { admin, isAdminAuthenticated, adminLogout, isLoading } = useAdmin();
  const { getProductStats } = useProducts();
  const router = useRouter();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      router.push('/admin/login');
      return;
    }

    if (isAdminAuthenticated) {
      setStats(getProductStats());
    }
  }, [isAdminAuthenticated, isLoading, router, getProductStats]);

  const handleLogout = () => {
    adminLogout();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null; // Will redirect
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Balanced Bites</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <img src="/logo.png" alt="Balanced Bites" className="h-8 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {admin?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-green-600 dark:text-green-400 hover:underline">
                  View Store
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Products</dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats?.totalProducts || 0}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Categories</dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats?.totalCategories || 0}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Revenue</dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">$2,450</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Customers</dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">156</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/admin/products/add" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 transition-colors">
                    <svg className="h-8 w-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Add Product</span>
                  </Link>

                  <Link href="/admin/categories" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                    <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Manage Categories</span>
                  </Link>

                  <Link href="/admin/products" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 transition-colors">
                    <svg className="h-8 w-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">View All Products</span>
                  </Link>

                  <Link href="/admin/orders" className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-yellow-500 transition-colors">
                    <svg className="h-8 w-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Orders</span>
                  </Link>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Products</h3>
                <div className="space-y-3">
                  {stats?.recentProducts?.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <img src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">${product.price}</span>
                    </div>
                  ))}
                </div>
                <Link href="/admin/products" className="block mt-4 text-center text-green-600 dark:text-green-400 hover:underline text-sm">
                  View All Products →
                </Link>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Products by Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats?.productsByCategory?.map((item) => (
                  <div key={item.category} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.category}</h4>
                      <span className="text-2xl font-bold" style={{ color: '#A8C686' }}>{item.count}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          backgroundColor: '#A8C686',
                          width: `${(item.count / (stats?.totalProducts || 1)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
