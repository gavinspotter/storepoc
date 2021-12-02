import React, { useContext, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

import { IoPrismOutline } from "react-icons/io5";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

const ItemsItem = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const submitDelivered = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/updateConsumerItem`,
        "PATCH",
        JSON.stringify({
          itemId: props.id,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    auth.setDeliveredRef(Math.random() * 1000000);
  };

  return (
    <div className="itemsContainer-itemsList-anItem">
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <div className="itemsContainer-itemsList-anItem-item">
        <div className="itemsContainer-itemsList-anItem-item-img-imgWrap">
          <img
            className="itemsContainer-itemsList-anItem-item-img"
            alt={props.description}
            src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`}
          />
        </div>
        <div className="itemsContainer-itemsList-anItem-item-itemDetails">
          <h2 className="itemsContainer-itemsList-anItem-item-itemDetails-name">
            {props.name}
          </h2>
          <p className="itemsContainer-itemsList-anItem-item-itemDetails-description">
            {props.description}
          </p>
        </div>
      </div>
      <div className="itemsContainer-itemsList-details">
        <h4 className="itemsContainer-itemsList-details-text">
          <span>first name:</span> {props.deliveryDetails.firstName}
        </h4>
        <h4 className="itemsContainer-itemsList-details-text">
          <span>last name:</span> {props.deliveryDetails.lastName}
        </h4>
        <h4 className="itemsContainer-itemsList-details-text">
          <span>email:</span> {props.deliveryDetails.email}
        </h4>
        <h4 className="itemsContainer-itemsList-details-text">
          <span>street:</span> {props.deliveryDetails.street}
        </h4>
        <h4 className="itemsContainer-itemsList-details-text">
          <span>city:</span> {props.deliveryDetails.city}
        </h4>
        <h4 className="itemsContainer-itemsList-details-text">
          <span>state:</span> {props.deliveryDetails.state}
        </h4>
        <h4 className="itemsContainer-itemsList-details-text">
          <span>zip code:</span>
          {props.deliveryDetails.zipCode}
        </h4>
      </div>
      <div className="itemsContainer-itemsList-details-deliver">
        <div onClick={submitDelivered}>
          <IoPrismOutline />
        </div>
      </div>
    </div>
  );
};

export default ItemsItem;
