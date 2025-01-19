import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa'; // Import should be at the top of the file

const Header = () => {
  return (
    <header>
      {/* Top Header */}
      <div className="bg-black text-white text-center text-lg pt-3 h-14 font-bold w-full">
        <p>Welcome To Moto Mart | بسم الله الرحمن الرحيم</p>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center bg-black shadow-md p-4">
        {/* Logo */}
<div className="logo">
  <Link href="/">
    <img src="/image.png" alt="Auto Store Logo" className="h-32 pl-6 pt-0" />
  </Link>
</div>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-white bg-black text-white rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button className="bg-white text-black px-4 py-2 rounded-r hover:bg-red-600 flex items-center space-x-2">
            <span className="text-lg">🔍</span>
            <span>Search</span>
          </button>
        </div>

        {/* Header Options */}
        <div className="flex items-center space-x-6">
          <div className="account">
            <Link href="#" className="text-red-500 hover:underline">
              Login / Signup
            </Link>
          </div>

          <div className="cart flex items-center space-x-2">
            <FaShoppingCart className="text-red-500 text-lg" />
            <span className="text-red-500">Cart</span>
            <span className="cart-count bg-red-500 text-white rounded-full px-2 text-sm">0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

