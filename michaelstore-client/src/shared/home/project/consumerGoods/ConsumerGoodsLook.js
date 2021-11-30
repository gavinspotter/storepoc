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

  const [aPrice, setAPrice] = useState();

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

      const thePrice = responseData.findItem.price.toString();

      const thePriceSplice =
        thePrice.slice(0, thePrice.length - 2) +
        "." +
        thePrice.slice(thePrice.length - 2);

      setAPrice(thePriceSplice);
    };

    fetchAnItem();
  }, [goodId, sendRequest, auth.token]);

  return (
    <div className="aConsumerItem">
      <ErrorModal error={error} onClear={clearError} />

      {aGood && aPrice && (
        <div className="aConsumerItem-itemContainer">
          <div className="aConsumerItem-itemContainer-img-container">
            <img
              className="aConsumerItem-itemContainer-img"
              src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${aGood.bucketPhotoId}`}
              alt={`${aGood.description}`}
            />
          </div>
          <div className="aConsumerItem-itemContainer-labels">
            <div>{aGood.name}</div>
            <div className="aConsumerItem-itemContainer-labels-description">
              {aGood.description.slice(0, 250)}
            </div>
            {aPrice && <div>{aPrice}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerGoodsLook;
