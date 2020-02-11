import React from "react";

import { Link } from "react-router-dom";
import RatingBlock from "../../ratingBock/ratingBlock";
import UserImage from "../userImage/userImage";

import "./jobAddress.scss";

const JobCreatedBy = ({
  job_seeker_id,
  handleImageUpload,
  editimage = false,
  jobStatus
}) => {
  return (
    <div className="job-address d-flex">
      <Link to={`/bidder-profile/${job_seeker_id._id}/${jobStatus}`}
      >
        <UserImage
          image={job_seeker_id.image}
          handleImageUpload={handleImageUpload}
          edit={editimage}
        />
      </Link>
      {job_seeker_id && (
        <div className="job-user-info flex-fill">
          <div className="job-user-rw d-flex flex-wrap">
            <div className="job-user-r">
              <RatingBlock rating={job_seeker_id.average_rating} />
            </div>
          </div>
          <div className="profile-label">
            <h4> {`${job_seeker_id["fname"]} ${job_seeker_id["lname"]}`}</h4>
            {/* <span className="d-block">Service Seeker</span> */}
          </div>
        </div>
      )}

    </div>
  );
};

export default JobCreatedBy;
