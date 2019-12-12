import React from "react";
import UserImage from "../userImage/userImage";
import RatingBlock from "../../ratingBock/ratingBlock";

import "./proposal.scss";
import { DaysBetween } from "../../../../utilities/common";

const Proposal = ({ props }) => {
  let daysfrom = new Date() - new Date(DaysBetween(props.created_at));
  daysfrom = parseInt(daysfrom / (1000 * 3600 * 24));

  return (
    <div className="proposal-rw d-flex">
      <div className="proposal-col-l">
        <UserImage />
      </div>
      <div className="proposal-col-m">
        <h5>{`${props.job_provider_id.fname} ${props.job_provider_id.lname}`}</h5>
        <p>{props.description}</p>
      </div>
      <div className="proposal-col-r time-rate text-right flex-shrink-0">
        <span className="d-block"> {daysfrom} Day Ago</span>
        <h3 className="text-primary">${props.bid_amount}</h3>
        {/* <RatingBlock /> */}
      </div>
    </div>
  );
};

export default Proposal;
