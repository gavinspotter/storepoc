import React, { useContext } from "react";

import { useForm } from "react-hook-form";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const Login = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { register, handleSubmit } = useForm();

  const loginSubmit = async (data) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/customer/login`,
        "POST",
        JSON.stringify({
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
    <div className="loginPadding">
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />

      <form onSubmit={handleSubmit(loginSubmit)}>
        <label>email:</label>
        <br />
        <input {...register("email")} />
        <br />
        <label>password:</label>
        <br />
        <input type="password" {...register("password")} />
        <br />
        <br />
        <button className="welcome-button">login</button>
      </form>
    </div>
  );
};

export default Login;
