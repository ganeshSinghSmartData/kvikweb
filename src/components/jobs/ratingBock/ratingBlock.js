import React, { useState } from "react";
import Rating from "./rating/rating";
import "./ratingBlock.scss";

const RatingBlock = ({
  className,
  rating = 1,
  ratingClick = () => {},
  disablestar = true
}) => {
  return (
    <div className={`rating-blc d-flex align-items-start bidder  ${className}`}>
      {[1, 2, 3, 4, 5].map((item, key) => (
        <Rating
          disableStar={disablestar}
          _ratingClick={() => {
            ratingClick(item);
          }}
          key={key}
          classname={`rating-btn ${item <= rating ? "svg-secondary-100" : ""}`}
        />
      ))}
    </div>
  );
};

export default RatingBlock;
