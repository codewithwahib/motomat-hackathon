import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../app/components/header';
import Footer from '../../app/components/footer';
import { client } from '@/sanity/lib/client';
import DropdownMenu from '@/pages/dropdown';
import Image from 'next/image';
import Loading from '@/app/components/loading';

interface Product {
  name: string;
  description: string;
  price: number | string | null;
  discountedPrice: number | null;
  imageUrl: string;
  inStock: boolean;
}

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const fetchProductDetails = async () => {
      try {
        const productQuery = `*[_type in ["trending", "product", "bike", "car","sale","car-accessories","bike-accessories","car-care-products","touring-gadgets","bike-parts","search-by-bikes","search-by-cars"] && slug.current == $slug][0]{
          name,
          description,
          price,
          discountedPrice,
          "imageUrl": image.asset->url,
          inStock
        }`;

        const productData = await client.fetch(productQuery, { slug });
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  if (loading) return <p className="text-center mt-10 text-xl"><Loading /></p>;
  if (!product) return <p className="text-center mt-10 text-xl">Product not found</p>;

  return (
    <div>
      <Header />
      <DropdownMenu />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </div>
  );
};

const ProductDetails = ({ product }: { product: Product }) => (
  <div className="space-y-8">
    <h1 className="text-4xl font-bold text-center text-gray-800">{product.name}</h1>
    <div className="flex flex-col md:flex-row gap-8">
      <ProductImage imageUrl={product.imageUrl} name={product.name} />
      <ProductInfo
        description={product.description}
        price={product.price}
        discountedPrice={product.discountedPrice}
        inStock={product.inStock}
      />
    </div>
  </div>
);

const ProductImage = ({ imageUrl, name }: { imageUrl: string; name: string }) => (
  <div className="w-full md:w-1/2 h-auto">
    <Image
      src={imageUrl}
      alt={`Image of ${name}`}
      width={500}
      height={500}
      className="object-cover rounded-lg shadow-lg"
    />
  </div>
);

const ProductInfo = ({
  description,
  price,
  discountedPrice,
  inStock,
}: {
  description: string;
  price: number | string | null;
  discountedPrice: number | null;
  inStock: boolean;
}) => (
  <div className="md:w-1/2 space-y-4">
    <p className="text-gray-600 text-lg">{description}</p>
    <div className="flex items-center space-x-4">
      <p className="text-2xl font-bold text-gray-800">
        {typeof price === 'number' ? `$${price.toFixed(2)}` : price || 'N/A'}
      </p>
      {discountedPrice !== null && typeof discountedPrice === 'number' && (
        <p className="text-lg font-semibold text-red-600 line-through">
          ${discountedPrice.toFixed(2)}
        </p>
      )}
    </div>
    <p className={`text-lg font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
      {inStock ? 'In Stock' : 'Out of Stock'}
    </p>
    <button
      className={`w-full py-2 px-4 text-white ${inStock ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition`}
      disabled={!inStock}
    >
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  </div>
);

export default ProductDetailsPage;
