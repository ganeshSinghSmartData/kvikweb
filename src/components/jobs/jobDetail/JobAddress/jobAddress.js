import React, { useState } from "react";
import { Button } from "reactstrap";
import datetimeDifference from "datetime-difference";
import { Link } from "react-router-dom";

import RatingBlock from "../../ratingBock/ratingBlock";
import UserImage from "../userImage/userImage";
import { DaysBetween } from "./../../../../utilities/common";

import "./jobAddress.scss";

const JobAddress = ({
  end_date = false,
  job_seeker_id,
  handleImageUpload,
  imegeUploading,
  editimage = false
}) => {
  let [timeleft, seTimeleft] = useState(
    datetimeDifference(new Date(), new Date(DaysBetween(end_date)))
  );

  /*   setInterval(() => {
    const time = datetimeDifference(new Date(), new Date(end_date));
    seTimeleft(time);
  }, 1000); */

  return (
    <div className="job-address d-flex">
      <UserImage
        image={job_seeker_id.image}
        handleImageUpload={handleImageUpload}
        imegeUploading={imegeUploading}
        edit={editimage}
      />
      {job_seeker_id && (
        <div className="job-user-info flex-fill">
          <div className="job-user-rw d-flex flex-wrap">
            <div className="job-user-l">
              <h4>
                {`${job_seeker_id["fname"]} ${job_seeker_id["lname"]}`}
                {/* <span className="d-block">Service Seeker</span> */}
              </h4>
            </div>
            <div className="job-user-r">
              <RatingBlock rating={job_seeker_id.average_rating} />
            </div>
          </div>
          <ul>
            {job_seeker_id["city"] && (
              <li className="d-flex">
                <span className="svg-secondary-100 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="137.358"
                    height="186.548"
                    viewBox="0 0 137.358 186.548"
                  >
                    <g id="map-location" transform="translate(0)">
                      <path
                        id="Path_899"
                        data-name="Path 899"
                        d="M306.791,0a68.757,68.757,0,0,0-68.676,68.68,66.993,66.993,0,0,0,6.006,28.034c17.171,37.574,50.093,77.245,59.776,88.507a3.824,3.824,0,0,0,5.792,0c9.679-11.26,42.6-50.929,59.778-88.507a66.964,66.964,0,0,0,6.006-28.034A68.764,68.764,0,0,0,306.791,0Zm0,104.353a35.676,35.676,0,1,1,35.675-35.675A35.716,35.716,0,0,1,306.791,104.353Z"
                        transform="translate(-238.115)"
                      />
                    </g>
                  </svg>
                </span>
                <p>{`${job_seeker_id["city"]}, ${job_seeker_id["zip_code"]}`}</p>
              </li>
            )}
            {job_seeker_id["email"] && (
              <li className="d-flex">
                <span className="svg-secondary-100 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="146"
                    height="114.714"
                    viewBox="0 0 146 114.714"
                  >
                    <path
                      id="Forma_1"
                      data-name="Forma 1"
                      d="M13.536,114.857a12.549,12.549,0,0,1-9.207-3.83A12.548,12.548,0,0,1,.5,101.82V37.131A43.159,43.159,0,0,0,8.729,44.22Q38.223,64.262,49.221,72.328q4.644,3.422,7.536,5.336a46.578,46.578,0,0,0,7.7,3.911,23.468,23.468,0,0,0,8.962,2h.165a23.46,23.46,0,0,0,8.96-2,46.506,46.506,0,0,0,7.7-3.911q2.893-1.913,7.537-5.336,13.848-10.022,40.572-28.108a44.921,44.921,0,0,0,8.149-7.088V101.82a13.076,13.076,0,0,1-13.036,13.037ZM73.5,73.14h-.082a12.933,12.933,0,0,1-4.074-.734,24.609,24.609,0,0,1-4.685-2.2q-2.487-1.465-4.238-2.647t-4.4-3.1q-2.649-1.913-3.462-2.484-7.414-5.214-21.346-14.868T14.513,35.5a40.441,40.441,0,0,1-9.533-9.41Q.5,20.106.5,14.971A16.45,16.45,0,0,1,3.881,4.378Q7.261.144,13.535.143H133.464a12.592,12.592,0,0,1,9.166,3.829,12.491,12.491,0,0,1,3.871,9.207,21.516,21.516,0,0,1-3.993,12.3A38.685,38.685,0,0,1,132.568,35.5Q101.935,56.767,94.44,61.98q-.815.571-3.463,2.484t-4.4,3.1q-1.752,1.181-4.236,2.647a24.608,24.608,0,0,1-4.685,2.2,12.933,12.933,0,0,1-4.074.734Z"
                      transform="translate(-0.5 -0.143)"
                    />
                  </svg>
                </span>

                <p>{job_seeker_id["email"]}</p>
              </li>
            )}
            {job_seeker_id["date"] && (
              <li className="d-flex">
                <span className="svg-secondary-100 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.002"
                    height="16.001"
                    viewBox="0 0 15.002 16.001"
                  >
                    <path
                      id="Forma_1"
                      data-name="Forma 1"
                      d="M1.375,0A1.413,1.413,0,0,0,0,1.443V12.786a1.414,1.414,0,0,0,1.335,1.433V12.284A1.549,1.549,0,0,1,2.854,10.7h.959a1.557,1.557,0,0,1,1.528,1.58v1.942h4.32V12.284a1.557,1.557,0,0,1,1.528-1.58h.958a1.549,1.549,0,0,1,1.519,1.58v1.936A1.414,1.414,0,0,0,15,12.786V1.443A1.415,1.415,0,0,0,13.627,0Zm.379,8.008V2.149a.608.608,0,0,1,.595-.62H12.627a.608.608,0,0,1,.595.62h0V8.008a.608.608,0,0,1-.594.62H2.349A.608.608,0,0,1,1.754,8.008ZM9.93,2.376a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363h1.215a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363H8.109a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363H5.071a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363ZM9.93,5.543a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363h1.215a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363H8.109a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363H5.071a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm7.321,6.2a.532.532,0,0,0-.521.543v3.173a.532.532,0,0,0,.521.543h.948a.532.532,0,0,0,.521-.543V12.284a.532.532,0,0,0-.521-.543Zm-8.326,0a.532.532,0,0,0-.521.543v3.173A.532.532,0,0,0,2.851,16H3.8a.532.532,0,0,0,.521-.543V12.284a.532.532,0,0,0-.521-.543Z"
                    />
                  </svg>
                </span>
                <p>14 Sep 2019</p>
              </li>
            )}
            {job_seeker_id["phone"] && (
              <li className="d-flex">
                <span className="svg-secondary-100 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <g id="telephone" transform="translate(-0.006)">
                      <g
                        id="Group_8114"
                        data-name="Group 8114"
                        transform="translate(0.006)"
                      >
                        <path
                          id="Path_3555"
                          data-name="Path 3555"
                          d="M13.69,56.317a1.261,1.261,0,0,0-1.907,0c-.446.442-.891.884-1.33,1.333a.263.263,0,0,1-.367.067c-.288-.157-.6-.285-.873-.457a13.828,13.828,0,0,1-3.334-3.034,7.9,7.9,0,0,1-1.195-1.914.274.274,0,0,1,.067-.352c.446-.431.88-.873,1.318-1.315a1.266,1.266,0,0,0,0-1.951c-.348-.352-.7-.7-1.045-1.049s-.715-.723-1.079-1.079a1.269,1.269,0,0,0-1.907,0c-.449.442-.88.9-1.337,1.33a2.171,2.171,0,0,0-.682,1.465A6.2,6.2,0,0,0,.5,52.035a16.228,16.228,0,0,0,2.88,4.8,17.825,17.825,0,0,0,5.9,4.618,8.537,8.537,0,0,0,3.27.951,2.4,2.4,0,0,0,2.056-.783c.382-.427.813-.817,1.217-1.225a1.274,1.274,0,0,0,.007-1.94Q14.765,57.382,13.69,56.317Z"
                          transform="translate(-0.006 -44.409)"
                          fill="#ff8b0e"
                        />
                        <path
                          id="Path_3556"
                          data-name="Path 3556"
                          d="M241.914,101.326l1.382-.236A6.2,6.2,0,0,0,238.049,96l-.195,1.39a4.795,4.795,0,0,1,4.06,3.937Z"
                          transform="translate(-228.945 -92.404)"
                          fill="#ff8b0e"
                        />
                        <path
                          id="Path_3557"
                          data-name="Path 3557"
                          d="M248.792,2.914A10.191,10.191,0,0,0,242.949,0l-.195,1.39a8.893,8.893,0,0,1,7.525,7.293l1.382-.236A10.266,10.266,0,0,0,248.792,2.914Z"
                          transform="translate(-233.662)"
                          fill="#ff8b0e"
                        />
                      </g>
                    </g>
                  </svg>
                </span>
                <p>+911234567891</p>
              </li>
            )}
            {end_date && (
              <li className="job-start-blc">
                <div className="d-flex job-start-rw">
                  <span className="svg-secondary-100 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.003"
                      height="23.003"
                      viewBox="0 0 23.003 23.003"
                    >
                      <path
                        id="Forma_1"
                        data-name="Forma 1"
                        d="M0,11.5A11.5,11.5,0,1,1,11.5,23,11.514,11.514,0,0,1,0,11.5Zm2.447,0A9.054,9.054,0,1,0,11.5,2.446,9.065,9.065,0,0,0,2.445,11.5Zm8.933,1.539a.947.947,0,0,1-.947-.947V4.93a.947.947,0,0,1,1.894,0v6.215h5.168a.947.947,0,1,1,0,1.894Z"
                        transform="translate(0.002 0.002)"
                      />
                    </svg>
                  </span>
                  <p>
                    <label>{`${timeleft.days} Days`}</label>
                    <label>{`${timeleft.hours} Hours`}</label>
                    <label>{`${timeleft.minutes} Mins`}</label>
                    <label>{`${timeleft.seconds} Secs`}</label>
                  </p>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobAddress;
