import React from "react";
import UserImage from "./userImage/userImage";
import JobAddress from "./JobAddress/jobAddress";
import constants from "../../../constants";
// import { getJobBidCheck } from "../../../actions/job";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserJobDetails } from "../../../actions/bid";
import { getTranslations } from "../../../utilities/translations";
const RenderSimilarProducts = (props) => {
  const dispatch = useDispatch();
  if (!props.data && props.data.length) return null;
  return (
    <>
      {props.data.map((item, index) => {
        return (
          <div className="job-list-bx bg-white">
            <Link
              // className="job-list-bx bg-white"
              to={`/job-details/${item._id}`}
              onClick={() => {
                document.querySelector("#main_container").scrollTop = 0;
                dispatch(getUserJobDetails({ jobId: item._id }));
              }}
            >
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
                    job_seeker_id={item.address}
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
                  {getTranslations(item.status)}
                </span>
                <span className="job-offer-lbl ml-auto">
                  {item.bidcount} {getTranslations("offers")}
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RenderSimilarProducts;
