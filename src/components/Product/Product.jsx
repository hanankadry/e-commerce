import { Button } from "@heroui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../contexts/CartContext";

export default function Product({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { getCartItems } = useContext(cartContext);

  async function addProductToCart(productId) {
    setIsLoading(true);
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
        getCartItems();
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
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

  return (
    <div className="flex flex-col justify-between mx-auto w-full overflow-hidden rounded-lg hover:shadow-[1px_1px_10px_rgba(0,0,0,0.25)] hover:shadow-green-500 transition-shadow duration-300 cursor-pointer">
      <div className="">
        <Link
          to={"/product-details/" + product._id}
          className="overflow-hidden"
        >
          <img
            className="w-full object-contain object-center duration-300 hover:scale-[103%]"
            src={product.imageCover}
            alt={product.title}
          />
        </Link>
        <div className="p-4 pb-0">
          <h2 className="mb-2 text-lg font-small text-green-600 line-clamp-1">
            {product.category.name}
          </h2>
          <p className="mb-2 font-semibold text-gray-700 line-clamp-3">
            {product.title}
          </p>
          <div className="flex items-center justify-between">
            <p className="mr-2 text-md font-normal text-gray-900">
              {product.price} EGP
            </p>
            <Button
              className="relative text-red-500 transition-none p-0 m-0"
              color="none"
              onPress={() => wishlist(product._id)}
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
        </div>
      </div>
      <div className="m-4">
        <Button
          onPress={() => {
            addProductToCart(product?._id);
          }}
          isLoading={isLoading}
          className="w-full hover:bg-green-500 hover:text-black"
          color="success"
          variant="bordered"
          endContent={<i className="fa-solid fa-cart-shopping"></i>}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
