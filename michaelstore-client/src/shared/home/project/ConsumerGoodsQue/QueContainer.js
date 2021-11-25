import React, { useContext } from "react";

import { useHttpClient } from "../../../hooks/http-hook";

import { AuthContext } from "../../../context/auth-context";

const QueContainer = () => {
  const auth = useContext(AuthContext);

  return <div></div>;
};

export default QueContainer;
