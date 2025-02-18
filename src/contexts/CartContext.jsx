import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    getCartItems();
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  function getCartItems() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setCartItems(data?.data);
        setCartCount(data?.numOfCartItems);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <cartContext.Provider
      value={{ cartItems, cartCount, setCartCount, setCartItems, getCartItems }}
    >
      {children}
    </cartContext.Provider>
  );
}
