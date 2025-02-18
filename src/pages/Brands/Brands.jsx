import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState({});

  useEffect(() => {
    getAllBrands();
  }, []);

  async function getAllBrands() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
        console.log(data);
        setBrands(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Brands</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedBrand(brand);
                  setIsModalOpen(true);
                }}
                className="border rounded-lg flex flex-col items-center hover:shadow-[1px_1px_10px_rgba(0,0,0,0.25)] hover:shadow-green-500 transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full object-cover rounded-t-md mb-4"
                />
                <h2 className="text-xl text-center font-medium text-green-700 p-3">
                  {brand.name}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        brand={selectedBrand}
      />
    </>
  );
}
