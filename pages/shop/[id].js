import { useRouter } from 'next/router';
import Head from 'next/head';
import products from '@/data/products';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => p.id === id);

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <>
      <Head>
        <title>{product.name} | Wholefoods Store</title>
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={product.image} alt={product.name} className="h-64 w-64 object-cover rounded shadow" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-lg text-gray-700 mb-4">{product.description}</div>
            <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mb-4">Add to Cart</button>
            <div>
              <Link href="/shop" className="text-green-700 underline">Back to Shop</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
