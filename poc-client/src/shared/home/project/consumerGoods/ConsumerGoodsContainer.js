import React, { useEffect, useState, useContext } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import ConsumerGoodsList from "./ConsumerGoodsList";

import { GlobalContext } from "../../../context/global-context";

import "../../../../css/style.css";

const ConsumerGoodsContainer = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const globalC = useContext(GlobalContext);

  const [consumerGoodsList, setConsumerGoodsList] = useState();

  useEffect(() => {
    const fetchcg = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getConsumerItems`
        );

        console.log(responseData);
        setConsumerGoodsList(responseData.findConsumerItems);
      } catch (err) {}
    };

    fetchcg();
  }, [sendRequest]);

  return (
    <div className="consumerGoods-block">
      {consumerGoodsList &&
        consumerGoodsList.filter((x) => !x.sold).length === 0 && (
          <h1 className="consumerGoods-noGoods">Retail Items Coming Soon!</h1>
        )}
      {consumerGoodsList && <ConsumerGoodsList items={consumerGoodsList} />}
    </div>
  );
};

export default ConsumerGoodsContainer;
