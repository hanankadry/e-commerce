import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        console.log(data);
        setCategories(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function getSubCategories(categoryId, name) {
    setIsLoading(true);
    await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      )
      .then(({ data }) => {
        console.log(data);
        setSubCategories(data?.data);
        setCategoryName(name);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getProducts(id) {
    navigate(`/products/${id}/subcategories`);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">All Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories?.map((category, index) => (
            <div
              key={index}
              onClick={() => getSubCategories(category._id, category.name)}
              className="border rounded-lg flex flex-col items-center hover:shadow-[1px_1px_10px_rgba(0,0,0,0.25)] hover:shadow-green-500 transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[300px] object-cover rounded-t-md mb-4"
              />
              <h2 className="text-xl text-center font-medium text-green-700 p-3">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {subCategories == null ? (
        <></>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            All w{categoryName} Subcategories
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subCategories?.map((subCategory, index) => (
              <div
                key={index}
                onClick={() => getProducts(subCategory._id)}
                className="border rounded-lg flex items-center justify-center hover:shadow-[1px_1px_10px_rgba(0,0,0,0.25)] hover:shadow-green-500 transition-shadow duration-300 cursor-pointer"
              >
                <h2 className="text-xl text-center font-medium p-3">
                  {subCategory.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
