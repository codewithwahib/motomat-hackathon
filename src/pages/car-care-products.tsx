import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';

export default function CarCareProducts() {
  const [carCareProducts, setCarCareProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarCareProducts = async () => {
      try {
        const productsData = await client.fetch(`
          *[_type == "car-care-products"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setCarCareProducts(productsData);
      } catch (error) {
        console.error('Error fetching car care products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarCareProducts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-0 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Car Care Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {carCareProducts.length > 0 ? (
            carCareProducts.map((product, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
              >
                {product.imageUrl ? (
                  <a href={`/product/${product.slug}`} className="block">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg mb-4"
                    />
                  </a>
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center text-gray-500">
                    Image not available
                  </div>
                )}
                <h2 className="text-lg font-semibold mb-2">
                  <a href={`/product/${product.slug}`} className="text-black hover:no-underline">
                    {product.name}
                  </a>
                </h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-red-600">
                    {typeof product.price === 'number'
                      ? `$${product.price.toFixed(2)}`
                      : product.price || 'N/A'}
                  </p>
                  {product.discountedPrice !== null && product.discountedPrice < product.price ? (
                    <p className="text-lg font-semibold text-green-600 line-through">
                      ${product.discountedPrice.toFixed(2)}
                    </p>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No car care products found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
