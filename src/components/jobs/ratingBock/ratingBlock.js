import React, { useState } from "react";
import Rating from "./rating/rating";
import "./ratingBlock.scss";

const RatingBlock = ({ rating = 4, ratingClick, disablestar = true }) => {
  const [ratingVal, setRatingVal] = useState(rating);
  return (
    <div className="rating-blc d-flex align-items-start bidder">
      {[1, 2, 3, 4, 5].map((item, key) => (
        <Rating
          disablestar={disablestar}
          _ratingClick={() => {
            setRatingVal(item);
            ratingClick(item);
          }}
          key={key}
          classname={`rating-btn ${
            item <= ratingVal ? "svg-secondary-100" : ""
            }`}
        />
      ))}
    </div>
  );
};

export default RatingBlock;
