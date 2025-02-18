import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "../Products/Products";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const brandSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 5,
  };

  const categorySettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 3,
  };

  useEffect(() => {
    getAllCategories();
    getAllBrands();
  }, []);

  async function getAllCategories() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function getAllBrands() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({ data }) => {
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
      <div className="flex flex-col g-4">
        <div className=" w-2/3 mx-auto m-5 pb-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Browse Our Different Categories
          </h1>
          <Slider {...categorySettings} className="p-5">
            {categories?.map((category, index) => {
              return (
                <div key={index} className="px-1">
                  <div
                    key={index}
                    onClick={() => navigate(`/products/${category._id}/categories`)}
                    className="border rounded-lg flex flex-col items-center cursor-pointer"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-[200px] object-cover rounded-t-md mb-4"
                    />
                    <h2 className="text-xl text-center font-medium p-3">
                      {category.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="mb-5 bg-slate-100 p-6">
          <h1 className="text-2xl font-bold text-center mb-6 capitalize text-green-500">
            Check out the latest from you favourite brands
          </h1>
          <Slider {...brandSettings} className="p-5">
            {brands?.map((brand, index) => {
              return (
                <div key={index} className="px-1">
                  <div
                    key={index}
                    onClick={() => navigate(`/products/${brand._id}/brands`)}
                    className="border border-black rounded-lg flex flex-col items-center cursor-pointer"
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-[100px] object-cover rounded-t-md mb-4"
                    />
                    <h2 className="text-xl text-center font-medium p-3">
                      {brand.name}
                    </h2>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="m-5">
          <Products />
        </div>
      </div>
    </>
  );
}
