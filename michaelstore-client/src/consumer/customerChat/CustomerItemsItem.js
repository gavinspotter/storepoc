import React from "react";

const CustomerItemsItem = (props) => {
  const deliveryStatus = props.delivered ? (
    <div className="delivstatus-shipped">shipped</div>
  ) : (
    <div className="delivstatus-pending">pending</div>
  );

  return (
    <div className="customerItemList-m-border">
      <div className="customerItemList-m">
        <img
          className="customerItemList-m-picture"
          src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`}
          alt={props.description}
        />
        <div>{props.name}</div>
        <div>{deliveryStatus}</div>
      </div>
    </div>
  );
};

export default CustomerItemsItem;
