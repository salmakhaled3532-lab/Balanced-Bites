import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '@/contexts/AdminContext';
import { useProducts } from '@/contexts/ProductContext';

export default function AdminProducts() {
  const { isAdminAuthenticated, isLoading } = useAdmin();
  const { products, categories, deleteProduct } = useProducts();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      router.push('/admin/login');
      return;
    }
  }, [isAdminAuthenticated, isLoading, router]);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const handleDelete = (productId) => {
    if (deleteConfirm === productId) {
      deleteProduct(productId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(productId);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Manage Products | Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/admin/dashboard" className="text-green-600 dark:text-green-400 hover:underline mr-4">
                  ← Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
              </div>
              <Link href="/admin/products/add" className="px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686' }}>
                Add New Product
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Products
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or description..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Products ({filteredProducts.length})
                </h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchTerm || selectedCategory ? 'Try adjusting your filters' : 'Get started by adding your first product'}
                  </p>
                  <Link href="/admin/products/add" className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686', color: 'white' }}>
                    Add Product
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover mr-4" />
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#A8C686', color: 'white' }}>
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className={`${
                                  deleteConfirm === product.id
                                    ? 'text-red-800 dark:text-red-200 font-bold'
                                    : 'text-red-600 dark:text-red-400'
                                } hover:underline`}
                              >
                                {deleteConfirm === product.id ? 'Confirm Delete?' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
