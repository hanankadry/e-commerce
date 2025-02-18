import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { Input } from "@heroui/react";
import { useParams } from "react-router-dom";

export default function Products({
  subCategory = null,
  brand = null,
  category = null,
}) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (subCategory == null && brand == null && category == null)
      getAllProducts();
    else if (subCategory != null) getSubCategoryProducts(id);
    else if (brand != null) getBrandProducts(id);
    else if (category != null) getCategoryProducts(id);
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  async function getAllProducts() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data?.data);
        setFilteredProducts(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function getSubCategoryProducts(subCategory) {
    setIsLoading(true);
    await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subCategory}`
      )
      .then(({ data }) => {
        setProducts(data?.data);
        setFilteredProducts(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function getCategoryProducts(category) {
    setIsLoading(true);
    await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${category}`
      )
      .then(({ data }) => {
        setProducts(data?.data);
        setFilteredProducts(data?.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function getBrandProducts(brand) {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brand}`)
      .then(({ data }) => {
        setProducts(data?.data);
        setFilteredProducts(data?.data);
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
      {products.length != 0 ? (
        <>
          <Input
            className="w-full my-5 mx-auto"
            placeholder="Search..."
            variant="bordered"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product, index) => {
              return <Product key={index} product={product} />;
            })}
          </div>
        </>
      ) : (
        <h1 className="text-xl font-semibold text-center">No Products Found</h1>
      )}
    </>
  );
}
