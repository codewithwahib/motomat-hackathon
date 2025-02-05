import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    // Handle form submission (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <>
      {/* Header */}
      <Header />

      <main className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Log In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Login;
