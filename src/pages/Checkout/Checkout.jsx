import React, { useContext, useState } from "react";
import { Button, Input } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Checkout() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        window.location.href = data?.session?.url;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { handleSubmit, values, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  return (
    <>
      <div className="my-10">
        <form onSubmit={handleSubmit}>
          <div className="w-2/3 mx-auto grid grid-cols-2 gap-4">
            <h1 className="col-span-2 text-2xl font-bold my-5">Checkout</h1>
            <Input
              isRequired
              variant="bordered"
              name="details"
              className="col-span-2"
              label="Details"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.details}
            />
            {touched.details && errors.details && (
              <p className="text-red-600 text-sm col-span-2">
                {errors.details}
              </p>
            )}
            <Input
              isRequired
              variant="bordered"
              name="phone"
              className="col-span-2"
              label="Phone"
              type="tel"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <p className="text-red-600 text-sm col-span-2">{errors.phone}</p>
            )}
            <Input
              isRequired
              variant="bordered"
              name="city"
              className="col-span-2"
              label="City"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
            />
            {touched.city && errors.city && (
              <p className="text-red-600 text-sm col-span-2">{errors.city}</p>
            )}
            <Button
              isLoading={isLoading}
              className="col-span-2 hover:bg-cyan-400 text-black border-cyan-400"
              variant="bordered"
              type="submit"
            >
              Pay Now
            </Button>
            {errorMsg != "" && (
              <p className="bg-red-100 rounded py-2 text-red-600 text-sm text-center col-span-2">
                {errorMsg}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
