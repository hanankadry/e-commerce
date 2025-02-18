import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import Brands from "./pages/Brands/Brands";
import NotFound from "./pages/NotFound/NotFound";
import Forget from "./pages/Forget/Forget";
import Reset from "./pages/Reset/Reset";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedAuthRoute from "./auth/ProtectedAuthRoute";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import CartContextProvider from "./contexts/CartContext";
import Checkout from "./pages/Checkout/Checkout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoute>
            <Register />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "forget-password",
        element: (
          <ProtectedAuthRoute>
            <Forget />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "reset",
        element: (
          <ProtectedAuthRoute>
            <Reset />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <ProtectedAuthRoute>
            <ResetPassword />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id/subcategories",
        element: (
          <ProtectedRoute>
            <Products subCategory="true" />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id/categories",
        element: (
          <ProtectedRoute>
            <Products category="true" />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id/brands",
        element: (
          <ProtectedRoute>
            <Products brand="true" />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
