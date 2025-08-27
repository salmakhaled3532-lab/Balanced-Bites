import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '@/contexts/AdminContext';
import { useProducts } from '@/contexts/ProductContext';

export default function EditProduct() {
  const { isAdminAuthenticated, isLoading } = useAdmin();
  const { products, categories, updateProduct } = useProducts();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    featured: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdminAuthenticated) {
      router.push('/admin/login');
      return;
    }
  }, [isAdminAuthenticated, isLoading, router]);

  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setFormData({
          name: foundProduct.name,
          description: foundProduct.description,
          price: foundProduct.price.toString(),
          category: foundProduct.category,
          image: foundProduct.image,
          featured: foundProduct.featured || false
        });
      } else {
        setProductNotFound(true);
      }
    }
  }, [id, products]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      updateProduct(product.id, productData);
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsSubmitting(false);
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

  if (productNotFound) {
    return (
      <>
        <Head>
          <title>Product Not Found | Admin Dashboard</title>
        </Head>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
            <Link href="/admin/products" className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#A8C686' }}>
              Back to Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Product: {product.name} | Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/admin/products" className="text-green-600 dark:text-green-400 hover:underline mr-4">
                  ← Back to Products
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>

                {/* Product Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter product description"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>}
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.image ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
                  
                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                      <img 
                        src={formData.image} 
                        alt="Product preview" 
                        className="h-32 w-32 object-cover rounded border"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Featured Product */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Featured Product (Display on homepage)
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/admin/products" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#A8C686' }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating Product...
                      </div>
                    ) : (
                      'Update Product'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
