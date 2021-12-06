import React from "react";

import "../../../../css/style.css";
import BulkItem from "./BulkItem";

const BulkList = (props) => {
  return (
    <div className="consumerGoods">
      {props.items &&
        props.items.map((x) => (
          <BulkItem
            key={x._id}
            id={x._id}
            name={x.name}
            description={x.description}
            price={x.price}
            bucketPhotoId={x.bucketPhotoId}
          />
        ))}
    </div>
  );
};

export default BulkList;
