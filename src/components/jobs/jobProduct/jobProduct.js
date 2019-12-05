import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import "./jobProduct.scss";
import { StringToDate } from "./../../../utilities/common";
// import CountDown from "../../../utilities/countDown";

import { apiUrl } from "./../../../environment";

/********* Get time ago in string format *********/

const JobProduct = ({ product, listType, _time }) => {
  return (
    <div className={"job-wrapper " + (listType ? "d-flex flex-column" : "")}>
      <div className="job-pic text-center flex-shrink-0">
        {product.images && product.images.length && (
          <Link className="text-black" to={`/job-details/${product._id}`}>
            <img
              src={`${apiUrl}/${product.images[0]["path"]}`}
              alt="Job image"
            />
          </Link>
        )}
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
            ${product.budget || 0}
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
          {product.location}, {product.city}
        </div>
        {listType ? (
          <div className="job-desc">
            <p>{product.description || ""}</p>
          </div>
        ) : null}
        <div className="job-time d-flex space-bet justify-content-between mt-auto">
          <label className="d-flex flex-column">
            Time Left
            <span>{_time}</span>
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
