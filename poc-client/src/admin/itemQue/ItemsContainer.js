import React, { useEffect, useState, useContext } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";
import ItemsList from "./ItemsList";
import ErrorModal from "../../shared/UIElements/ErrorModal";

const ItemsContainer = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [consumerGoodsList, setConsumerGoodsList] = useState();

  useEffect(() => {
    const fetchcg = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getConsumerItems`
        );

        setConsumerGoodsList(responseData.findConsumerItems);
      } catch (err) {}
    };

    fetchcg();
  }, [sendRequest, auth.deliveredRef]);

  return (
    <div className="itemsContainer">
      <ErrorModal error={error} onClear={clearError} />
      {consumerGoodsList && <ItemsList items={consumerGoodsList} />}{" "}
    </div>
  );
};

export default ItemsContainer;
