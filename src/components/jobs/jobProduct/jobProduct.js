import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import datetimeDifference from "datetime-difference";
import { Badge } from "reactstrap";
import Spinner from "../../commonUi/spinner/spinner";
import "./jobProduct.scss";
import { StringToDate, DaysBetween } from "./../../../utilities/common";
import { apiUrl } from "./../../../environment";
import { JobStatus, BidStatus } from "../../../utilities/constants";

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
        return (classname = "status-primary");
      case "accepted":
        return (classname = "status-primary");
      case "completed":
        return (classname = "job-success-bar");
      case "in_progress":
        return (classname = "job-secondary-bar");
      default:
        return (classname = "job-danger-bar");
    }
  };
  setJobStatus(product.status);

  return (
    <div className={"job-wrapper " + (listType ? "d-flex flex-column" : "")}>
      <div className="job-pic text-center flex-shrink-0 d-flex position-relative">
        <Badge color="danger" className="job-bid-count position-absolute">
          50
        </Badge>
        <Link
          className={`text-black flex-fill position-relative 
          ${
            !product.images && !product.images.length
              ? "no-job-image-blc align-items-center justify-content-center"
              : ""
          }`}
          to={`${pathname}${product._id}`}
        >
          {/* <Spinner className="position-absolute d-flex justify-content-center align-items-center with-overlay" /> */}
          {product.images && product.images.length ? (
            <img src={`${apiUrl}/${product.images[0]["path"]}`} alt="Job" />
          ) : (
            <img
              src={require("../../../assets/images/icons/no-job-icon.svg")}
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
          "job-inner " + (listType ? "d-flex flex-column flex-fill" : "")
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
                width="497.25"
                height="612"
                viewBox="0 0 497.25 612"
              >
                <g id="timer" transform="translate(-57.375)">
                  <g id="Group_4" data-name="Group 4">
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M432.272,68.692l-20.554,35.567,71.221,41.109L503.494,109.8a20.6,20.6,0,0,0-7.545-28.1L460.382,61.141A20.545,20.545,0,0,0,432.272,68.692Z"
                    />
                    <path
                      id="Path_4"
                      data-name="Path 4"
                      d="M306,92.56a269.549,269.549,0,0,1,38.25,3.065V62.357l26.3-.2V19.125A19.114,19.114,0,0,0,351.422,0H260.779a19.114,19.114,0,0,0-19.125,19.125V62.156l26.1.2V95.625A269.549,269.549,0,0,1,306,92.56Z"
                    />
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M306,114.75c-137.312,0-248.625,111.312-248.625,248.625S168.688,612,306,612,554.625,500.688,554.625,363.375,443.312,114.75,306,114.75ZM422.185,480.229l-144.873-100.3V238.34H319.12V358.029l126.86,87.827Z"
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
          <label className="d-flex flex-column">
            Time Left
            <span>{`${timeleft.days}d ${timeleft.hours}h ${timeleft.minutes}m`}</span>
          </label>
          <label className="d-flex flex-column text-left">
            Date
            <span>{StringToDate(product.jobStartDate)}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default JobProduct;
