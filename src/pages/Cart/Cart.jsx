import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Button } from "@heroui/react";
import { cartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { setCartCount, cartCount, setCartItems, cartItems } =
    useContext(cartContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart();
  }, []);

  async function getUserCart() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        console.log(data)
        setCartItems(data);
        setCartCount(data?.numOfCartItems);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function clearCart() {
    setIsLoading(true);
    await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token,
        },
      })
      .then((res) => {
        getUserCart();
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
      <div className="container bg-[#F8F9FA] rounded my-5 p-11">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold mb-4">Cart</h1>
          <Button
            className="text-lg hover:text-white px-4 py-2 rounded hover:bg-blue-600"
            color="primary"
            onPress={() => navigate(`/checkout/${cartItems?.cartId}`)}
          >
            Checkout
          </Button>
        </div>
        <div className="w-full flex justify-between">
          <p className="text-lg">
            Total Price:{" "}
            <span className="text-green-500 font-semibold">
              {cartItems == null ? 0 : cartItems?.data?.totalCartPrice} EGP
            </span>
          </p>
          <p className="text-lg">
            Total Number of Items:{" "}
            <span className="text-green-500 font-semibold">
              {cartItems == null ? 0 : cartCount}
            </span>
          </p>
        </div>

        {cartItems?.numOfCartItems == 0 ? (
          <h1 className="text-xl font-semibold text-center m-4">
            Cart is empty
          </h1>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems?.data?.products.map((item, index) => {
                return (
                  <CartItem key={index} item={item} getUserCart={getUserCart} />
                );
              })}
            </div>
            <Button
              onPress={clearCart}
              isLoading={isLoading}
              className="mt-6 text-lg text-black hover:text-white px-6 py-2 rounded hover:bg-green-600"
              color="success"
              variant="bordered"
            >
              Clear Your Cart
            </Button>
          </>
        )}
      </div>
    </>
  );
}
