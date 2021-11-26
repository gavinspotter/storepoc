import React from "react";

const HomeBulkItem = (props) => {
  return (
    <div className="home-inventory-bulkSlide-item">
      <div>
        <div className="home-inventory-bulkSlide-item-img-wrapper">
          <img
            className="home-inventory-bulkSlide-item-img"
            src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`}
            alt={props.description}
          />
        </div>
        <div>{props.name}</div>
      </div>
    </div>
  );
};

export default HomeBulkItem;
