import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import datetimeDifference from "datetime-difference";
import SelectSearch from "react-select-search";
import { Button, Row, Col } from "reactstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import Paragraph from "../../commonUi/paragraph/paragraph";
import JobCreatedBy from "./JobAddress/jobCreatedBy";
import JobAddress from "./JobAddress/jobAddress";
import Proposal from "./proposal/proposal";
import PlaceYourBidModal from "../../commonUi/modal/modal";
import Breadcrumb from "../../commonUi/breadcrumb/breadcrumb";
import "./jobDetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StringToDate, DaysBetween } from "./../../../utilities/common";
import { JobStatus } from "../../../utilities/constants";
import { apiUrl } from "./../../../environment";
import { placeYourBid } from "./../../../actions/job";
import Spinner from "../../commonUi/spinner/spinner";
import { CategoryItems } from "../../../utilities/constants";
import InputCell from "../../commonUi/input/inputCell";
import RatingBlock from "../../jobs/ratingBock/ratingBlock";

export default function JobDetail({
  history,
  job = {},
  path = "",
  end_date = false,
  _markJobComplete,
  _deleteJob,
  _startJob,
  _endJob
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const thmbnails = [];
  let [timeleft, seTimeleft] = useState(
    datetimeDifference(new Date(), new Date(end_date))
  );
  job.images.length &&
    job.images.map(item => {
      const obj = {
        src: `${apiUrl}/${item.path}`,
        altText: "Slide 1",
        caption: "Slide 1"
      };
      thmbnails.push(obj);
    });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const handleSubmit = values => {
    setModalLoading(true);
    const reqData = {
      jobtitle: job.jobtitle,
      description: values.description,
      frequency: values.frequency,
      job_id: job._id,
      bid_amount: values.bid_amount,
      job_seeker_id: job.job_seeker_id._id,
      name: `${user.data.fname} ${user.data.lname}`
    };
    dispatch(
      placeYourBid(reqData, callback => {
        if (callback) {
          setModalLoading(false);
          setOpenModal(!openModal);
          history.push("/");
        } else {
          setOpenModal(!openModal);
          setModalLoading(false);
        }
      })
    );
  };

  let classname = "";
  const setJobStatus = status => {
    switch (status) {
      case "not_started":
        return (classname = "status-secondary");
      case "not_accepted":
        return (classname = "status-primary");
      case "expired":
        return (classname = "status-danger");
      case "rejected":
        return (classname = "status-danger");
      case "approved":
        return (classname = "status-success");
      case "accepted":
        return (classname = "status-primary");
      case "completed":
        return (classname = "status-success");
      case "in_progress":
        return (classname = "status-primary");
      default:
        return (classname = "status-secondary");
    }
  };
  setJobStatus(job.status);

  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <div className="job-detail-hd d-flex align-items-center">
        <h2 className="flex-fill">Job Details</h2>
        <Breadcrumb path={path} />
      </div>

      <div className="job-detail-inner d-flex flex-column flex-fill overflow-auto">
        <Row className="job-detail-rw row flex-shrink-0">
          <Col md="4" className="job-detail-pic-col">
            <div className="job-detail-pic position-relative">
              {imageLoad && (
                <Spinner className="position-absolute d-flex justify-content-center align-items-center with-overlay" />
              )}
              {apiUrl && (
                <img
                  src={`${apiUrl}/${job.images[imageIndex]["original"]}`}
                  alt="Job Post User"
                />
              )}
            </div>
            <div className="d-flex justify-content-center">
              <div className="job-slider-track-inner">
                <Slider {...settings}>
                  {thmbnails.map((item, key) => (
                    <div key={key}>
                      <img
                        src={item.src}
                        alt="Job Post User"
                        onClick={() => setImageIndex(key)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </Col>
          <Col md="8" className="job-detail-info">
            <div className="job-detail-tp">
              <div className="job-detail-hd">
                {path === "/bid-details" && (
                  <div className="bid_status_blc">
                    <span
                      className={`bid_status d-flex justify-content-center align-items-center ${classname}`}
                    >
                      <span className="rounded-circle d-flex justify-content-center align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48.02"
                          height="96.044"
                          viewBox="0 0 48.02 96.044"
                        >
                          <path
                            id="Op_component_1"
                            data-name="Op component 1"
                            d="M116.471,317.189l-17.687-8.844a4.923,4.923,0,0,1-2.745-4.426,8,8,0,1,1,16.006,0h16.006a24.011,24.011,0,0,0-16.006-22.538V271.9H96.039v9.476a24.011,24.011,0,0,0-16.007,22.538,20.867,20.867,0,0,0,11.581,18.745l17.687,8.844a4.923,4.923,0,0,1,2.745,4.426,8,8,0,1,1-16.006,0H80.033a24.011,24.011,0,0,0,16.007,22.538v9.476h16.006v-9.476a24.011,24.011,0,0,0,16.006-22.538A20.867,20.867,0,0,0,116.471,317.189Z"
                            transform="translate(-80.033 -271.904)"
                          />
                        </svg>
                      </span>
                      {JobStatus[job.status]}
                    </span>
                  </div>
                )}
                <div className="job-detail-hd-rw d-flex flex-wrap">
                  <div className="job-detail-hd-col d-flex flex-fill flex-wrap">
                    <h3 className="text-primary">{job.jobtitle}
                    </h3>
                    {/* <RatingBlock /> */}
                    <p className="m-0 w-100">
                      bidding ends in: {StringToDate(job.created_at)}
                    </p>
                    {path === "/job-proposal" && (
                      <div className="job-edit-btns d-flex">
                        <Link
                          className="btn d-flex justify-content-center align-items-center p-0 job-edit-btn"
                          to={`/edit-job/${job._id}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="528.899" height="526.321" viewBox="0 0 528.899 526.321">
                            <g id="pencil-edit-button" transform="translate(0 -1.289)">
                              <path id="Path_3559" data-name="Path 3559" d="M328.883,89.125l107.59,107.589-272.34,272.34L56.6,361.465Zm189.23-25.948L470.132,15.2a47.614,47.614,0,0,0-67.259,0L356.912,61.157,464.5,168.747l53.611-53.611A36.679,36.679,0,0,0,518.113,63.177ZM.3,512.69a12.243,12.243,0,0,0,14.811,14.565L135,498.186,27.473,390.6Z" />
                            </g>
                          </svg>
                        </Link>
                        <Button
                          className="d-flex justify-content-center align-items-center p-0 job-delete-btn"
                          color="link"
                          onClick={() => _deleteJob(job._id)}
                        >
                          <svg id="delete" xmlns="http://www.w3.org/2000/svg" width="310.398" height="407" viewBox="0 0 310.398 407">
                            <path id="Path_3559" data-name="Path 3559" d="M89.2,37c0-12.133,9.469-21,21.6-21h88.8c12.129,0,21.6,8.867,21.6,21V60h16V37c0-20.953-16.645-37-37.6-37H110.8C89.848,0,73.2,16.047,73.2,37V60h16Zm0,0" />
                            <path id="Path_3560" data-name="Path 3560" d="M60.6,407H249.8c18.242,0,32.4-16.047,32.4-36V124H28.2V371C28.2,390.953,42.355,407,60.6,407ZM206.2,162.2a8,8,0,0,1,16,0v189a8,8,0,0,1-16,0Zm-59,0a8,8,0,0,1,16,0v189a8,8,0,0,1-16,0Zm-59,0a8,8,0,0,1,16,0v189a8,8,0,0,1-16,0Zm0,0" />
                            <path id="Path_3561" data-name="Path 3561" d="M20,108H290.4a20,20,0,0,0,0-40H20a20,20,0,0,0,0,40Zm0,0" />
                          </svg>

                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="job-detail-col-rt d-flex">
                    <label
                      className={`job-detail-amnt margin flex-shrink-0 ${
                        path === "/job-proposal" ? "" : ""
                        }`}
                    >
                      $ {job.budget}
                    </label>
                    {/* {path === "/job-proposal" && job.status === "completed" && ( */}
                    <div className="mark-dn-cell">
                      <Button
                        color="secondary"
                        onClick={() =>
                          _markJobComplete(
                            job._id,
                            job.job_seeker_id._id,
                            user.data._id
                          )
                        }
                      >
                        Mark as Done
                      </Button>
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </div>
              <div className="job-desc-list">
                <ul className="d-flex flex-wrap">
                  {job["category"] && (
                    <li className="d-flex">
                      <span className="svg-secondary-100 flex-shrink-0">
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
                      </span>
                      <p>{job["category"]}</p>
                    </li>
                  )}
                  {job["frequency"] && (
                    <li className="d-flex">
                      <span className="svg-secondary-100 flex-shrink-0">
                        <svg
                          id="event"
                          xmlns="http://www.w3.org/2000/svg"
                          width="512"
                          height="512"
                          viewBox="0 0 512 512"
                        >
                          <g id="Group_8125" data-name="Group 8125">
                            <path
                              id="Path_3559"
                              data-name="Path 3559"
                              d="M469.333,304.232V85.333a42.716,42.716,0,0,0-42.667-42.667H373.333a10.661,10.661,0,0,0-10.667,10.667v53.333A21.333,21.333,0,1,1,334.25,86.688a10.675,10.675,0,0,0,7.083-10.052V10.667a10.667,10.667,0,1,0-21.333,0v32H160a10.661,10.661,0,0,0-10.667,10.667v53.333a21.333,21.333,0,1,1-28.416-19.979A10.675,10.675,0,0,0,128,76.636V10.667a10.667,10.667,0,1,0-21.334,0v32h-64A42.715,42.715,0,0,0,0,85.333V426.666a42.716,42.716,0,0,0,42.667,42.667H304.23a117.283,117.283,0,1,0,165.1-165.1Zm-192,90.435a116.818,116.818,0,0,0,4.549,32H42.667v-256h384V281.883A117.022,117.022,0,0,0,277.333,394.667Zm156.875,39.541a10.664,10.664,0,0,1-15.084,0l-32-32A10.659,10.659,0,0,1,384,394.666v-64a10.667,10.667,0,0,1,21.334,0v59.583l28.875,28.875A10.663,10.663,0,0,1,434.208,434.208Z"
                            />
                          </g>
                        </svg>
                      </span>
                      <p>{job["frequency"]}</p>
                    </li>
                  )}
                  {job.job_seeker_id["city"] && (
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
                      <p>{`${job.job_seeker_id["city"]}, ${job.job_seeker_id["zip_code"]}`}</p>
                    </li>
                  )}

                  {job.job_seeker_id["email"] && (
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

                      <p>{job.job_seeker_id["email"]}</p>
                    </li>
                  )}
                  {job["jobStartDate"] && (
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
                      <p>{StringToDate(job["jobStartDate"])}</p>
                    </li>
                  )}
                  {job["phone"] && (
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
                      <p>{job["phone"]}</p>
                    </li>
                  )}
                  <li className="job-start-blc w-100">
                    <h4>Jobs starts in:</h4>
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
                </ul>
              </div>
              <div className="job-detail-desc">
                <h4>Description</h4>
                <Paragraph>{job.description}</Paragraph>
              </div>
              <div className="job-detail-form"></div>

              {job.status === "bid_accepted" || job.status === "completed" ? (
                <div className="bid-status-btns">
                  {job.status === "bid_accepted" && (
                    <Button
                      color="primary"
                      onClick={() =>
                        _startJob(job._id, job.job_seeker_id._id, user.data._id)
                      }
                    >
                      Job Started
                    </Button>
                  )}
                  {job.status === "completed" && (
                    <Button
                      color="secondary"
                      onClick={() =>
                        _endJob(job._id, job.job_seeker_id._id, user.data._id)
                      }
                    >
                      Job End
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
            <JobCreatedBy job_seeker_id={job.job_seeker_id} />

            {path !== "/bid-details" &&
              path !== "/job-proposal" &&
              user &&
              user.loggedIn &&
              user.data._id != job.job_seeker_id._id && (
                <div className="place-bid-rw text-center">
                  <Button
                    size="lg"
                    color="secondary"
                    className="place-bid-btn"
                    onClick={() => setOpenModal(!openModal)}
                  >
                    Place a Bid
                  </Button>
                </div>
              )}
          </Col>
        </Row>
        <PlaceYourBidModal
          _isOpen={openModal}
          _toggleModal={() => setOpenModal(!openModal)}
          _modalType={"Place your bid"}
          _handleSubmit={handleSubmit}
          _frequency={job.frequency}
          _loading={isModalLoading}
        />
        {path === "/job-proposal" &&
          job &&
          job.bidersLIstingcheck.length !== 0 && (
            <div className="proposal-blc flex-shrink-0">
              <h4>PROPOSALS</h4>

              {job.bidersLIstingcheck.map((item, key) => {
                return (
                  <Proposal
                    props={item}
                    key={key}
                    jobId={job._id}
                    history={history}
                  />
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
