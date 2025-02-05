import { useState } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const items = [
    { name: 'Product 1', quantity: 2, price: 20 },
    { name: 'Product 2', quantity: 1, price: 50 },
  ];

  const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateTrackingNumber = () => {
    return `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrackingNumber = generateTrackingNumber();
    setTrackingNumber(newTrackingNumber);
    setOrderPlaced(true);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        {orderPlaced ? (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-700 mb-2">Thank you for your purchase, {formData.fullName}!</p>
            <p className="text-gray-700 mb-4">
              Your tracking number is: <span className="font-bold text-blue-600">{trackingNumber}</span>
            </p>
            <p className="text-gray-600">You will receive an email confirmation shortly.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div>
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <ul className="divide-y divide-gray-300">
                  {items.map((item, index) => (
                    <li key={index} className="flex justify-between py-2">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${item.quantity * item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Shipping & Payment</h2>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={formData.zip}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiration"
                    placeholder="Expiration (MM/YY)"
                    value={formData.expiration}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-4"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
