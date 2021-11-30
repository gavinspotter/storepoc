import React from "react";

import { Link } from "react-router-dom";

const HomeConsumerGoodsItem = (props) => {
  return (
    <Link to={`consumerGoods/${props.id}`}>
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
    </Link>
  );
};

export default HomeConsumerGoodsItem;
