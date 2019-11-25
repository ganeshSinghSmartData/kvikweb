import React from 'react';
import Rating from './rating/rating';
import './ratingBock.scss';
const RatingBock = () => {
  return (
    <div className="rating-blc d-flex align-items-start">
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn svg-secondary-100" />
      <Rating className="rating-btn" />
    </div>
  );
};

export default RatingBock;