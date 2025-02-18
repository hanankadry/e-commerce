import React from "react";
import Product from "../Product/Product";
import Slider from "react-slick";

export default function RelatedProducts({ products }) {
  const settings = {
    dots: true,
    infinite: false ,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <>
      <Slider {...settings} className="p-5">
        {products?.map((product, index) => {
          return (
            <div key={index} className="px-1">
              <Product product={product} />
            </div>
          );
        })}
      </Slider>
    </>
  );
}
