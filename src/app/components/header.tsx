import Link from 'next/link';
import { FaShoppingCart, FaUser, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; 
import Image from 'next/image';  // Import Image from next/image
import SearchBar from './productlisting'; 

const Header = () => {
  return (
    <header>
      {/* Top Header */}
      <div className="bg-blue-500 text-white text-sm sm:text-lg pt-3 h-14 font-bold w-full flex justify-between items-center px-4 relative">
        {/* WhatsApp Number and Email (on mobile, stacked vertically) */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* WhatsApp Icon and Link */}
          <div className="flex items-center space-x-2">
            <FaWhatsapp size={20} className="text-green-500" /> {/* WhatsApp Icon */}
            <a
              href="https://wa.me/message/SMMUSWNPHGLBK1"  // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xs sm:text-sm hover:underline"
              aria-label="WhatsApp Chat"
            >
              <span>0123-45678</span>
            </a>
          </div>

          {/* Email Icon and Link */}
          <div className="flex items-center space-x-2">
            <FaEnvelope size={20} className="text-white" /> {/* Email Icon */}
            <a
              href="mailto:example@example.com"  // Replace with your email address
              className="text-white text-xs sm:text-sm hover:underline"
              aria-label="Send an email"
            >
              <span>customer.ecorner@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Welcome Message */}
        <p className="absolute left-1/2 transform -translate-x-1/2 text-xs sm:text-lg">Welcome To E-Corner</p>
      </div>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-900 shadow-md p-4">
        {/* Logo */}
        <div className="logo flex justify-center sm:justify-start w-full sm:w-auto">
          <Link href="/">
            {/* Replace img with Image component */}
            <Image
              src="/image.png"  // Make sure to use your actual image path
              alt="Auto Store Logo"
              className="h-32 pl-6 pt-0"
              width={128}  // Set width for the image
              height={128}  // Set height for the image
              priority  // Optional: if this is a key image, load it with priority
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full sm:w-auto sm:max-w-2xl mx-auto mt-4 sm:mt-0">
          <SearchBar />
        </div>

        {/* Header Options */}
        <div className="flex items-center space-x-6 sm:space-x-4 mt-4 sm:mt-0">
          {/* Cart */}
          <div className="cart flex items-center space-x-2">
            <Link href="/cart" aria-label="Go to cart" className="text-red-500 hover:underline flex items-center">
              <FaShoppingCart size={20} />
              <span className="ml-1">Shopping Bag</span>
            </Link>
            <span className="cart-count bg-red-500 text-white rounded-full px-2 text-sm">0</span> {/* Dynamic Cart Count */}
          </div>

          {/* Profile Icon */}
          <div className="profile">
            <Link href="/signup" aria-label="Go to profile" className="text-white hover:text-red-500 flex items-center">
              <FaUser size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;








