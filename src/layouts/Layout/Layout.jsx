import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { authContext } from "../../contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function Layout() {
  const { isLoading } = useContext(authContext);
  return (
    <>
      <Navbar />
      <div className="container py-10 min-h-screen">
        {isLoading ? <LoadingScreen /> : <Outlet />}
      </div>
      <div className="flex flex-col">
        <Footer />
      </div>
    </>
  );
}
