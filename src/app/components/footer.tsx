import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-black w-full flex md:flex-row flex-col justify-around items-start p-0">
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-3xl pb-6">
              Moto<span className="text-red-500">Mart</span>
            </p>
            <div className="flex gap-6 pb-5 text-white">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-red-500 font-bold text-2xl pb-4">Product</p>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Stocks
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Futures & Options
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Mutual Funds
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Fixed deposits
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-red-500 font-bold text-2xl pb-4">Company</p>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              About
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Products
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Pricing
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Careers
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Press & Media
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-red-500 font-bold text-2xl pb-4">Support</p>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Contact
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Support Portals
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              List Of Charges
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Downloads & Resources
            </li>
            <li className="text-white text-md pb-2 font-semibold hover:text-red-600 cursor-pointer">
              Videos
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-5 bg-black">
        <h1 className="text-white font-semibold">
          © 2025 All rights reserved by motomart
          
        </h1>
      </div>
    </>
  );
};

export default Footer;
