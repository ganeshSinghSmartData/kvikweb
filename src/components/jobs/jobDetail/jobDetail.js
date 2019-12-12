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

import "./jobDetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { StringToDate, DaysBetween } from "./../../../utilities/common";
import { apiUrl } from "./../../../environment";
import { placeYourBid } from "./../../../actions/job";
import { getUserJobDetails } from "./../../../actions/bid";

export default function JobDetail({ job, history, path = "" }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const userJobDetails = useSelector(state => state.bid.userJobDetails);
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

  const [imageIndex, setImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <Heading className="h3 text-center">Job Details</Heading>
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
              <div className="job-detail-hd-rw job-detail-hd-rw d-flex align-items-start">
                <div className="job-detail-hd-col d-flex flex-fill">
                  <h3 className="text-primary">{job.jobtitle}</h3>
                  {/* <RatingBlock /> */}
                </div>
                <label className="job-detail-amnt flex-shrink-0">
                  $ {job.budget}
                </label>
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
          userJobDetails &&
          userJobDetails.bidersLIstingcheck.length !== 0 && (
            <div className="proposal-blc flex-shrink-0">
              <h4>PROPOSALS</h4>

              {userJobDetails.bidersLIstingcheck.map((item, key) => {
                return <Proposal props={item} key={key} />;
              })}
            </div>
          )}
      </div>
    </div>
  );
}
