import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    verifyUserToken();
    window.addEventListener("storage", verifyUserToken);
    return () => window.removeEventListener("storage", verifyUserToken);
  }, []);

  function verifyUserToken() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </authContext.Provider>
  );
}
