import React, { useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import Login from "../pages/Login/Login";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(authContext);

  return <>{isLoggedIn ? children : <Login />}</>;
}
