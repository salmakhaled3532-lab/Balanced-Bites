import Head from 'next/head';
import Link from 'next/link';
import products from '@/data/products';
import AddToCartButton from '@/components/AddToCartButton';

export default function Shop() {
  const granola = products.filter(p => p.category === 'Granola');
  const driedFruits = products.filter(p => p.category === 'Dried Fruits');
  const drinks = products.filter(p => p.category === 'Drinks');

  return (
    <>
      <Head>
        <title>Shop | Balanced Bites</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: '#A8C686' }}>Shop All Products</h1>
        
        {/* Granola Category */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#A8C686' }}>Granola & Breakfast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {granola.map(product => (
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

        {/* Dried Fruits Category */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#A8C686' }}>Dried Fruits & Nuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {driedFruits.map(product => (
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

        {/* Drinks Category */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#A8C686' }}>Teas & Infusions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drinks.map(product => (
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
      </main>
    </>
  );
}
