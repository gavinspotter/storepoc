import React from "react";
import ItemsItem from "./ItemsItem";

const ItemsList = (props) => {
  const isSold = props.items.filter((x) => x.sold && !x.delivered);

  console.log(isSold);

  return (
    <div className="itemsContainer-itemsList">
      {isSold.length === 0 && (
        <h1 className="itemsContainer-noItems">
          No Items Need To Be Delivered
        </h1>
      )}
      {props.items &&
        isSold.map((x) => (
          <ItemsItem
            key={x._id}
            id={x._id}
            name={x.name}
            description={x.description}
            price={x.price}
            bucketPhotoId={x.bucketPhotoId}
            deliveryDetails={x.deliveryDetails}
          />
        ))}
    </div>
  );
};

export default ItemsList;
