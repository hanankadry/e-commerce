import { Button } from "@heroui/react";
import React, { useContext, useState } from "react";
import { cartContext } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function WishlistItem({ item, getUserWishlist }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const { getCartItems } = useContext(cartContext);

  async function addToCart(productId) {
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
        removeFromWishlist(productId);
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function removeFromWishlist(productId) {
    setIsDelLoading(true);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        toast.success("product removed from wishlist");
        getUserWishlist();
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsDelLoading(false);
      });
  }

  return (
    <>
      <div className="grid grid-cols-12 border-b border-gray-300 my-3 p-3 rounded shadow-sm">
        <div className="col-span-2">
          <div className="w-full">
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-full h-auto rounded mr-4"
            />
          </div>
        </div>
        <div className="col-span-10 flex items-center justify-between p-3">
          <div>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.price} EGP</p>
            <Button
              onPress={() => removeFromWishlist(item.id)}
              isLoading={isDelLoading}
              className="text-red-500 hover:text-white hover:bg-red-500 my-2 p-2"
              color="none"
              startContent={<i className="fa-solid fa-trash"></i>}
            >
              Remove
            </Button>
          </div>
          <div className="flex items-center justify-around">
            <Button
              onPress={() => addToCart(item.id)}
              isLoading={isLoading}
              className="min-w-max hover:bg-green-500 text-black px-2 py-1 mx-4 rounded"
              color="success"
              variant="bordered"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
