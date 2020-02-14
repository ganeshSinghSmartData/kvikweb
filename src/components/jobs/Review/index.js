import React from "react";
import UserImage from "../jobDetail/userImage/userImage";
import { Button } from "reactstrap";
import RatingBlock from "../ratingBock/ratingBlock";
import moment from "moment";

const Review = ({ reviews = [] }) => {
  return (
    <>
      {reviews &&
        reviews.map((item, key) => (
          <div
            key={key}
            className="users-review-card d-flex shadow-sm bg-white"
          >
            <div className="users-review-hd">
              <UserImage className="linkImage" />
            </div>
            <div className="users-review-inner">
              <div className="users-review-cell">
                <div className="review-lbl-cell d-flex flex-column align-items-start">
                  <Button color="link" className="p-0 review-lbl-1">
                    {item.reviewer["fname"]} {item.reviewer["lname"]}
                  </Button>
                </div>
                <RatingBlock
                  className="users-review-rating"
                  rating={item.rating}
                />
                <label className="users-review-time d-block mb-0">
                  {moment(item.createdAt).format("MMM, YYYY")}
                </label>
              </div>
              <div className="users-review-txt">
                <p>{item.review}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Review;
