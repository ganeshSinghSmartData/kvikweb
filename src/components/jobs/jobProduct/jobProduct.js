import React from 'react';
import './jobProduct.scss';
const JobProduct = (props) => {
  return (
    <div className={"job-wrapper " + (props.listType ? 'd-flex flex-column' : '')}>
      <div className="job-pic text-center flex-shrink-0">
        <img src={require('../../../assets/images/joblist/image1.jpg')} alt="Job type" />
      </div>
      <div className={"job-inner " + (props.listType ? 'd-flex flex-column flex-fill' : '')}>
        <div className={"job-title d-flex " + (props.listType ? 'flex-column' : '')}>
          <label className={"flex-fill m-0 " + (props.listType ? 'order-2' : '')} >
            Helper for Gardening
          </label>
          <span className="text-primary flex-shrink-0 ml-auto">$700.20</span>
        </div>
        <div className="job-location d-flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="137.358" height="186.548" viewBox="0 0 137.358 186.548">
            <g id="map-location" transform="translate(0)">
              <path id="Path_899" data-name="Path 899" d="M306.791,0a68.757,68.757,0,0,0-68.676,68.68,66.993,66.993,0,0,0,6.006,28.034c17.171,37.574,50.093,77.245,59.776,88.507a3.824,3.824,0,0,0,5.792,0c9.679-11.26,42.6-50.929,59.778-88.507a66.964,66.964,0,0,0,6.006-28.034A68.764,68.764,0,0,0,306.791,0Zm0,104.353a35.676,35.676,0,1,1,35.675-35.675A35.716,35.716,0,0,1,306.791,104.353Z" transform="translate(-238.115)" />
            </g>
          </svg>
          2860
      </div>
        {
          props.listType ?
            <div className="job-desc">
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
            </div> : null
        }
        <div className="job-time d-flex space-bet justify-content-between mt-auto">
          <label className="d-flex flex-column">
            Time Left
          <span>
              1d 11h 05m
          </span>
          </label>
          <label className="d-flex flex-column text-left">
            Date
          <span>
              14 Sep 2019
          </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default JobProduct;