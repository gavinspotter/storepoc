import React from "react";

const HomeConsumerGoodsItem = (props) => {
  return (
    <div className="home-inventory-goodsSlide-item">
      <div className="home-inventory-goodsSlide-item-img-wrapper">
        <img
          className="home-inventory-goodsSlide-item-img"
          src={`https://s3.us-east-1.amazonaws.com/michaelrossbucket/${props.bucketPhotoId}`}
          alt={props.description}
        />
      </div>
      <div>{props.name}</div>
    </div>
  );
};

export default HomeConsumerGoodsItem;
