import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from '@/pages/dropdown';

const ProductDetailsPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const queries = [
          {
            type: 'product',
            query: `*[_type == "product" && slug.current == $slug]{
              name,
              description,
              price,
              discountedPrice,
              "imageUrl": image.asset->url
            }`,
          },
          // Add other queries as needed
        ];

        for (const { type, query } of queries) {
          const result = await client.fetch(query, { slug });
          if (result.length > 0) {
            setData({ type, ...result[0] });
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  if (!data) return <p className="text-center mt-10 text-xl">Item not found</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails data={data} />
      </main>
      <Footer />
    </div>
  );
};

const ProductDetails = ({ data }: { data: any }) => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-center text-gray-800">{data.name}</h1>
    <div className="flex flex-col md:flex-row gap-8">
      <ProductImage imageUrl={data.imageUrl} name={data.name} />
      <ProductInfo
        description={data.description}
        price={data.price}
        discountedPrice={data.discountedPrice}
      />
    </div>
  </div>
);

const ProductImage = ({ imageUrl, name }: { imageUrl: string; name: string }) => (
  <img
    src={imageUrl}
    alt={`Image of ${name}`}
    className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-lg"
  />
);

const ProductInfo = ({
  description,
  price,
  discountedPrice,
}: {
  description: string;
  price: number | string;
  discountedPrice: number | null;
}) => (
  <div className="md:w-1/2 space-y-4">
    <p className="text-gray-600 text-lg">{description}</p>
    <div className="flex items-center space-x-4">
      <p className="text-2xl font-bold text-gray-800">
        {typeof price === 'number' ? `$${price.toFixed(2)}` : price || 'N/A'}
      </p>
      {discountedPrice !== null && typeof discountedPrice === 'number' && (
        <p className="text-lg font-semibold text-green-600 line-through">
          ${discountedPrice.toFixed(2)}
        </p>
      )}
    </div>
  </div>
);

export default ProductDetailsPage;

