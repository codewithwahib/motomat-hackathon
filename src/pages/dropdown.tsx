import React from 'react';
import Link from 'next/link';

const DropdownMenu: React.FC = () => {
  return (
    <nav className="bg-white text-black font-sans">
      <ul className="flex flex-wrap justify-center">
        {[
          { label: 'Home', href: '/' },
          { label: 'Sale', href: '/sale' },
          { label: 'Car Accessories', href: '/car-accessories' },
          { label: 'Bike Accessories', href: '/bike-accessories' },
          { label: 'Car Care Products', href: '/car-care-products' },
          { label: 'Touring Gadgets', href: '/touring-gadgets' },
          { label: 'Bike Parts', href: '/bike-parts' },
          { label: 'Search By Bikes', href: '/search-by-bikes' },
          { label: 'Search By Cars', href: '/search-by-cars' },
        ].map((menuItem, index) => (
          <li key={index} className="relative group">
            <Link
              href={menuItem.href}
              className="block px-6 py-4 text-xl font-medium tracking-wider text-black hover:text-red-600 transition-colors"
            >
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
