import Head from 'next/head';
import Link from 'next/link';
import products from '@/data/products';
import AddToCartButton from '@/components/AddToCartButton';

export default function Home() {
  const featured = products.slice(0, 6); // Show first 6 products as featured
  return (
    <>
      <Head>
        <title>Balanced Bites | Simple, Healthy, and Balanced</title>
        <meta name="description" content="Granola, dried fruits, and drinks. Simple, Healthy, and Balanced." />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Simple, Healthy, and Balanced</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Granola, Dried Fruits, and Drinks</p>
          <Link 
            href="/shop" 
            className="inline-block px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}
          >
            Shop Now
          </Link>
        </div>

        {/* Products Section */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#A8C686' }}>Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map(product => (
              <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800">
                <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{product.description}</p>
                <div className="font-bold mb-2 text-gray-900 dark:text-white">${product.price.toFixed(2)}</div>
                <div className="flex gap-2">
                  <Link href={`/shop/${product.id}`} className="inline-block px-3 py-2 text-sm rounded transition border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    View Details
                  </Link>
                  <AddToCartButton 
                    product={product}
                    className="inline-block px-3 py-2 text-sm rounded transition"
                    style={{ backgroundColor: '#A8C686', color: '#F5F3EC' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Follow Us</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://instagram.com/balancedbitesegy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @balancedbitesegy
            </a>
            
            <a 
              href="https://tiktok.com/@balancedbitesegy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              @balancedbitesegy
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
