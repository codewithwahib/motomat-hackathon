// File: src/pages/cart.tsx

import Image from 'next/image';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
import { useCart } from '@/app/contexts/cartcontext';
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  // Increase the quantity for the given item
  const handleIncrease = (id: string) => {
    updateQuantity(id, 'increase');
  };

  // Decrease the quantity for the given item
  const handleDecrease = (id: string) => {
    updateQuantity(id, 'decrease');
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-200 rounded-lg p-4 shadow-lg bg-white"
              >
                <div className="flex items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      Rs{' '}
                      {typeof item.price === 'number'
                        ? item.price.toFixed(2)
                        : Number(item.price).toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
                        disabled={item.quantity <= 1}
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
            <h2 className="text-xl font-semibold">
              Total: Rs{' '}
              {typeof getTotalPrice() === 'number'
                ? getTotalPrice().toFixed(2)
                : Number(getTotalPrice()).toFixed(2)}
            </h2>
            <Link
              href="/checkout"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 inline-block"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
