import React from "react";
import Rating from "./rating/rating";
import "./ratingBlock.scss";
const RatingBlock = ({ rating = 4 }) => {
  return (
    <div className="rating-blc d-flex align-items-start bidder">
      {[1, 2, 3, 4, 5].map((item, key) => (
        <Rating
          disablestar={true}
          key={key}
          classname={`rating-btn ${item <= rating ? "svg-secondary-100" : ""}`}
        />
      ))}
    </div>
  );
};

export default RatingBlock;
