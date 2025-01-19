import { useState, useEffect } from 'react';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { client } from '@/sanity/lib/client';
import Hero from './hero'; // Import Hero component
import DropdownMenu from './dropdown';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [bikes, setBikes] = useState<any[]>([]); // State for bike data
  const [cars, setCars] = useState<any[]>([]); // State for car data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await client.fetch(`
          *[_type == "product"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        const trendingData = await client.fetch(`
          *[_type == "trending"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        const bikeData = await client.fetch(`
          *[_type == "bike"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        const carData = await client.fetch(`
          *[_type == "car"]{
            name,
            description,
            price,
            discountedPrice,
            "imageUrl": image.asset->url,
            "slug": slug.current
          }
        `);

        setProducts(productsData);
        setTrendingProducts(trendingData);
        setBikes(bikeData);
        setCars(carData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  const renderProductList = (productList: any[], title: string) => (
    <div className="container mx-auto px-0 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productList.map((product, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 shadow-lg bg-white transform transition duration-300 hover:scale-105"
          >
            {product.imageUrl && (
              <a href={`/product/${product.slug}`} className="block">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg mb-4"
                />
              </a>
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
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <DropdownMenu />
      <Hero /> {/* Added Hero component after Header */}
      {renderProductList(products, 'Product List')}
      {renderProductList(trendingProducts, 'Trending Products')}
      {renderProductList(bikes, 'Bike Products')}
      {renderProductList(cars, 'Car Products')} {/* Render car data */}
      <Footer />
    </div>
  );
}
