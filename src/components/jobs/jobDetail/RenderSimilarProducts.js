import React from "react";
import UserImage from "./userImage/userImage";
import JobAddress from "./JobAddress/jobAddress";
import constants from "../../../constants";
const RenderSimilarProducts = (props) => {
  if (!props.data && props.data.length) return null;
  return (
    <>
      {props.data.map((item, index) => {
        return (
          <div className="job-list-bx bg-white">
            <div className="job-list-bx-rw d-flex">
              <UserImage />
              <div className="job-list-bx-rt">
                <h2 className="d-flex">
                  {item.jobtitle}
                  <span className="ml-auto">
                    ${parseFloat(item.budget).toFixed(2)}
                  </span>
                </h2>
                <JobAddress
                  job_seeker_id={{
                    city: item.city,
                    street: item.street,
                    zip_code: item.location
                  }}
                  handleImageUpload={null}
                  imegeUploading={null}
                  editimage={false}
                  jobListings={false}
                  // end_date={item.jobEndDate}
                  created_at={item.created_at}
                />
              </div>
            </div>
            <div className="job-list-status text-right">
              <label className="mb-0">
                <span>{constants.jobStatus[item.status]}</span>
                {item.bidcount} offers
              </label>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RenderSimilarProducts;
