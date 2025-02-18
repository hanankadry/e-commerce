import React from "react";

export default function Footer() {
  return (
    <footer className="flex-grow bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Fresh Cart</h2>
            <p className="text-sm text-gray-400">
              © 2025 Fresh Cart By Hanan Abdelkader. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-400 hover:text-white"
          >
            <i className="fa-brands fa-facebook fa-xl"></i>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-400 hover:text-white"
          >
            <i className="fa-brands fa-twitter fa-xl"></i>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white"
          >
            <i className="fa-brands fa-instagram fa-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
