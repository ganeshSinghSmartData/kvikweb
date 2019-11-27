import React from "react";
import { Row, Col } from "reactstrap";
import Heading from "../../commonUi/heading/heading";
import Paragraph from "../../commonUi/paragraph/paragraph";
import RatingBock from "../ratingBock/ratingBock";
import JobAddress from "./JobAddress/jobAddress";
import Proposal from "./proposal/proposal";
import SignInModal from "../../commonUi/modal/modal";
import "./jobDetail.scss";

import { StringToDate, DaysBetween } from "./../../../utilities/common";

const jobDetail = ({ job }) => {
  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <SignInModal />
      <Heading className="h3 text-center">Job Details</Heading>
      <div className="job-detail-inner d-flex flex-column flex-fill overflow-auto">
        <Row className="job-detail-rw row flex-shrink-0">
          <Col md="4" className="job-detail-pic-col">
            <div className="job-detail-pic">
              <img
                src={require("../../../assets/images/joblist/image1.jpg")}
                alt="Job Post User"
              />
            </div>
          </Col>
          <Col md="8" className="job-detail-info">
            <div className="job-detail-hd">
              <div className="job-detail-hd-rw job-detail-hd-rw d-flex align-items-start">
                <div className="job-detail-hd-col d-flex flex-fill">
                  <h3 className="text-primary">{job.jobtitle}</h3>
                  <RatingBock />
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
            <JobAddress />
          </Col>
        </Row>
        <div className="proposal-blc flex-shrink-0">
          <h4>PROPOSALS</h4>
          <Proposal />
          <Proposal />
          <Proposal />
        </div>
      </div>
    </div>
  );
};

export default jobDetail;
