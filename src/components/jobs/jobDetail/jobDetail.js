import React from 'react';
import { Row, Col } from 'reactstrap';
import Heading from '../../commonUi/heading/heading';
import Paragraph from '../../commonUi/paragraph/paragraph';
import RatingBock from '../ratingBock/ratingBock';
import JobAddress from './JobAddress/jobAddress';
import Proposal from './proposal/proposal';
import SignInModal from '../../commonUi/modal/modal';
import './jobDetail.scss';
const jobDetail = () => {
  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <SignInModal />
      <Heading className="h3 text-center">
        Job Details
      </Heading>
      <div className="job-detail-inner d-flex flex-column flex-fill overflow-auto">
        <Row className="job-detail-rw row flex-shrink-0">
          <Col md="4" className="job-detail-pic-col">
            <div className="job-detail-pic">
              <img src={require('../../../assets/images/joblist/image1.jpg')} alt="Job Post User" />
            </div>
          </Col>
          <Col md="8" className="job-detail-info">
            <div className="job-detail-hd">
              <div className="job-detail-hd-rw job-detail-hd-rw d-flex align-items-start">
                <div className="job-detail-hd-col d-flex flex-fill">
                  <h3 className="text-primary">Need for helping Gardening</h3>
                  <RatingBock />
                </div>
                <label className="job-detail-amnt flex-shrink-0">
                  $ 750.00
                </label>
              </div>
              <p className="m-0">Created June 12, 2019</p>
            </div>
            <div className="job-detail-desc">
              <h4>
                Description
              </h4>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis.
              </Paragraph>
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