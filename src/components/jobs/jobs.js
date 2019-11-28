import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import smoothscroll from "smoothscroll-polyfill";
import JobProduct from "./jobProduct/jobProduct";
import Sidebar from "../sidebar/sidebar";
import JobDetail from './jobDetail/jobDetail';
import PostJob from './postJob/postJob';
import BidderProfile from '../jobs/bidderProfile/bidderProfile';
import Heading from "../../components/commonUi/heading/heading";
import Paragraph from "../../components/commonUi/paragraph/paragraph";
// import SpinnerOverlay from '../commonUi/spinner/spinnerOverlay/spinnerOverlay';
import "./jobs.scss";
import { getJobProduct } from "./../../actions/job";
smoothscroll.polyfill();
const Job = () => {
  const dispatch = useDispatch();
  const [listType, setlistType] = useState(false);
  const [scrollVisible, setscrollVisible] = useState(false);
  const toggleListType = value => {
    setlistType(value);
  };
  const wrapperRef = useRef(null);
  const scrollCheck = () => {
    let scrollTopCheck = wrapperRef.current.scrollTop;
    if (scrollTopCheck > 300) {
      setscrollVisible(true);
    } else {
      setscrollVisible(false);
    }
  };
  const scrollTopFunction = () => {
    wrapperRef.current.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  let jobs = useSelector(state => state.job);
  useEffect(() => {
    if (!jobs.jobProduct.length) {
      dispatch(getJobProduct());
    }
  }, jobs);

  return (
    <React.Fragment>
      {/* <SpinnerOverlay className="position-fixed" /> */}
      <section
        className="d-flex flex-column position-relative"
        onScroll={scrollCheck}
        ref={wrapperRef}
      >
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
        <BidderProfile />
        <PostJob />
        <Row className="d-flex flex-nowrap position-relative">
          <Col className="sidebar-col d-flex flex-column">
            <Sidebar />
          </Col>
          <Col className="job-rt-col">
            <Heading className="text-primary h2">Welcome to Kvik</Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque leo ipsum, consequat a tellus pharetra, commodo
              bibendum dui. In rhoncus lacus ut justo lacinia, id tempus
              ligula convallis.
              </Paragraph>
            <div className="job-list-blc">
              <div className="job-list-heading d-flex">
                <h3 className="flex-fill">
                  Jobs in vicinity of your locations: {jobs.count}
                </h3>
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
                {jobs &&
                  jobs.jobProduct.map((item, key) => {
                    return (
                      <Col lg="4" className="product-col" key={key}>
                        <JobProduct product={item} listType={listType} />
                      </Col>
                    );
                  })}
              </Row>
              <Row className="joblist-more">
                <Col className="d-flex justify-content-center">
                  <Button color="secondary" className="data-loader-btn">
                    <span className="d-flex justify-content-center">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                      </span>
                    <span>SHOW MORE</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>
      <section>
        <Container className="position-relative">
          <button
            type="button"
            className={
              "btn btn-light scroll-tp-btn rounded-circle position-absolute " +
              (scrollVisible ? "on" : "")
            }
            onClick={scrollTopFunction}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31.49"
              height="22.142"
              viewBox="0 0 31.49 22.142"
            >
              <path
                id="arrow-up"
                d="M21.2,5.007a1.117,1.117,0,0,0-1.587,1.571l8.047,8.047H1.111A1.106,1.106,0,0,0,0,15.737a1.118,1.118,0,0,0,1.111,1.127H27.665L19.618,24.9a1.139,1.139,0,0,0,0,1.587,1.112,1.112,0,0,0,1.587,0l9.952-9.952a1.093,1.093,0,0,0,0-1.571Z"
                transform="translate(0 -4.674)"
                fill="#1e201d"
              />
            </svg>
          </button>
        </Container>
      </section>
    </React.Fragment>
  );
};
export default Job;
