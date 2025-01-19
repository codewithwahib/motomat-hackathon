import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';

export default function SearchByBikesPage() {
  const [bikes, setBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchByBikes = async () => {
      try {
        const bikesData = await client.fetch(`
          *[_type == "search-by-bikes"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setBikes(bikesData);
      } catch (error) {
        console.error('Error fetching bikes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchByBikes();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-0 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Search by Bikes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bikes.map((bike, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
            >
              {bike.imageUrl && (
                <a href={`/product/${bike.slug}`} className="block">
                  <img
                    src={bike.imageUrl}
                    alt={bike.name}
                    className="w-full h-64 object-cover rounded-t-lg mb-4"
                  />
                </a>
              )}
              <h2 className="text-lg font-semibold mb-2">
                <a href={`/bike/${bike.slug}`} className="text-black hover:no-underline">
                  {bike.name}
                </a>
              </h2>
              <p className="text-gray-600 mb-4">{bike.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-red-600">
                  {typeof bike.price === 'number'
                    ? `$${bike.price.toFixed(2)}`
                    : bike.price || 'N/A'}
                </p>
                {bike.discountedPrice !== null && bike.discountedPrice < bike.price ? (
                  <p className="text-lg font-semibold text-green-600 line-through">
                    ${bike.discountedPrice.toFixed(2)}
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
