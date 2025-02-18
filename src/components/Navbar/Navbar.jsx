import React, { useContext, useState } from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import { cartContext } from "../../contexts/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const { cartCount } = useContext(cartContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const menuItems = [
    "home",
    "cart",
    "wishlist",
    "products",
    "categories",
    "brands",
  ];

  return (
    <HeroNavbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inherit" to={"/"}>
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "#4FA74F" }}
              aria-hidden="true"
            ></i>
            Fresh Cart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {isLoggedIn && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <NavLink
                className="capitalize"
                color="foreground"
                to={item == "home" ? "/" : "/" + item}
              >
                {item}
              </NavLink>
            </NavbarItem>
          ))}
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <NavbarItem className="cursor-pointer">
              <Button onPress={logout} variant="bordered" color="danger">
                Log Out
              </Button>
            </NavbarItem>
          </div>
        ) : (
          <>
            <NavbarItem className="lg:flex cursor-pointer">
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem className="cursor-pointer">
              <Button
                as={Link}
                to="/register"
                color="success"
                variant="bordered"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      {isLoggedIn && (
        <>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={index}>
                <NavLink
                  className="w-full capitalize"
                  to={item == "home" ? "/" : "/" + item}
                  size="lg"
                >
                  {item}
                </NavLink>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </>
      )}
    </HeroNavbar>
  );
}
