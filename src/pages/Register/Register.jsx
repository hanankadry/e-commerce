import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(30, "Must be 30 characters or less")
      .min(3, "Must be 3 characters or more")
      .required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,8}$/,
        "Start with a letter, uppercase or lowercase. Minimum 6 characters, Maximum 9 characters. No special characters '_-!@#$%^&*()'"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string().required("Phone is required"),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        setErrorMsg(err?.response?.data.message);
      })
      .finally(() => {
        setIsLoading(false);
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
            <h1 className="col-span-2 text-2xl font-bold my-5">Register</h1>
            <Input
              isRequired
              variant="bordered"
              name="name"
              className="col-span-2"
              label="Name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name && (
              <span className="text-red-600 text-sm col-span-2">
                {errors.name}
              </span>
            )}
            <Input
              isRequired
              variant="bordered"
              name="email"
              className="col-span-2"
              label="Email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className="text-red-600 text-sm col-span-2">{errors.email}</p>
            )}
            <Input
              isRequired
              variant="bordered"
              name="password"
              className="col-span-2"
              label="Password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className="text-red-600 text-sm col-span-2">
                {errors.password}
              </p>
            )}
            <Input
              isRequired
              variant="bordered"
              name="rePassword"
              className="col-span-2"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rePassword}
            />
            {touched.rePassword && errors.rePassword && (
              <p className="text-red-600 text-sm col-span-2">
                {errors.rePassword}
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
            <Button
              isLoading={isLoading}
              className="col-span-2 justify-self-end"
              variant="bordered"
              type="submit"
            >
              Register
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
