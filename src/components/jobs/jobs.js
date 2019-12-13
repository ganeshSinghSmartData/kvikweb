import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import smoothscroll from "smoothscroll-polyfill";
import JobProduct from "./jobProduct/jobProduct";
import Sidebar from "../sidebar/sidebar";
import PostJob from "./postJob";
import BidderProfile from "./bidderProfile/bidderProfile";
import UserProfileDetail from "./userProfileDetail";
import Heading from "../../components/commonUi/heading/heading";
import Paragraph from "../../components/commonUi/paragraph/paragraph";
import { pagination } from "../../utilities/constants";
import { DaysBetween } from "./../../utilities/common";
// import SpinnerOverlay from '../commonUi/spinner/spinnerOverlay/spinnerOverlay';
import NoData from "../commonUi/noData/noData";
import EmailVerify from "../emailVerify";
import "./jobs.scss";
import {
  getJobProduct,
  reset_job_products,
  getUserActiveJob
} from "./../../actions/job";
smoothscroll.polyfill();

const Job = ({
  path = "",
  _handleUserActiveJob,
  _handleUserCompletedJob,
  _handleUserAcceptedBid,
  _handleUserNotAcceptedBid
}) => {
  const dispatch = useDispatch();
  const [listType, setlistType] = useState(false);
  let [page, setPage] = useState(pagination.page);
  let [jobType, setJobType] = useState("active");
  let [bidType, setBidType] = useState("accepted");

  const toggleListType = value => {
    setlistType(value);
  };
  let jobs = useSelector(state => state.job);
  let bids = useSelector(state => state.bid);

  let products = [];
  if (path === "") {
    products = jobs.jobProduct;
  } else if (path === "/job-list") {
    if (jobType === "active") {
      products = jobs.activeJobProduct;
    }
    if (jobType === "completed") {
      products = jobs.completedJobProduct;
    }
  } else {
    if (bidType === "accepted") {
      products = bids.activeBid;
    }
    if (bidType === "not-accepted") {
      products = bids.completedBid;
    }
  }

  const showMoreProduct = page => {
    setPage(page);
    if (path !== "/job-list") {
      dispatch(getJobProduct({ page: page }));
    } else if (jobType === "active") {
      _handleUserActiveJob({ page: page });
    } else {
      _handleUserCompletedJob({ page: page });
    }
  };

  useEffect(() => {
    if (path !== "/job-list") {
      dispatch(reset_job_products());
      dispatch(getJobProduct({ page: page }));
    } else if (jobType === "active") {
      _handleUserActiveJob({ page: page });
    } else {
      _handleUserCompletedJob({ page: page });
    }
  }, []);

  return (
    <React.Fragment>
      {/* <EmailVerify /> */}
      {/* <SpinnerOverlay className="position-fixed" /> */}
      <section className="d-flex flex-column position-relative">
        <Button className="sidebar-toogle-btn text-right position-fixed rounded-left d-md-none flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="11.667"
            viewBox="0 0 21 11.667"
          >
            <path
              id="Path_804"
              data-name="Path 804"
              d="M3,14H5.333V11.667H3Zm0,4.667H5.333V16.333H3ZM3,9.333H5.333V7H3ZM7.667,14H24V11.667H7.667Zm0,4.667H24V16.333H7.667ZM7.667,7V9.333H24V7Z"
              transform="translate(-3 -7)"
              fill="#b3b3b3"
            />
          </svg>
        </Button>
        {/* <BidderProfile /> */}
        {/* <UserProfileDetail /> */}
        {/* <PostJob /> */}
        <Row className="d-flex flex-nowrap position-relative">
          {path === "" && (
            <Col className="sidebar-col d-flex flex-column">
              <Sidebar />
            </Col>
          )}
          <Col className="job-rt-col">
            {path === "" && (
              <React.Fragment>
                <Heading className="text-primary h1">Welcome to Kvik</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque leo ipsum, consequat a tellus pharetra, commodo
                  bibendum dui. In rhoncus lacus ut justo lacinia, id tempus
                  ligula convallis.
                </Paragraph>
              </React.Fragment>
            )}

            <div className="job-list-blc m-0">
              <div className="job-list-heading d-flex">
                {path !== "" && (
                  <div className="job-list-tab">
                    {/* <Button color="primary" onClick={() => { path === "/job-list" ? setJobType('active') : setBidType('accepted') }} style={{ marginBottom: '1rem' }}>{path === "/job-list" ? 'Active Jobs' : 'Accepted'}</Button>
                    <Button color="primary" onClick={() => { path === "/job-list" ? setJobType('completed') : setBidType('not-accepted') }} style={{ marginBottom: '1rem' }}>{path === "/job-list" ? 'Completed Jobs' : 'Not-Accepted'}</Button> */}
                    <button
                      className={`btn ${
                        jobType === "active" ? "btn-primary" : ""
                      }`}
                      onClick={() => {
                        path === "/job-list"
                          ? setJobType("active")
                          : setBidType("accepted");
                      }}
                    >
                      Active Jobs
                    </button>
                    <button
                      className={`btn ${
                        jobType === "completed" ? "btn-primary" : ""
                      }`}
                      onClick={() => {
                        path === "/job-list"
                          ? setJobType("completed")
                          : setBidType("not-accepted");
                      }}
                    >
                      Completed Jobs
                    </button>
                  </div>
                )}
                <div className="job-list-icon d-flex ml-auto">
                  <Button
                    color="link"
                    className={"list-icon " + (listType ? "active" : "")}
                    onClick={() => toggleListType(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="11.667"
                      viewBox="0 0 21 11.667"
                    >
                      <path
                        id="Path_804"
                        data-name="Path 804"
                        d="M3,14H5.333V11.667H3Zm0,4.667H5.333V16.333H3ZM3,9.333H5.333V7H3ZM7.667,14H24V11.667H7.667Zm0,4.667H24V16.333H7.667ZM7.667,7V9.333H24V7Z"
                        transform="translate(-3 -7)"
                        fill="#b3b3b3"
                      />
                    </svg>
                  </Button>
                  <Button
                    color="link"
                    className={"list-icon " + (!listType ? "active" : "")}
                    onClick={() => toggleListType(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="13"
                      viewBox="0 0 17 13"
                    >
                      <path
                        id="Path_806"
                        data-name="Path 806"
                        d="M4,11H9V5H4Zm0,7H9V12H4Zm6,0h5V12H10Zm6,0h5V12H16Zm-6-7h5V5H10Zm6-6v6h5V5Z"
                        transform="translate(-4 -5)"
                        fill="#333"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <Row
                className={"job-listing " + (listType ? "job-list-row" : "")}
              >
                {products && products.length === 0 && <NoData />}
                {products &&
                  products.map((item, key) => {
                    return (
                      <Col lg="4" className="product-col" key={key}>
                        <JobProduct
                          product={path === "/bid-list" ? item.job_id : item}
                          listType={listType}
                          path={path}
                        />
                      </Col>
                    );
                  })}
              </Row>
              {products &&
                products.length !== 0 &&
                products.length < jobs.count && (
                  <Row className="joblist-more">
                    <Col className="d-flex justify-content-center">
                      <Button
                        color="secondary"
                        className="data-loader-btn"
                        onClick={() => showMoreProduct(++page)}
                      >
                        <span className="d-flex justify-content-center"></span>
                        <span>SHOW MORE</span>
                      </Button>
                    </Col>
                  </Row>
                )}
            </div>
          </Col>
        </Row>
      </section>
    </React.Fragment>
  );
};
export default Job;
