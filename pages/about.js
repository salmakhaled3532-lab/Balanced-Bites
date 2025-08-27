import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Balanced Bites</title>
        <meta name="description" content="Learn about Balanced Bites - your source for natural, healthy, and balanced nutrition with premium granola, dried fruits, and organic drinks." />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">About Us</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#A8C686' }}>Our Story</h2>
              <p className="mb-6 leading-relaxed">
                At Balanced Bites, we believe that healthy living should be simple, delicious, and accessible to everyone. 
                Founded with a passion for natural nutrition, we are dedicated to providing you with the finest selection 
                of wholesome foods that nourish your body and delight your taste buds.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#A8C686' }}>Natural & Healthy Philosophy</h2>
              <p className="mb-4 leading-relaxed">
                We source only the highest quality natural ingredients, free from artificial preservatives, 
                colors, and unnecessary additives. Our commitment to health means every product we offer is 
                carefully selected to provide maximum nutritional benefits while maintaining exceptional taste.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>🌱 <strong>100% Natural Ingredients</strong> - No artificial additives or preservatives</li>
                <li>🥜 <strong>Premium Granola</strong> - Handcrafted with organic oats, nuts, and seeds</li>
                <li>🍇 <strong>Dried Fruits</strong> - Sun-dried and naturally sweet, packed with vitamins</li>
                <li>🍵 <strong>Organic Beverages</strong> - Carefully curated teas and healthy drinks</li>
                <li>⚖️ <strong>Balanced Nutrition</strong> - Perfect harmony of taste and wellness</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: '#A8C686' }}>Our Products</h2>
              <p className="mb-6 leading-relaxed">
                From energizing granola blends that kickstart your morning to antioxidant-rich dried fruits 
                that satisfy your sweet cravings naturally, and refreshing organic beverages that hydrate 
                and nourish - every product in our collection is chosen with your health and happiness in mind.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: '#A8C686' }}>Connect With Us</h2>
              <p className="mb-6 leading-relaxed">
                Join our community of health-conscious food lovers! Follow us on social media for daily 
                inspiration, healthy recipes, nutrition tips, and behind-the-scenes looks at our products.
              </p>
              
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
