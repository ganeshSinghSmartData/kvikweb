import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Countdown from "react-countdown-now";
import datetimeDifference from "datetime-difference";
import { Button, Row, Col } from "reactstrap";
import { toastAction } from "../../../actions/toast-actions";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import moment from "moment";
import { ImageView } from "../bidderProfile/chat/ImageView/ImageView";

import "./jobDetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import Paragraph from "../../commonUi/paragraph/paragraph";
import JobCreatedBy from "./JobAddress/jobCreatedBy";
import Proposal from "./proposal/proposal";
import Breadcrumb from "../../commonUi/breadcrumb/breadcrumb";
import TimeCounterComponent from "./timeCounterComponent";

import {
  StringToDate,
  dateTime,
  DaysBetween,
  AddOffset
} from "./../../../utilities/common";
import { JobStatus, BidStatus } from "../../../utilities/constants";
import { apiUrl } from "./../../../environment";
import {
  placeYourBid,
  addBidderReview,
  approvedBidWork,
  getSimilarProduct
} from "./../../../actions/job";
import Spinner from "../../commonUi/spinner/spinner";
import SpinnerOverlay from "../../commonUi/spinner/spinnerOverlay/spinnerOverlay";

import PlaceYourBidModal from "../../commonUi/modal/modal";
import ConfirmJobStartModal from "../../commonUi/modal/modal";
import RateBidderWorkModal from "../../commonUi/modal/modal";
import UserImage from "../../jobs/jobDetail/userImage/userImage";
import JobAddress from "../jobDetail/JobAddress/jobAddress";
import RenderSimilarProducts from "./RenderSimilarProducts";
import StatusBar from "./StatusBar";
export default function JobDetail({
  history,
  job = {},
  path = "",
  _deleteJob = () => {},
  _startJob = () => {},
  _endJob = () => {},
  _isLoading = false,
  _isStatusLoading = false,
  hideHeader = false,
  reviewModal
}) {
  let workStatus = {};
  if (path === "/bid-details") {
    workStatus = BidStatus;
  } else {
    workStatus = JobStatus;
  }
  const similarProducts = useSelector((state) => state.job.similarProducts);
  const similarCount = useSelector((state) => state.job.similarCount);
  const [imagePath, seImagePath] = useState("");
  const [ImageModal, setImageModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [confirmStartModal, setConfirmStartModal] = useState(
    path !== "/job-proposal" && job.status && job.status === "accepted"
      ? true
      : false
  );
  const [initial, setInitial] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { jobBidCheck } = useSelector((state) => state.job);
  const thmbnails = [];

  job.images.length &&
    job.images.map((item) => {
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

  const handleSubmit = (values, rate = "") => {
    // setModalLoading(true);
    if (values.frequency) {
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
        placeYourBid(reqData, (callback) => {
          if (callback) {
            // setModalLoading(false);
            setOpenModal(!openModal);
            history.push("/bid-list");
          } else {
            setOpenModal(!openModal);
            // setModalLoading(false);
          }
        })
      );
    }
    if (values.reveiw) {
      const reqData = {
        bidder_id: job.bidersLIstingcheck[0].job_provider_id._id,
        job_id: job._id,
        rating: rate,
        review: values.reveiw
      };
      dispatch(
        approvedBidWork(
          {
            job_seeker_id: job.bidersLIstingcheck[0].job_provider_id._id,
            job_provider_id: job.job_provider_id,
            job_id: job._id
          },
          (callback) => {
            if (callback) {
              dispatch(
                addBidderReview(reqData, (callback) => {
                  if (callback) {
                    // setModalLoading(false);
                    setOpenModal(!openModal);
                    history.push("/job-list");
                  } else {
                    setOpenModal(!openModal);
                    // setModalLoading(false);
                  }
                })
              );
            } else {
              setOpenModal(!openModal);
              // setModalLoading(false);
              history.push("/job-list");
            }
          }
        )
      );
    }
  };

  let noImageClass = "";
  if (!job.images || job.images.length === 0) {
    noImageClass =
      "d-flex justify-content-center justify-content-center no-jobdetail-image";
  }

  const openBidForm = () => {
    if (jobBidCheck && jobBidCheck.length) {
      toastAction(false, "You have already placed bid for this job");
    } else {
      setOpenModal(!openModal);
    }
  };

  const imageViewHandler = () => {
    seImagePath("");
    setImageModal(!ImageModal);
  };

  const closeimageViewHandlerViewChat = (path) => {
    seImagePath(path);
    setImageModal(!ImageModal);
  };

  useEffect(() => {
    if (initial) {
      dispatch(getSimilarProduct(1, [job.category]));
      setInitial(false);
    }
  }, [dispatch, initial, job.category]);

  console.log("====================================");
  console.log("job here", job);
  console.log("====================================");
  return (
    <>
      <div className="job-detail-blc d-flex flex-column flex-fill">
        {_isLoading && <SpinnerOverlay className="position-fixed" />}
        <ImageView
          imagePath={imagePath}
          ImageVisible={ImageModal}
          imageViewHandlerProp={imageViewHandler}
        />
        {!hideHeader && (
          <div className="job-detail-hd d-flex align-items-center">
            <h2 className="flex-fill">Job Details</h2>
            <Breadcrumb path={path} />
          </div>
        )}

        <div className="job-detail-inner d-flex flex-fill">
          <div className="job-detail-rw job-detail-lft flex-fill overflow-auto">
            <StatusBar visible={!reviewModal} status={job.status} />
            <div className="d-flex job-detail-top">
              <div className="job-detail-pic-col">
                <div
                  className={`job-detail-pic position-relative ${noImageClass}`}
                >
                  {/* {imageLoad && (
                <Spinner className="position-absolute d-flex justify-content-center align-items-center with-overlay" />
              )} */}
                  {apiUrl && job.images && job.images.length !== 0 ? (
                    <img
                      src={
                        job.images[imageIndex]["original"]
                          ? `${apiUrl}/${job.images[imageIndex]["original"]}`
                          : URL.createObjectURL(job.images[imageIndex])
                      }
                      alt="Job Post User"
                      onClick={() =>
                        closeimageViewHandlerViewChat(
                          `${apiUrl}/${job.images[imageIndex]["original"]}`
                        )
                      }
                    />
                  ) : (
                    <img
                      src={require("../../../assets/images/icons/default-job-image.svg")}
                      alt="Job Post User"
                    />
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <div className="job-slider-track-inner">
                    {job.images && job.images.length !== 0 ? (
                      <Slider {...settings}>
                        {job.images.map((item, key) => (
                          <div key={key}>
                            <img
                              src={
                                item.path
                                  ? `${apiUrl}/${item["original"]}`
                                  : URL.createObjectURL(item)
                              }
                              alt="Job Post User"
                              onClick={() => setImageIndex(key)}
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="job-detail-info flex-fill">
                <div className="job-detail-tp">
                  <div className="job-detail-hd">
                    <div className="job-detail-hd-rw d-flex flex-wrap">
                      <div className="job-detail-hd-col d-flex flex-column flex-fill flex-wrap">
                        <h3>{job.jobtitle}</h3>
                        <p className="m-0 w-100">
                          Job starts on:{" "}
                          {dateTime(job.jobStartDate || job.startDate)}
                        </p>
                        {path === "/job-proposal" &&
                          job.status === "not_started" && (
                            <div className="job-edit-btns d-flex">
                              <Link
                                className="btn d-flex justify-content-center align-items-center p-0 job-edit-btn"
                                to={`/edit-job/${job._id}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="528.899"
                                  height="526.321"
                                  viewBox="0 0 528.899 526.321"
                                >
                                  <g
                                    id="pencil-edit-button"
                                    transform="translate(0 -1.289)"
                                  >
                                    <path
                                      id="Path_3559"
                                      data-name="Path 3559"
                                      d="M328.883,89.125l107.59,107.589-272.34,272.34L56.6,361.465Zm189.23-25.948L470.132,15.2a47.614,47.614,0,0,0-67.259,0L356.912,61.157,464.5,168.747l53.611-53.611A36.679,36.679,0,0,0,518.113,63.177ZM.3,512.69a12.243,12.243,0,0,0,14.811,14.565L135,498.186,27.473,390.6Z"
                                    />
                                  </g>
                                </svg>
                              </Link>
                              <Button
                                className="d-flex justify-content-center align-items-center p-0 job-delete-btn"
                                color="link"
                                onClick={() => _deleteJob(job._id)}
                              >
                                <svg
                                  id="delete"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="310.398"
                                  height="407"
                                  viewBox="0 0 310.398 407"
                                >
                                  <path
                                    id="Path_3559"
                                    data-name="Path 3559"
                                    d="M89.2,37c0-12.133,9.469-21,21.6-21h88.8c12.129,0,21.6,8.867,21.6,21V60h16V37c0-20.953-16.645-37-37.6-37H110.8C89.848,0,73.2,16.047,73.2,37V60h16Zm0,0"
                                  />
                                  <path
                                    id="Path_3560"
                                    data-name="Path 3560"
                                    d="M60.6,407H249.8c18.242,0,32.4-16.047,32.4-36V124H28.2V371C28.2,390.953,42.355,407,60.6,407ZM206.2,162.2a8,8,0,0,1,16,0v189a8,8,0,0,1-16,0Zm-59,0a8,8,0,0,1,16,0v189a8,8,0,0,1-16,0Zm-59,0a8,8,0,0,1,16,0v189a8,8,0,0,1-16,0Zm0,0"
                                  />
                                  <path
                                    id="Path_3561"
                                    data-name="Path 3561"
                                    d="M20,108H290.4a20,20,0,0,0,0-40H20a20,20,0,0,0,0,40Zm0,0"
                                  />
                                </svg>
                              </Button>
                            </div>
                          )}
                      </div>
                      <div className="job-detail-col-rt d-flex flex-column">
                        <label
                          className={`job-detail-amnt margin flex-shrink-0 ${
                            path === "/job-proposal" ? "" : ""
                          }`}
                        >
                          {job.budget ? `$${job.budget}` : ""}
                        </label>
                        <span className="sub-heading">Weekly</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-desc-list">
                    <ul className="d-flex flex-column">
                      {job["job_seeker_id"] && (
                        <li className="d-flex">
                          <span className="flex-shrink-0 job-desc-userImg">
                            <UserImage />
                          </span>
                          <p>
                            <label>Job Posted by</label>
                            <span>{`${job["job_seeker_id"]["fname"]} ${job["job_seeker_id"]["lname"]}`}</span>
                          </p>
                        </li>
                      )}
                      {job["street"] && (
                        <li className="d-flex">
                          <span className="flex-shrink-0">
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
                          <p>
                            <label>Location</label>
                            <span className="sub-heading">
                              {`${job["street"]}, ${job["city"]}, ${job["location"]}`}
                            </span>
                          </p>
                        </li>
                      )}

                      {job["jobStartDate" || "startDate"] && (
                        <li className="d-flex">
                          <span className="flex-shrink-0">
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
                          <p>
                            <label>Job starts on</label>
                            <span className="sub-heading">
                              {StringToDate(job["jobStartDate" || "startDate"])}
                            </span>
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="job-detail-btm">
              <div className="job-detail-bd">
                <h3 className="d-flex justify-content-center">
                  <label className="d-flex">
                    <span className="d-flex align-items-center">
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
                    Bidding ends in
                  </label>
                </h3>
                <div className="job-detail-bid d-flex justify-content-center">
                  <Countdown
                    date={new Date(job.jobEndDate || job.endDate)}
                    intervalDelay={0}
                    precision={3}
                    renderer={(props) => (
                      <div className="job-detail-bid-inner">
                        <label className="mb-0 position-relative">
                          {props.days}
                          <span>D</span>
                        </label>
                        <label className="mb-0 position-relative">
                          {props.hours}
                          <span>H</span>
                        </label>
                        <label className="mb-0 position-relative">
                          {props.minutes}
                          <span>M</span>
                        </label>
                        <label className="mb-0 position-relative">
                          {props.seconds}
                          <span>S</span>
                        </label>
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="job-detail-desc">
                <h4>About</h4>
                <Paragraph>{job.description}</Paragraph>
              </div>

              <div className="bid-status-btns place-bid-rw text-center w-100 job-detail-action-btns">
                {job.status === "accepted" && path !== "/job-proposal" && (
                  <Button
                    color="secondary"
                    onClick={() =>
                      _startJob(job._id, job.job_seeker_id._id, user.data._id)
                    }
                  >
                    Start Job
                  </Button>
                )}
                {job.status === "in_progress" && path !== "/job-proposal" && (
                  <Button
                    color="secondary"
                    onClick={() =>
                      _endJob(job._id, job.job_seeker_id._id, user.data._id)
                    }
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="78.775"
                        height="57.775"
                        viewBox="0 0 78.775 57.775"
                      >
                        <path
                          id="Forma_1"
                          data-name="Forma 1"
                          d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z"
                          transform="translate(-0.111 -0.114)"
                        />
                      </svg>
                    </span>
                    Mark as Complete
                  </Button>
                )}
              </div>

              {path === "/job-proposal" && job.status === "completed" && (
                <div className="place-bid-rw text-center w-100 job-detail-action-btns">
                  <Button size="lg" color="secondary" onClick={() => {}}>
                    Mark as Done
                  </Button>
                </div>
              )}
              {path !== "/bid-details" &&
                path !== "/job-proposal" &&
                user &&
                user.loggedIn &&
                user.data._id != job.job_seeker_id._id && (
                  <div className="place-bid-rw text-center w-100 job-detail-action-btns">
                    <Button
                      size="lg"
                      color="link"
                      className={`${
                        jobBidCheck && jobBidCheck.length
                          ? "btn-dark"
                          : "btn-secondary"
                      } place-bid-btn`}
                      onClick={() => openBidForm()}
                    >
                      Place a Bid
                    </Button>
                  </div>
                )}
              {user && !user.loggedIn && (
                <div className="place-bid-rw text-center w-100 job-detail-action-btns">
                  <Link
                    className="place-bid-btn btn btn-secondary btn-lg"
                    to={`/login`}
                  >
                    Login
                  </Link>
                </div>
              )}

              {(path === "/job-proposal" || path === "/job-details") &&
                job &&
                job.job_seeker_id &&
                user &&
                user.data &&
                user.data._id == job.job_seeker_id._id &&
                job.bidersLIstingcheck.length !== 0 && (
                  <div className="proposal-blc flex-shrink-0">
                    <h4>PROPOSALS</h4>
                    {job.bidersLIstingcheck.map((item, key) => {
                      return (
                        <Proposal
                          props={{ ...item, status: job.status }}
                          key={key}
                          jobId={job._id}
                          history={history}
                          isclick={
                            job.status === "not_started" ||
                            job.status === "not_accepted"
                              ? true
                              : false
                          }
                        />
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
          {!reviewModal && (
            <div className="job-listing-blc flex-shrink-0 flex-fill overflow-auto">
              <Button block color="link" className="new-joblist-btn">
                View New Tasks
              </Button>
              <RenderSimilarProducts data={similarProducts} />
            </div>
          )}
        </div>
      </div>

      <PlaceYourBidModal
        _isOpen={openModal}
        _toggleModal={() => setOpenModal(!openModal)}
        _modalType={"Place your bid"}
        _handleSubmit={handleSubmit}
        _frequency={job.frequency}
        // _loading={isModalLoading}
      />
      <ConfirmJobStartModal
        _isOpen={confirmStartModal}
        _toggleModal={() => setConfirmStartModal(!confirmStartModal)}
        _modalType={"Confirmation"}
        _jobProviderName={`${job.job_seeker_id.fname} ${job.job_seeker_id.lname}`}
        startJob={() =>
          _startJob(job._id, job.job_seeker_id._id, user.data._id)
        }
        _loading={_isStatusLoading}
      />

      <RateBidderWorkModal
        // _isOpen={rateBidder}
        // _toggleModal={() => setRateBidder(!rateBidder)}
        _modalType={"Rate Bidder"}
        _bidderName={
          job.bidersLIstingcheck &&
          job.bidersLIstingcheck.length &&
          `${job.bidersLIstingcheck[0].job_provider_id.fname} ${job.bidersLIstingcheck[0].job_provider_id.lname}`
        }
        // _loading={isModalLoading}
        _handleSubmit={handleSubmit}
        history={history}
      />
    </>
  );
}
