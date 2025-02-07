import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';
import Image from 'next/image'; // Importing Image from next/image for optimization
import Loading from '@/app/components/loading';

// Define the structure of a Gadget
interface Gadget {
  name: string;
  price: number;
  discountedPrice?: number | null;
  imageUrl: string;
  slug: string;
}

export default function TouringGadgetsPage() {
  const [touringGadgets, setTouringGadgets] = useState<Gadget[]>([]); // Use the Gadget type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTouringGadgets = async () => {
      try {
        const gadgetsData = await client.fetch(`
          *[_type == "car-accessories"]{
            name,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);
        setTouringGadgets(gadgetsData);
      } catch (error) {
        console.error('Error fetching touring gadgets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTouringGadgets();
  }, []);

  const handleAddToCart = (gadget: Gadget) => {
    console.log(`Added to cart: ${gadget.name}`);
    alert(`${gadget.name} has been added to your cart.`);
  };

  if (loading) return <p className="text-center mt-10 text-xl"><Loading/></p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 flex items-center justify-center">
          <span className="flex-grow h-[1px] bg-gray-300 mr-4 hidden sm:block"></span>
          Charging
          <span className="flex-grow h-[1px] bg-gray-300 ml-4 hidden sm:block"></span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {touringGadgets.length > 0 ? (
            touringGadgets.map((gadget, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
              >
                {gadget.imageUrl ? (
                  <a href={`/product/${gadget.slug}`} className="block">
                    <Image
                      src={gadget.imageUrl}
                      alt={gadget.name}
                      width={500} // Set the appropriate width
                      height={500} // Set the appropriate height
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-lg mb-4"
                    />
                  </a>
                ) : (
                  <div className="w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 rounded-t-lg mb-4 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}
                <h2 className="text-sm sm:text-lg font-semibold mb-2">
                  <a href={`/product/${gadget.slug}`} className="text-black hover:no-underline">
                    {gadget.name}
                  </a>
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-bold text-red-600">
                    {typeof gadget.price === 'number'
                      ? `$${gadget.price.toFixed(2)}`
                      : gadget.price || 'N/A'}
                  </p>
                  {gadget.discountedPrice && gadget.discountedPrice < gadget.price ? (
                    <p className="text-lg font-semibold text-green-600 line-through">
                      ${gadget.discountedPrice?.toFixed(2)}
                    </p>
                  ) : null}
                </div>
                <button
                  onClick={() => handleAddToCart(gadget)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg text-xs sm:text-base hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition mt-4"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg font-semibold text-gray-500">
              No prducts available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
