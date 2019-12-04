import React from 'react';
import Rating from './rating/rating';
import './ratingBlock.scss';
const RatingBlock = () => {
  return (
    <div className="rating-blc d-flex align-items-start bidder">
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn" />
    </div>
  );
};

export default RatingBlock;