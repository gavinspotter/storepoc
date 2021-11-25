import React from "react";
import CustomerItemsItem from "./CustomerItemsItem";

const CustomerItemsList = (props) => {
  return (
    <div className="customerItemList">
      {props.items.map((x) => (
        <CustomerItemsItem
          key={x._id}
          id={x._id}
          name={x.name}
          bucketPhotoId={x.bucketPhotoId}
          description={x.description}
          delivered={x.delivered}
        />
      ))}
    </div>
  );
};

export default CustomerItemsList;
