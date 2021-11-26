import React, { useContext } from "react";

import { useForm } from "react-hook-form";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/UIElements/ErrorModal";

const Signup = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { register, handleSubmit } = useForm();

  const signupSubmit = async (data) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/customer/signup`,
        "POST",
        JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.customerLogin(responseData.customerId, responseData.customerToken);
    } catch (err) {}
  };

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />

      <form onSubmit={handleSubmit(signupSubmit)}>
        <div>first name:</div>
        <input {...register("firstName")} />

        <div>last name:</div>
        <input {...register("lastName")} />

        <div>email:</div>
        <input {...register("email")} />
        <div>password:</div>
        <input {...register("password")} />
        <br />
        <button>signup</button>
      </form>
    </div>
  );
};

export default Signup;
