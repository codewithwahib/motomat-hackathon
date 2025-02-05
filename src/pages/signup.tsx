import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
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
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Create an Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-red-500 hover:underline">
            Log In
          </Link>
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Signup;

