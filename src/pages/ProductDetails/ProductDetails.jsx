import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

export default function ProductDetails() {
  let { id } = useParams();
  const [isActive, setIsActive] = useState(false);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  async function getProductDetails() {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductData(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function addProductToCart(productId) {
    setIsAddLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success("product added to cart");
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsAddLoading(false);
      });
  }

  async function addProductToWishlist(productId) {
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success("product added to wishlist");
        setIsActive(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  }
  async function removeProductFromWishlist(productId) {
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("product removed from wishlist");
        setIsActive(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  }

  function wishlist(id) {
    if (isActive) {
      removeProductFromWishlist(id);
    } else {
      addProductToWishlist(id);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 p-4 relative">
            <div className=" ">
              <Slider {...settings}>
                {productData?.images.map((img, index) => {
                  return (
                    <img
                      key={index}
                      src={img}
                      alt={productData?.title}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {productData?.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              {productData?.description}
            </p>
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                {productData?.ratingsAverage} ★
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {productData?.ratingsQuantity} reviews
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ${productData?.price}
                </span>
              </div>
              <Button
                className="relative text-red-500 transition-none p-0 m-0"
                color="none"
                onPress={() => wishlist(productData?._id)}
              >
                <svg
                  className="w-6 h-6"
                  fill={isActive ? "#dc2626" : "none"}
                  stroke={isActive ? "#dc2626" : "currentColor"}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Button>
            </div>
            <p className="text-green-600 text-sm font-semibold mb-4">
              Free Delivery
            </p>
            <div className="flex">
              <Button
                isLoading={isAddLoading}
                onPress={() => addProductToCart(productData?.id)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <RelatedProducts products={productData} />
      </div>
    </>
  );
}
