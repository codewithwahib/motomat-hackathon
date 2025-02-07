import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black font-sans">
      {/* Hamburger Icon */}
      <div className="sm:hidden flex justify-end p-4">
        <button onClick={toggleMenu} className="text-black">
          {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </button>
      </div>

      {/* Menu for Desktop */}
      <ul className="hidden sm:flex flex-wrap justify-center">
        {[
          { label: 'Home', href: '/' },
          { label: 'Sale', href: '/sale' },
          { label: 'Charging', href: '/charging' },
          { label: 'Laptop', href: '/laptop' },
          { label: 'Cables', href: '/cables' },
          { label: 'Smart Watches', href: '/smartwatches' },
          { label: 'Earbuds', href: '/earbuds' },
          { label: 'Gaming', href: '/gaming' },
          { label: 'Phone Cases', href: '/phonecases' },
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

      {/* Burger Menu for Mobile */}
      <ul
        className={`sm:hidden ${isOpen ? 'block' : 'hidden'} absolute w-full bg-white top-0 left-0 right-0 shadow-lg z-10`}
      >
        {[
          { label: 'Home', href: '/' },
          { label: 'Sale', href: '/sale' },
          { label: 'Charging', href: '/charging' },
          { label: 'Laptop', href: '/laptop' },
          { label: 'Cables', href: '/cables' },
          { label: 'Smart Watches', href: '/smartwatches' },
          { label: 'Earbuds', href: '/earbuds' },
          { label: 'Gaming', href: '/gaming' },
          { label: 'Phone Cases', href: '/phonecases' },
        ].map((menuItem, index) => (
          <li key={index} className="border-b border-gray-300">
            <Link
              href={menuItem.href}
              className="block px-6 py-4 text-xl font-medium text-black hover:text-red-600 transition-colors"
              onClick={() => setIsOpen(false)} // Close the menu when an item is clicked
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
