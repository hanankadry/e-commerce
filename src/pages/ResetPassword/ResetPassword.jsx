import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    newPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Za-z][A-Za-z0-9]{5,8}$/,
        "Start with a letter, uppercase or lowercase. Minimum 6 characters, Maximum 9 characters. No special characters '_-!@#$%^&*()'"
      )
      .required("New Password is required"),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((res) => {
        console.log(res);
        navigate("/");
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
            <h1 className="col-span-2 text-2xl font-bold my-5">
              Reset Your Account Password
            </h1>
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
              name="newPassword"
              className="col-span-2"
              label="New Password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
            />
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-600 text-sm col-span-2">
                {errors.newPassword}
              </p>
            )}
            <Button
              isLoading={isLoading}
              className="col-span-1 justify-self-start"
              color="success"
              variant="bordered"
              type="submit"
            >
              Reset Password
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
