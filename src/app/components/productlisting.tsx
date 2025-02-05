import { useState } from 'react';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';

type Product = {
  _id: string;
  name: string;
  slug?: { current: string }; // Make `slug` optional
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches

    try {
      // Correct Sanity GROQ query
      const searchQuery = `*[_type == "product" && name match $searchQuery]`;

      // Use 'searchQuery' as the key instead of 'query'
      const params = { searchQuery: `*${query.toLowerCase()}*` };

      // Fetch results
      const results: Product[] = await client.fetch(searchQuery, params);
      setProducts(results);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className="flex items-center w-full max-w-2xl mx-auto relative">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-white bg-black text-white rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        onClick={handleSearch}
        className="bg-white text-black px-4 py-2 rounded-r hover:bg-red-600 flex items-center space-x-2"
      >
        <span className="text-lg">🔍</span>
        <span>Search</span>
      </button>

      {products.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white shadow-lg rounded-lg p-2 z-10">
          {products.map((product) => (
            <Link href={`/product/${product.slug?.current}`} key={product._id} className="block px-4 py-2 hover:bg-gray-100 text-black">
              {product.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
