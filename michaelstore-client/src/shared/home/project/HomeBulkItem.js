import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomeBulkItem = (props) => {
  const cardAnimation = useRef(null);

  useEffect(() => {
    if (cardAnimation.current != null) {
      const observer = new IntersectionObserver((entrys) => {
        entrys.forEach((entry) => {
          if (entry.isIntersecting) {
            cardAnimation.current.classList.add("animationRight");
            return;
          }
        });
      });

      observer.observe(cardAnimation.current);
    }
  });

  return (
    <Link to={`bulkItems/${props.id}`}>
      <div ref={cardAnimation} className="home-inventory-bulkSlide-item">
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
    </Link>
  );
};

export default HomeBulkItem;
