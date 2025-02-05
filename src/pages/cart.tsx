import Image from 'next/image';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { useCart } from '@/app/contexts/cartcontext';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from 'next/link';

// Create an image URL builder instance
const builder = imageUrlBuilder(client);

// Helper function to generate image URL from SanityImageSource
const urlFor = (source: SanityImageSource) => builder.image(source).url();

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleIncrease = (id: string) => updateQuantity(id, 'increase');
  const handleDecrease = (id: string) => updateQuantity(id, 'decrease');

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-lg bg-white"
              >
                <div className="flex items-center">
                  <Image
                    src={item.imageUrl ? urlFor(item.imageUrl) : '/placeholder-image.jpg'}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Rs {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="mt-8 text-right">
            <h2 className="text-xl font-semibold">Total: Rs {getTotalPrice()}</h2>
            <Link href="/checkout">
              <a className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 inline-block">
                Checkout
              </a>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;











