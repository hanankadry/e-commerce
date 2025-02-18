import React from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({ isOpen, setModalOpen, brand }) {
  if (!isOpen) return null;
  const navigate = useNavigate();

  function getProducts(id) {
    navigate(`/products/${id}/brands`);
    setModalOpen(false);
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{brand.name}</h2>
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full object-cover rounded-t-md mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={() => getProducts(brand._id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Get Products
          </button>
        </div>
      </div>
    </div>
  );
}
