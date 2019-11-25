import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import smoothscroll from 'smoothscroll-polyfill';
import JobProduct from './jobProduct/jobProduct';
import Banner from '../banner/banner';
import Sidebar from '../sidebar/sidebar';
import Footer from '../footer/footer';
import JobDetail from './jobDetail/jobDetail';
import Heading from '../../components/commonUi/heading/heading';
import Paragraph from '../../components/commonUi/paragraph/paragraph';
// import SpinnerOverlay from '../commonUi/spinner/spinnerOverlay/spinnerOverlay';
import './jobs.scss';
smoothscroll.polyfill();
const Job = () => {
  const [listType, setlistType] = useState(false);
  const [scrollVisible, setscrollVisible] = useState(false);
  const toggleListType = (value) => {
    setlistType(value);
  }
  const wrapperRef = useRef(null);
  const scrollCheck = () => {
    let scrollTopCheck = wrapperRef.current.scrollTop;
    if (scrollTopCheck > 300) {
      setscrollVisible(true);
    } else {
      setscrollVisible(false);
    }
  }
  const scrollTopFunction = () => {
    wrapperRef.current.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
  return (
    <>
      {/* <SpinnerOverlay className="position-fixed" /> */}
      <Banner />
      <section className="wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto" onScroll={scrollCheck} ref={wrapperRef}>
        <Button className="sidebar-toogle-btn text-right position-sticky rounded-left d-md-none flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="11.667" viewBox="0 0 21 11.667">
            <path id="Path_804" data-name="Path 804" d="M3,14H5.333V11.667H3Zm0,4.667H5.333V16.333H3ZM3,9.333H5.333V7H3ZM7.667,14H24V11.667H7.667Zm0,4.667H24V16.333H7.667ZM7.667,7V9.333H24V7Z" transform="translate(-3 -7)" fill="#b3b3b3" />
          </svg>
        </Button>
        <Container className="d-flex flex-column flex-fill flex-shrink-0">
          <JobDetail />
          <Row className="d-flex flex-fill flex-nowrap hidden position-relative">
            <Col className="sidebar-col d-flex flex-column">
              <Sidebar />
            </Col>
            <Col className="job-rt-col">
              <Heading className="text-primary h2">Welcome to Kvik</Heading>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis.
              </Paragraph>
              <div className="job-list-blc">
                <div className="job-list-heading d-flex">
                  <h3 className="flex-fill">Jobs in vicinity of your locations: 2860</h3>
                  <div className="job-list-icon d-flex ml-auto">
                    <Button color="link" className={"list-icon " + (listType ? 'active' : '')} onClick={() => toggleListType(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="11.667" viewBox="0 0 21 11.667">
                        <path id="Path_804" data-name="Path 804" d="M3,14H5.333V11.667H3Zm0,4.667H5.333V16.333H3ZM3,9.333H5.333V7H3ZM7.667,14H24V11.667H7.667Zm0,4.667H24V16.333H7.667ZM7.667,7V9.333H24V7Z" transform="translate(-3 -7)" fill="#b3b3b3" />
                      </svg>
                    </Button>
                    <Button color="link" className={"list-icon " + (!listType ? 'active' : '')} onClick={() => toggleListType(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13">
                        <path id="Path_806" data-name="Path 806" d="M4,11H9V5H4Zm0,7H9V12H4Zm6,0h5V12H10Zm6,0h5V12H16Zm-6-7h5V5H10Zm6-6v6h5V5Z" transform="translate(-4 -5)" fill="#333" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <Row className={'job-listing ' + (listType ? 'job-list-row' : '')}>
                  <Col lg="4" className="col d-flex">
                    <JobProduct listType={listType} />
                  </Col>
                  <Col lg="4" className="col d-flex">
                    <JobProduct listType={listType} />
                  </Col>
                  <Col lg="4" className="col d-flex">
                    <JobProduct listType={listType} />
                  </Col>
                  <Col lg="4" className="col d-flex">
                    <JobProduct listType={listType} />
                  </Col>
                  <Col lg="4" className="col d-flex">
                    <JobProduct listType={listType} />
                  </Col>
                  <Col lg="4" className="col d-flex">
                    <JobProduct listType={listType} />
                  </Col>
                </Row>
                <Row className="joblist-more">
                  <Col className="d-flex justify-content-center">
                    <Button color="secondary" className="data-loader-btn">
                      <span className="d-flex justify-content-center">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </span>
                      <span>SHOW MORE</span>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </section>
      <section>
        <Container className="position-relative">
          <button type="button"
            className={"btn btn-light scroll-tp-btn rounded-circle position-absolute " + (scrollVisible ? 'on' : '')}
            onClick={scrollTopFunction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31.49" height="22.142" viewBox="0 0 31.49 22.142">
              <path id="arrow-up" d="M21.2,5.007a1.117,1.117,0,0,0-1.587,1.571l8.047,8.047H1.111A1.106,1.106,0,0,0,0,15.737a1.118,1.118,0,0,0,1.111,1.127H27.665L19.618,24.9a1.139,1.139,0,0,0,0,1.587,1.112,1.112,0,0,0,1.587,0l9.952-9.952a1.093,1.093,0,0,0,0-1.571Z" transform="translate(0 -4.674)" fill="#1e201d" />
            </svg>
          </button>
        </Container>
      </section>
    </>
  );
};
export default Job;