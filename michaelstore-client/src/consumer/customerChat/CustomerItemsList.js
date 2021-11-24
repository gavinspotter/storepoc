import React from "react";
import CustomerItemsItem from "./CustomerItemsItem";

const CustomerItemsList = (props) => {
  return (
    <div>
      {props.items.map((x) => (
        <CustomerItemsItem key={x._id} id={x._id} name={x.name} />
      ))}
    </div>
  );
};

export default CustomerItemsList;
