import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';
import Image from 'next/image'; // Importing Image from next/image for better optimization

// Define the structure of a Car
interface Car {
  name: string;
  price: number;
  discountedPrice?: number | null; // `discountedPrice` is optional and can be null
  imageUrl: string;
  slug: string;
}

export default function SearchByCarsPage() {
  const [cars, setCars] = useState<Car[]>([]); // Use the Car type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchByCars = async () => {
      try {
        const carsData = await client.fetch(`
          *[_type == "search-by-cars"]{
            name,
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

  const handleAddToCart = (car: Car) => {
    console.log('Added to cart:', car);
    // Add your cart functionality here (e.g., updating global state or localStorage)
    alert(`${car.name} has been added to your cart.`);
  };

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 flex items-center justify-center">
          <span className="flex-grow h-[1px] bg-gray-300 mr-4 hidden sm:block"></span>
          Phone Cases
          <span className="flex-grow h-[1px] bg-gray-300 ml-4 hidden sm:block"></span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
              >
                {car.imageUrl ? (
                  <a href={`/product/${car.slug}`} className="block">
                    <Image
                      src={car.imageUrl}
                      alt={car.name}
                      width={500} // Add appropriate width and height
                      height={500}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-lg mb-4"
                    />
                  </a>
                ) : (
                  <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
                <h2 className="text-sm sm:text-lg font-semibold mb-2">
                  <a href={`/car/${car.slug}`} className="text-black hover:no-underline">
                    {car.name}
                  </a>
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-bold text-red-600">
                    {typeof car.price === 'number'
                      ? `$${car.price.toFixed(2)}`
                      : car.price || 'N/A'}
                  </p>
                  {car.discountedPrice != null && car.discountedPrice < car.price ? (
                    <p className="text-lg font-semibold text-green-600 line-through">
                      ${car.discountedPrice?.toFixed(2)}
                    </p>
                  ) : null}
                </div>
                <button
                  onClick={() => handleAddToCart(car)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg text-xs sm:text-base hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition mt-4"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg font-semibold text-gray-500">
              No cars available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
