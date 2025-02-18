import React, { useContext, useState } from "react";
import { Button, Input } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setIsLoggedIn } = useContext(authContext);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data?.token);
        setIsLoggedIn(true);
        navigate(location.pathname == "/login" ? "/" : location.pathname);
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
            <h1 className="col-span-2 text-2xl font-bold my-5">Login</h1>
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
            <Link
              to={"/forget-password"}
              className="text-bold underline col-span-1"
            >
              Forgot your password?
            </Link>
            <Button
              isLoading={isLoading}
              className="col-span-1 justify-self-end"
              variant="bordered"
              type="submit"
            >
              Login
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
