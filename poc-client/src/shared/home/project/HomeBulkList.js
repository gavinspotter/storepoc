import React from "react";
import HomeBulkItem from "./HomeBulkItem";

const HomeBulkList = (props) => {
  return (
    <div className="home-inventory-bulkSlide-item-stuff no-scrollbar">
      {props.items.map((x) => (
        <HomeBulkItem
          key={x._id}
          id={x._id}
          name={x.name}
          bucketPhotoId={x.bucketPhotoId}
          description={x.description}
        />
      ))}
    </div>
  );
};

export default HomeBulkList;
