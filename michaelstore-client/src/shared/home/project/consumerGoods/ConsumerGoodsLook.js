import React, { useContext, useEffect, useState } from "react";

import { useHttpClient } from "../../../hooks/http-hook";

import { AuthContext } from "../../../context/auth-context";

import { useParams } from "react-router-dom";
import ErrorModal from "../../../UIElements/ErrorModal";

const ConsumerGoodsLook = () => {
  const goodId = useParams().goodId;

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [aGood, setAGood] = useState();

  useEffect(() => {
    const fetchAnItem = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/getAConsumerItem/${goodId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setAGood(responseData.findItem);
    };

    fetchAnItem();
  }, [goodId, sendRequest, auth.token]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <div>hi</div>
      {aGood && <div></div>}
    </div>
  );
};

export default ConsumerGoodsLook;
