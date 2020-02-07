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
              <div className="job-list-bx-rt flex-fill">
                <h2 className="d-flex">
                  {item.jobtitle}
                  <span className="ml-auto">
                    ${parseFloat(item.budget).toFixed(2)}
                  </span>
                </h2>
                <JobAddress
                  job_seeker_id={""}
                  handleImageUpload={null}
                  imegeUploading={null}
                  editimage={false}
                  jobListings={false}
                  // end_date={item.jobEndDate}
                  created_at={item.created_at}
                />
              </div>
            </div>
            <div className="job-list-status d-flex">
              <span className="job-status-lbl text-primary">
                {constants.jobStatus[item.status]}
              </span>
              <span className="job-offer-lbl ml-auto">
                {item.bidcount} offers
                </span>

            </div>
          </div>
        );
      })}
    </>
  );
};

export default RenderSimilarProducts;
