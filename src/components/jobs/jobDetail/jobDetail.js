import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col } from "reactstrap";
import Slider from "react-slick";

import Heading from "../../commonUi/heading/heading";
import Paragraph from "../../commonUi/paragraph/paragraph";
import RatingBlock from "../ratingBock/ratingBlock";
import JobAddress from "./JobAddress/jobAddress";
import Proposal from "./proposal/proposal";
import PlaceYourBidModal from "../../commonUi/modal/modal";
import Breadcrumb from '../../commonUi/breadcrumb/breadcrumb';
import "./jobDetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StringToDate, DaysBetween } from "./../../../utilities/common";
import { JobStatus } from "../../../utilities/constants";
import { apiUrl } from "./../../../environment";
import { placeYourBid, reset_job_details } from "./../../../actions/job";

export default function JobDetail({
  job = {},
  history,
  path = "",
  _markJobComplete
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const user = useSelector(state => state.user);
  const { jobDetails } = useSelector(state => state.job);
  const dispatch = useDispatch();

  const thmbnails = [];

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
          setOpenModal(!openModal);
          history.push("/");
        }
      })
    );
  };

  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <Breadcrumb />
      <h2 className="text-center">Job Details</h2>
      <div className="job-detail-inner d-flex flex-column flex-fill overflow-auto">
        <Row className="job-detail-rw row flex-shrink-0">
          <Col md="4" className="job-detail-pic-col">
            <div className="job-detail-pic">
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
            <div className="job-detail-hd">
              {path === "/bid-details" && (
                <div className="bid_status_blc">
                  <span className="bid_status d-flex justify-content-center">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="48.02" height="96.044" viewBox="0 0 48.02 96.044">
                        <path id="Op_component_1" data-name="Op component 1" d="M116.471,317.189l-17.687-8.844a4.923,4.923,0,0,1-2.745-4.426,8,8,0,1,1,16.006,0h16.006a24.011,24.011,0,0,0-16.006-22.538V271.9H96.039v9.476a24.011,24.011,0,0,0-16.007,22.538,20.867,20.867,0,0,0,11.581,18.745l17.687,8.844a4.923,4.923,0,0,1,2.745,4.426,8,8,0,1,1-16.006,0H80.033a24.011,24.011,0,0,0,16.007,22.538v9.476h16.006v-9.476a24.011,24.011,0,0,0,16.006-22.538A20.867,20.867,0,0,0,116.471,317.189Z" transform="translate(-80.033 -271.904)" />
                      </svg>
                    </span>
                    {JobStatus[job.status]}
                  </span>
                </div>
              )}
              <div className="job-detail-hd-rw job-detail-hd-rw d-flex align-items-start">
                <div className="job-detail-hd-col d-flex flex-fill">
                  <h3 className="text-primary">{job.jobtitle}</h3>
                  {/* <RatingBlock /> */}
                </div>
                <label className="job-detail-amnt flex-shrink-0">
                  $ {job.budget}
                </label>
                {path === "/job-proposal" && (
                  <div className="mark-btn mt-auto">
                    <Button
                      color="secondary"
                      block
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
                )}
              </div>
              <p className="m-0">Created {StringToDate(job.created_at)}</p>
            </div>
            <div className="job-detail-desc">
              <h4>Description</h4>
              <Paragraph>{job.description}</Paragraph>
            </div>
            <JobAddress
              end_date={DaysBetween(job.jobEndDate)}
              job_seeker_id={job.job_seeker_id}
            />


            {path !== "/bid-details" &&
              path !== "/job-proposal" &&
              user &&
              user.loggedIn &&
              user.data._id != job.job_seeker_id._id && (
                <div className="place-bid-rw text-center">
                  <Button
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
