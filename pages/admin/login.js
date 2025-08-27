import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAdmin } from '@/contexts/AdminContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { adminLogin, isAdminAuthenticated } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (isAdminAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAdminAuthenticated, router]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = adminLogin(formData.email, formData.password);
    
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Login | Balanced Bites</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src="/logo.png" alt="Balanced Bites" className="h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Portal</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to manage your store</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Admin Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="admin@balancedbites.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter admin password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-md font-semibold text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#A8C686' }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In to Admin Panel'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-blue-50 dark:bg-blue-900 rounded-md p-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Demo Credentials:</h3>
                <p className="text-xs text-blue-600 dark:text-blue-300">Email: admin@balancedbites.com</p>
                <p className="text-xs text-blue-600 dark:text-blue-300">Password: admin123</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/" className="text-green-600 dark:text-green-400 hover:underline text-sm">
              ← Back to Store
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
