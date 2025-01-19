import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';

export default function BikeAccessoriesPage() {
  const [bikeAccessories, setBikeAccessories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikeAccessories = async () => {
      try {
        const accessoriesData = await client.fetch(`
          *[_type == "bike-accessories"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setBikeAccessories(accessoriesData);
      } catch (error) {
        console.error('Error fetching bike accessories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikeAccessories();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-0 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Bike Accessories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bikeAccessories.map((accessory, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
            >
              {accessory.imageUrl && (
                <a href={`/product/${accessory.slug}`} className="block">
                  <img
                    src={accessory.imageUrl}
                    alt={accessory.name}
                    className="w-full h-64 object-cover rounded-t-lg mb-4"
                  />
                </a>
              )}
              <h2 className="text-lg font-semibold mb-2">
                <a href={`/product/${accessory.slug}`} className="text-black hover:no-underline">
                  {accessory.name}
                </a>
              </h2>
              <p className="text-gray-600 mb-4">{accessory.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-red-600">
                  {typeof accessory.price === 'number'
                    ? `$${accessory.price.toFixed(2)}`
                    : accessory.price || 'N/A'}
                </p>
                {accessory.discountedPrice !== null && accessory.discountedPrice < accessory.price ? (
                  <p className="text-lg font-semibold text-green-600 line-through">
                    ${accessory.discountedPrice.toFixed(2)}
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
