import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { ProductProvider } from '@/contexts/ProductContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AdminProvider>
          <ProductProvider>
            <CartProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                <ThemeToggle />
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </div>
            </CartProvider>
          </ProductProvider>
        </AdminProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
