import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import datetimeDifference from "datetime-difference";
import Countdown from "react-countdown-now";

import { StringToDate, DaysBetween, AddOffset } from "./../../../utilities/common";
import { apiUrl } from "./../../../environment";
import { JobStatus, BidStatus } from "../../../utilities/constants";
import { getJobBidCheck } from "./../../../actions/job";

import "./jobProduct.scss";

/********* Get time ago in string format *********/

const JobProduct = ({ product, listType, path }) => {
  const [timeleft, seTimeleft] = useState(
    datetimeDifference(new Date(), new Date(DaysBetween(product.jobEndDate)))
  );

  var intervalId = setInterval(() => {
    const time = datetimeDifference(
      new Date(),
      new Date(DaysBetween(product.jobEndDate))
    );
    seTimeleft(time);
  }, 1000 * 60);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  });

  let workStatus = {};
  let pathname = "/job-details/";
  if (path === "/job-list") {
    pathname = "/job-proposal/";
    workStatus = JobStatus;
  }
  if (path === "/bid-list") {
    pathname = "/bid-details/";
    workStatus = BidStatus;
  }

  let classname = "";
  const setJobStatus = status => {
    switch (status) {
      case "not_started":
        return (classname = "job-danger-bar");
      case "not_accepted":
        return (classname = "job-secondary-bar");
      case "expired":
        return (classname = "job-danger-bar");
      case "rejected":
        return (classname = "job-danger-bar");
      case "approved":
        return (classname = "job-primary-bar");
      case "accepted":
        return (classname = "job-primary-bar");
      case "completed":
        return (classname = "job-success-bar");
      case "in_progress":
        return (classname = "job-secondary-bar");
      default:
        return (classname = "job-danger-bar");
    }
  };
  setJobStatus(product.status);
  let imageclass = "";
  if (product.images && product.images.length !== 0) {
    imageclass = "";
  } else {
    imageclass =
      "no-job-image-blc d-flex align-items-center justify-content-center";
  }
  const { loggedIn = false } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const jobDetails = id => {
    if (loggedIn) dispatch(getJobBidCheck(id));
  };
  return (
    <div
      className={
        "job-wrapper d-flex flex-column flex-fill " +
        (listType ? "d-flex flex-column" : "")
      }
    >
      <div className="job-pic text-center flex-shrink-0 d-flex position-relative">
        <Link
          className={`text-black flex-fill position-relative ${imageclass}`}
          to={`${pathname}${product._id}`}
          onClick={() => jobDetails(product._id)}
        >
          {/* <Spinner className="position-absolute d-flex justify-content-center align-items-center with-overlay" /> */}
          {product.images && product.images.length !== 0 ? (
            <img src={`${apiUrl}/${product.images[0]["path"]}`} alt="Job" />
          ) : (
              <img
                src={require("../../../assets/images/icons/no-job-icon3.svg")}
                alt="Job"
              />
            )}
          {path === "/bid-list" && (
            <span className={`job-status-bar position-absolute ${classname}`}>
              {workStatus[product.status]}
            </span>
          )}

          {path === "/job-list" && product.status !== "not_started" && (
            <span className={`job-status-bar position-absolute ${classname}`}>
              {workStatus[product.status]}
            </span>
          )}
        </Link>
      </div>
      <div
        className={
          "job-inner d-flex flex-column flex-fill " +
          (listType ? "d-flex flex-column flex-fill" : "")
        }
      >
        <div
          className={
            "job-title d-flex flex-wrap " + (listType ? "flex-column" : "")
          }
        >
          <label className={"flex-fill m-0 " + (listType ? "order-2" : "")}>
            {product.jobtitle || ""}
          </label>
          <span className="text-primary flex-shrink-0 ml-auto">
            {product.budget ? `$${product.budget}` : ""}
          </span>
        </div>
        <div className="job-location d-flex">
          <span>
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
          <label className="mb-0">
            {product.location}, {product.city}
          </label>
        </div>
        {path === "/job-list" && product.status === "not_started" && (
          <div className=" job-location bid-count-rw d-flex">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="270.006"
                height="270.122"
                viewBox="0 0 270.006 270.122"
              >
                <g id="arrow-next" transform="translate(-0.11)">
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(0.11)"
                  >
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M133.472,0C67.4,0,11.371,48.968.11,111.847H114.068V72.279A7.915,7.915,0,0,1,126.927,66.1l79.137,63.31a7.923,7.923,0,0,1,0,12.365l-79.137,63.31a7.915,7.915,0,0,1-12.859-6.183V159.33H.11C11.371,222.21,67.4,270.122,133.472,270.122c74.183,0,136.644-60.35,136.644-134.533S207.656,0,133.472,0Z"
                      transform="translate(-0.11)"
                    />
                  </g>
                </g>
              </svg>
            </span>
            <label>
              Bid Count:
              {(product.jobBidStatus &&
                product.jobBidStatus !== 0 &&
                product.jobBidStatus.filter(status => status === "not_accepted")
                  .length) ||
                0}
            </label>
          </div>
        )}
        {listType ? (
          <div className="job-desc">
            <p>{product.description || ""}</p>
          </div>
        ) : null}
        <div className="job-time d-flex space-bet justify-content-between mt-auto">
          <label className="d-flex flex-column text-left">
            Date
            <span>{StringToDate(product.jobStartDate)}</span>
          </label>
          <label className="d-flex flex-column">
            Bidding ends in:
            {product && product.jobEndDate ?
              <Countdown
                date={new Date().getTime() + Number(product.jobEndDate)}
                renderer={({ hours, minutes, completed }) => {
                  if (!completed) {
                    let diffTime = datetimeDifference(new Date(), new Date(AddOffset(+product.jobEndDate)));
                    return (
                      < span style={{ color: "#00b700" }}> {`${diffTime.days}d ${diffTime.hours}h ${diffTime.minutes}m`}</span>
                    );
                  }
                }}
              />
              : null}
          </label>

        </div>
      </div>
    </div >
  );
};

export default JobProduct;
