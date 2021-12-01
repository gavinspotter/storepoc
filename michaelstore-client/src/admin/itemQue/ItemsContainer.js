import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";
import ItemsList from "./ItemsList";

const ItemsContainer = () => {
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
  }, [sendRequest]);

  return (
    <div className="itemsContainer">
      {consumerGoodsList && <ItemsList items={consumerGoodsList} />}{" "}
    </div>
  );
};

export default ItemsContainer;
