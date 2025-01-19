import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';

export default function BikePartsPage() {
  const [bikeParts, setBikeParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikeParts = async () => {
      try {
        const partsData = await client.fetch(`
          *[_type == "bike-parts"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setBikeParts(partsData);
      } catch (error) {
        console.error('Error fetching bike parts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikeParts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-0 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Bike Parts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bikeParts.map((part, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
            >
              {part.imageUrl && (
                <a href={`/product/${part.slug}`} className="block">
                  <img
                    src={part.imageUrl}
                    alt={part.name}
                    className="w-full h-64 object-cover rounded-t-lg mb-4"
                  />
                </a>
              )}
              <h2 className="text-lg font-semibold mb-2">
                <a href={`/product/${part.slug}`} className="text-black hover:no-underline">
                  {part.name}
                </a>
              </h2>
              <p className="text-gray-600 mb-4">{part.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-red-600">
                  {typeof part.price === 'number'
                    ? `$${part.price.toFixed(2)}`
                    : part.price || 'N/A'}
                </p>
                {part.discountedPrice !== null && part.discountedPrice < part.price ? (
                  <p className="text-lg font-semibold text-green-600 line-through">
                    ${part.discountedPrice.toFixed(2)}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
