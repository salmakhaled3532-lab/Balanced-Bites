import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '@/contexts/AdminContext';
import { useProducts } from '@/contexts/ProductContext';

export default function AdminCategories() {
  const { isAdminAuthenticated, isLoading } = useAdmin();
  const { categories, addCategory, updateCategory, deleteCategory, getProductsByCategory } = useProducts();
  const router = useRouter();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      router.push('/admin/login');
      return;
    }
  }, [isAdminAuthenticated, isLoading, router]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    if (categories.includes(newCategoryName.trim())) {
      setError('Category already exists');
      return;
    }

    const success = addCategory(newCategoryName.trim());
    if (success) {
      setSuccess('Category added successfully');
      setNewCategoryName('');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleEditCategory = (categoryName) => {
    setEditingCategory(categoryName);
    setEditName(categoryName);
    setError('');
    setSuccess('');
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!editName.trim()) {
      setError('Category name is required');
      return;
    }

    if (editName.trim() === editingCategory) {
      setEditingCategory(null);
      return;
    }

    if (categories.includes(editName.trim()) && editName.trim() !== editingCategory) {
      setError('Category name already exists');
      return;
    }

    updateCategory(editingCategory, editName.trim());
    setSuccess('Category updated successfully');
    setEditingCategory(null);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDeleteCategory = (categoryName) => {
    if (deleteConfirm === categoryName) {
      const result = deleteCategory(categoryName);
      if (result.success) {
        setSuccess('Category deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error);
        setTimeout(() => setError(''), 5000);
      }
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(categoryName);
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
        <title>Manage Categories | Admin Dashboard</title>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Categories</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Add New Category */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Category</h2>
              
              {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
                  <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-md p-4">
                  <p className="text-green-800 dark:text-green-200 text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleAddCategory} className="flex gap-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md font-semibold text-white transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: '#A8C686' }}
                >
                  Add Category
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Categories ({categories.length})
                </h2>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No categories found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Add your first category to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {categories.map((category) => {
                    const productCount = getProductsByCategory(category).length;
                    
                    return (
                      <div key={category} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {editingCategory === category ? (
                              <form onSubmit={handleUpdateCategory} className="flex gap-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                  autoFocus
                                />
                                <button
                                  type="submit"
                                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingCategory(null)}
                                  className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
                                >
                                  Cancel
                                </button>
                              </form>
                            ) : (
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {productCount} product{productCount !== 1 ? 's' : ''}
                                </p>
                              </div>
                            )}
                          </div>

                          {editingCategory !== category && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category)}
                                className={`text-sm hover:underline ${
                                  deleteConfirm === category
                                    ? 'text-red-800 dark:text-red-200 font-bold'
                                    : 'text-red-600 dark:text-red-400'
                                }`}
                                disabled={productCount > 0 && deleteConfirm !== category}
                              >
                                {deleteConfirm === category ? 'Confirm Delete?' : 'Delete'}
                              </button>
                            </div>
                          )}
                        </div>

                        {productCount > 0 && deleteConfirm !== category && (
                          <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                            Cannot delete: {productCount} product{productCount !== 1 ? 's' : ''} using this category
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Category Statistics */}
            <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Category Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const productCount = getProductsByCategory(category).length;
                  const percentage = categories.length > 0 ? (productCount / categories.reduce((total, cat) => total + getProductsByCategory(cat).length, 0)) * 100 : 0;
                  
                  return (
                    <div key={category} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{category}</h4>
                        <span className="text-lg font-bold" style={{ color: '#A8C686' }}>{productCount}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: '#A8C686',
                            width: `${percentage}%`
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {percentage.toFixed(1)}% of products
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
