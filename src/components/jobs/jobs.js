import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { sidebarToggleHandler } from '../../actions/job';


import JobProduct from "./jobProduct/jobProduct";
import Sidebar from "../sidebar/sidebar";
import Heading from "../../components/commonUi/heading/heading";
import Paragraph from "../../components/commonUi/paragraph/paragraph";
import { pagination } from "../../utilities/constants";
import Spinner from "../commonUi/spinner/spinner"
import NoData from "../commonUi/noData/noData";
import "./jobs.scss";
import { getJobProduct, reset_job_products } from "./../../actions/job";

const Job = ({
  path = "",
  _handleUserActiveJob,
  _handleUserCompletedJob,
  _handleUserActiveBid,
  _handleUserCompletedBid
}) => {
  const dispatch = useDispatch();
  const [listType, setlistType] = useState(false);
  let [selectedCategory, setCategory] = useState([]);
  let [postalCode, setPostalCode] = useState("");
  let [distance, setDistance] = useState("");
  let [budget, setBudget] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  let [page, setPage] = useState(pagination.page);
  let [jobType, setJobType] = useState("active");

  const toggleListType = value => {
    setlistType(value);
  };

  let jobs = useSelector(state => state.job);
  let bids = useSelector(state => state.bid);

  let products = [];
  let count = 0;
  let active = "Active";
  let complete = "Complete";

  if (path === "/job-list") {
    active = `${active} Job`;
    complete = `${complete} Job`;
    if (jobType === "active") {
      products = jobs.activeJobProduct;
      count = jobs.activeJobsCount;
    }
    if (jobType === "completed") {
      products = jobs.completedJobProduct;
      count = jobs.completedJobsCount;
    }
  } else if (path === "/bid-list") {
    active = `${active} Bid`;
    complete = `${complete} Bid`;
    if (jobType === "active") {
      products = bids.activeBid;
      count = bids.activeBidsCount;
    }
    if (jobType === "completed") {
      products = bids.completedBid;
      count = bids.completedBidsCount;
    }
  } else {
    products = jobs.jobProduct;
    count = jobs.count;
  }
  const showMoreProduct = page => {
    setPage(page);
    if (path === "/job-list") {
      if (jobType === "active") {
        _handleUserActiveJob({ page: page });
      }
      if (jobType === "completed") {
        _handleUserCompletedJob({ page: page });
      }
    } else if (path === "/bid-list") {
      if (jobType === "active") {
        _handleUserActiveBid({ page: page });
      }
      if (jobType === "completed") {
        _handleUserCompletedBid({ page: page });
      }
    } else {
      const reqData = {
        page: page,
        category: selectedCategory,
        lat: "",
        long: ""
      };
      dispatch(getJobProduct(reqData));
    }
  };

  const handleCategory = category => {
    let newSelectedCategory = [...selectedCategory];
    if (newSelectedCategory.length === 0) {
      newSelectedCategory.push(category);
      setCategory(newSelectedCategory);
    } else {
      if (newSelectedCategory.includes(category)) {
        const index = newSelectedCategory.indexOf(category);
        if (index > -1) {
          newSelectedCategory.splice(index, 1);
          setCategory(newSelectedCategory);
        }
      } else {
        newSelectedCategory.push(category);
        setCategory(newSelectedCategory);
      }
    }
    const reqData = {
      page: page,
      category: newSelectedCategory,
      budget: budget,
      zip_code: postalCode,
      miles: distance
    };

    dispatch(reset_job_products());
    dispatch(getJobProduct(reqData));
  };

  const handlePostalCode = value => {
    setPostalCode(value);
    const reqData = {
      page: page,
      category: selectedCategory,
      budget: budget,
      zip_code: value,
      miles: distance
    };
    dispatch(reset_job_products());
    dispatch(getJobProduct(reqData));
  };

  const handleBudget = value => {
    setBudget(value);
    const reqData = {
      page: page,
      category: selectedCategory,
      budget: value,
      zip_code: postalCode,
      miles: distance
    };
    dispatch(reset_job_products());
    dispatch(getJobProduct(reqData));
  };

  const handleDistance = value => {
    setDistance(value);
    const reqData = {
      page: page,
      category: selectedCategory,
      budget: budget,
      zip_code: postalCode,
      miles: value
    };
    dispatch(reset_job_products());
    dispatch(getJobProduct(reqData));
  };

  useEffect(() => {
    if (path !== "/job-list") {
      const reqData = {
        page: page,
        category: selectedCategory,
        lat: "",
        long: ""
      };
      dispatch(reset_job_products());
      dispatch(getJobProduct(reqData));
    }
    window.addEventListener('resize', windowResize)
    return (() => {
      document.removeEventListener("resize", windowResize)
    })
  }, []);
  const windowResize = () => {
    console.log('test reize')
    if (sidebarToggleValue == true) {
      const windowWidth = window.innerWidth;
      console.log(windowWidth)
      if (windowWidth > 767) {
        dispatch(sidebarToggleHandler(false))
      }
    }
  }

  const sidebarToggleValue = useSelector(state => {
    return state.job.sidebarToggle
  });
  const stopPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }
  return (
    <React.Fragment>
      {/* <SpinnerOverlay className="position-fixed" /> */}
      <section className="d-flex flex-column position-relative">
        <Row className="d-flex flex-nowrap position-relative">
          {/* {console.log('sidebarToggleValue', sidebarToggleValue)} */}
          {sidebarToggleValue ?
            <Spinner className="with-overlay no-spin-icon"
              onClickEvent={() => {
                dispatch(sidebarToggleHandler(false)
                );
              }}
            />
            : null}
          {path === "" && (
            <Col className={`sidebar-col d-flex flex-column ${sidebarToggleValue ? 'active' : ''}`} onClick={stopPropagation}>
              <Sidebar
                _handleCategory={handleCategory}
                _handlePostalCode={handlePostalCode}
                _handleDistance={handleDistance}
                _handleBudget={handleBudget}
              />
            </Col>
          )}
          <Col className="job-rt-col">
            {path === "" && (
              <React.Fragment>
                <Heading className="text-primary h1">
                  Welcome to QvikTask
                </Heading>
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
                    <button
                      className={`btn ${
                        jobType === "active" ? "btn-primary" : ""
                        }`}
                      onClick={() => {
                        setJobType("active");
                      }}
                    >
                      {active}
                    </button>
                    <button
                      className={`btn ${
                        jobType === "completed" ? "btn-primary" : ""
                        }`}
                      onClick={() => {
                        setJobType("completed");
                      }}
                    >
                      {complete}
                    </button>
                  </div>
                )}
                {products && products.length !== 0 &&
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
                }
              </div>
              <Row
                className={"job-listing " + (listType ? "job-list-row" : "")}
              >
                {products && products.length === 0 && <NoData />}
                {products &&
                  products.map((item, key) => {
                    let prodItem = { ...item };
                    if (path === "/bid-list") {
                      prodItem = { ...item.job_id, status: item.status };
                    }
                    return (
                      <Col lg="4" className="product-col d-flex flex-column" key={key}>
                        <JobProduct
                          product={prodItem}
                          listType={listType}
                          path={path}
                        />
                      </Col>
                    );
                  })}
              </Row>
              {products && products.length !== 0 && products.length < count && (
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
