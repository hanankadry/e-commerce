import { Button } from "@heroui/react";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export default function CartItem({ item, getUserCart }) {
  //   add one item
  async function addItem(productId) {
    console.log(productId);
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: item.count + 1,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("product added to cart");
        getUserCart();
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  }
  //   remove one item
  async function removeItem(productId) {
    console.log(productId);
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: item.count - 1,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("product removed from cart");
        getUserCart();
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  }

  //   remove all
  async function removeAll(productId) {
    console.log(productId);
    await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("product removed from cart");
        getUserCart();
      })
      .catch((err) => {
        console.error(err);
        toast.error("something went wrong");
      });
  }

  return (
    <>
      <div className="grid grid-cols-12 border-b border-gray-300 my-3 p-3 rounded shadow-sm">
        <div className="col-span-2">
          <div className="w-full">
            <img
              src={item.product.imageCover}
              alt={item.product.title}
              className="w-full h-auto rounded mr-4"
            />
          </div>
        </div>
        <div className="col-span-10 flex items-center justify-between p-3">
          <div>
            <h2 className="text-lg font-semibold">{item.product.title}</h2>
            <p className="text-gray-600">{item.price} EGP</p>
            <Button
              onPress={() => removeAll(item.product.id)}
              className="text-red-500 hover:text-white hover:bg-red-500 my-2 p-2"
              color="none"
              startContent={<i className="fa-solid fa-trash"></i>}
            >
              Remove
            </Button>
          </div>
          <div className="flex items-center justify-around">
            <Button
              onPress={() => addItem(item.product.id)}
              className="min-w-max hover:bg-green-500 text-black px-2 py-1 mx-4 rounded"
              color="success"
              variant="bordered"
            >
              +
            </Button>
            <span>{item.count}</span>
            <Button
              onPress={() => removeItem(item.product.id)}
              className="min-w-max hover:bg-green-500 text-black px-2 py-1 mx-4 rounded"
              color="success"
              variant="bordered"
            >
              -
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
