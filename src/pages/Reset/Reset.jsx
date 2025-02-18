import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reset() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    resetCode: "",
  };

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Reset Code is required"),
  });

  const onSubmit = async () => {
    setIsLoading(true);
    await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((res) => {
        console.log(res);
        navigate("/reset-password");
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
              Please Enter Your Verification Code
            </h1>
            <Input
              isRequired
              variant="bordered"
              name="resetCode"
              className="col-span-2"
              label="Reset Code"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.resetCode}
            />
            {touched.resetCode && errors.resetCode && (
              <p className="text-red-600 text-sm col-span-2">
                {errors.resetCode}
              </p>
            )}
            <Button
              isLoading={isLoading}
              className="col-span-1 justify-self-start"
              color="success"
              variant="bordered"
              type="submit"
            >
              Verify
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
