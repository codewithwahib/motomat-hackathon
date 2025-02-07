// File: src/app/pages/touring-gadgets-page.tsx
import { useState, useEffect } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from './dropdown';
import Image from 'next/image';
import Loading from '@/app/components/loading';
import { useCart } from '@/app/contexts/cartcontext';

// Define the structure of a Gadget
interface Gadget {
  name: string;
  price: number;
  discountedPrice?: number | null;
  imageUrl: string;
  slug: string;
}

export default function TouringGadgetsPage() {
  const [touringGadgets, setTouringGadgets] = useState<Gadget[]>([]);
  const [trendingGadgets, setTrendingGadgets] = useState<Gadget[]>([]);
  const [bikes, setBikes] = useState<Gadget[]>([]);
  const [cars, setCars] = useState<Gadget[]>([]);
  const [loading, setLoading] = useState(true);

  // Get addToCart from the cart context
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        const gadgetsData = await client.fetch(`
          *[_type == "product"]{
            name,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);
        const trendingData = await client.fetch(`
          *[_type == "trending"]{
            name,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);
        const bikeData = await client.fetch(`
          *[_type == "bike"]{
            name,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);
        const carData = await client.fetch(`
          *[_type == "car"]{
            name,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setTouringGadgets(gadgetsData);
        setTrendingGadgets(trendingData);
        setBikes(bikeData);
        setCars(carData);
      } catch (error) {
        console.error('Error fetching gadgets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
  }, []);

  // When a product is added, create a cart item and call addToCart
  const handleAddToCart = (gadget: Gadget) => {
    const cartItem = {
      id: gadget.slug, // Use slug as the unique identifier (or use a proper id if available)
      name: gadget.name,
      price: gadget.price,
      discountedPrice: gadget.discountedPrice,
      imageUrl: gadget.imageUrl,
      slug: gadget.slug,
      quantity: 1, // Start with a quantity of 1
    };
    addToCart(cartItem);
    console.log(`Added to cart: ${gadget.name}`);
    alert(`${gadget.name} has been added to your cart.`);
  };

  const renderProductList = (productList: Gadget[], title: string) => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 flex items-center justify-center">
        <span className="flex-grow h-[1px] bg-gray-300 mr-4 hidden sm:block"></span>
        {title}
        <span className="flex-grow h-[1px] bg-gray-300 ml-4 hidden sm:block"></span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {productList.length > 0 ? (
          productList.map((gadget, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
            >
              {gadget.imageUrl ? (
                <a href={`/product/${gadget.slug}`} className="block">
                  <Image
                    src={gadget.imageUrl}
                    alt={gadget.name}
                    width={500}
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
                <a
                  href={`/products/${gadget.slug}`}
                  className="text-black hover:no-underline"
                >
                  {gadget.name}
                </a>
              </h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold text-red-600">
                  {typeof gadget.price === 'number'
                    ? `$${gadget.price.toFixed(2)}`
                    : gadget.price || 'N/A'}
                </p>
                {gadget.discountedPrice &&
                gadget.discountedPrice < gadget.price ? (
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
            No product available.
          </p>
        )}
      </div>
    </div>
  );

  if (loading)
    return <p className="text-center mt-10 text-xl"><Loading /></p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      {renderProductList(touringGadgets, 'Touring Gadgets')}
      {renderProductList(trendingGadgets, 'Trending Gadgets')}
      {renderProductList(bikes, 'Bike Gadgets')}
      {renderProductList(cars, 'Car Gadgets')}
      <Footer />
    </div>
  );
}
