import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';

export default function SearchByCarsPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchByCars = async () => {
      try {
        const carsData = await client.fetch(`
          *[_type == "search-by-cars"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchByCars();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-0 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Search by Cars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
            >
              {car.imageUrl && (
                <a href={`/product/${car.slug}`} className="block">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="w-full h-64 object-cover rounded-t-lg mb-4"
                  />
                </a>
              )}
              <h2 className="text-lg font-semibold mb-2">
                <a href={`/car/${car.slug}`} className="text-black hover:no-underline">
                  {car.name}
                </a>
              </h2>
              <p className="text-gray-600 mb-4">{car.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-red-600">
                  {typeof car.price === 'number'
                    ? `$${car.price.toFixed(2)}`
                    : car.price || 'N/A'}
                </p>
                {car.discountedPrice !== null && car.discountedPrice < car.price ? (
                  <p className="text-lg font-semibold text-green-600 line-through">
                    ${car.discountedPrice.toFixed(2)}
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
