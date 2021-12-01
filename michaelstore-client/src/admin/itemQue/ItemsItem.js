import React, { useContext, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

const ItemsItem = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitDelivered = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/deleteConsumerItem/`,
        "PUT",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  return (
    <div className="itemsContainer-itemsList-anItem">
      <div>
        <div>
          <img />
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </div>
        <div>
          <h4>{props.deliveryDetails.firstName}</h4>
          <h4>{props.deliveryDetails.lastName}</h4>
          <h4>{props.deliveryDetails.email}</h4>
          <h4>{props.deliveryDetails.street}</h4>
          <h4>{props.deliveryDetails.city}</h4>
          <h4>{props.deliveryDetails.state}</h4>
          <h4>{props.deliveryDetails.zipCode}</h4>
        </div>
      </div>
    </div>
  );
};

export default ItemsItem;
