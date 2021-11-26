import React from "react";
import HomeConsumerGoodsItem from "./HomeConsumerGoodsItem";

const HomeConsumerGoodsList = (props) => {
  return (
    <div className="home-inventory-goodsSlide-item-stuff no-scrollbar">
      {props.items.map((x) => (
        <HomeConsumerGoodsItem
          name={x.name}
          bucketPhotoId={x.bucketPhotoId}
          description={props.description}
          key={x._id}
          id={x._id}
        />
      ))}
    </div>
  );
};

export default HomeConsumerGoodsList;
