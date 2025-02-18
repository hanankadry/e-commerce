import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import WishlistItem from "../../components/WishlistItem/WishlistItem";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserWishlist();
  }, []);

  async function getUserWishlist() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        console.log(data?.data);
        setWishlist(data?.data);
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
      <div className="container w-4/5 bg-[#F8F9FA] rounded my-5 p-11">
        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="space-y-4">
            {wishlist.map((product, index) => (
              <WishlistItem
                key={index}
                item={product}
                getUserWishlist={getUserWishlist}
              />
            ))}
          </div>
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </>
  );
}
