import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LocalForm, actions } from "react-redux-form";
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search";
import moment from "moment";
import { apiUrl } from "../../../../environment";
import { getJobCategory } from "./../../../../actions/job";
import InputCell from "../../../commonUi/input/inputCell";
import Loader from "../../../../components/commonUi/loader/loader";
import "react-datepicker/dist/react-datepicker.css";
import "../postJob.scss";
import './reviewJob.scss';
import Countdown from "react-countdown-now";
import datetimeDifference from "datetime-difference";
import Paragraph from "../../../commonUi/paragraph/paragraph";
import {
    StringToDate,
    dateTime,
    DaysBetween,
    AddOffset
} from "../../../../utilities/common";
import Slider from "react-slick";

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import JobDetail from "../../jobDetail/jobDetail";

const ReviewModal = (props) => {
    console.log("ReviewModal", props)
    const {
        buttonLabel,
        _jobDetails,
        _selectedCategory,
        CategoryItems,
        closePrevieModal,
        submitJobData,
        images,
        pagesCount
    } = props;
    const [modal, setModal] = useState(true);

    const toggle = () => {
        setModal(false);
        setTimeout(function () {
            closePrevieModal();
        }, 300);
    }

    const saveJobData = () => {
        setModal(false);
        setTimeout(function () {
            submitJobData();
        }, 300);
    }

    const setStartDateOnRender = () => {
        if (_jobDetails && _jobDetails.jobStartDate) {
            return new Date(new Date(Number(_jobDetails.jobStartDate)));
        } else {
            return new Date();
        }
    };

    const setEndDateOnRender = () => {
        // _handleCategoryOnchange(CategoryItems[_jobDetails.category]);
        // setImages(_jobDetails.images);
        if (_jobDetails && _jobDetails.jobEndDate) {
            return new Date(new Date(Number(_jobDetails.jobEndDate)));
        } else {
            return new Date(moment(new Date(), "DD-MM-YYYY").subtract(5, "minutes"));
        }
    };
    const [imageIndex, setImageIndex] = useState(0);
    const [startDate, setStartDate] = useState(setStartDateOnRender);
    const [endDate, setEndDate] = useState(setEndDateOnRender);

    const handleOnInputClick = () => {
        document.body.classList.add("datepicker");
    };
    const handleOnClickOutsideEvent = () => {
        document.body.classList.remove("datepicker");
    };
    const pagesNumber = (numb) => {
        pagesCount(numb);
        setModal(false);
        setTimeout(function () {
            closePrevieModal();
        }, 300);
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className="modal-lg job-review-modal d-flex flex-column align-items-center justify-content-center">
                <ModalHeader>
                    View Job Details

                    <Button color="secondary" className="close-btn btn2" onClick={saveJobData}>Submit</Button>
                </ModalHeader>
                {/* //CHANGES */}
                <ModalBody>
                    <JobDetail  history={props.history}
                        job={_jobDetails}
                        path=""
                        _isLoading={false}
                        _isStatusLoading={false}
                        hideHeader={true} />
                </ModalBody>
                {/* <div className="job-detail-inner d-flex flex-column flex-fill overflow-auto">
                    <Row className="job-detail-rw row flex-shrink-0">
                        <Col md="4" className="job-detail-pic-col">
                        {_jobDetails.images &&
                  _jobDetails.images.length > 0 &&
                  _jobDetails.images.slice(0, 5).map((item, key) => {
                    
                    return (
                        
                      <li key={key} className="position-relative">
                        <img src={item} alt="Job Pic" />
                      </li>
                    );
                  })}
                            
                        </Col>
                        <Col md="8" className="job-detail-info">
                            <div className="job-detail-tp">
                                <div className="job-detail-hd">
                                    <div className="job-detail-hd-rw d-flex flex-wrap">
                                        <div className="job-detail-hd-col d-flex flex-column flex-fill flex-wrap">
                                            <h3 className="text-primary">{_jobDetails.jobtitle}</h3>
                                            <p className="m-0 w-100">
                                                Job starts on:  {dateTime()}
                                            </p>
                                        </div>
                                        <div className="job-detail-col-rt d-flex">
                                            <label
                                                className={`job-detail-amnt margin flex-shrink-0 `}
                                            >
                                                {_jobDetails.budget ? `$${_jobDetails.budget}` : ""}
                                            </label>

                                        </div>
                                    </div>
                                </div>
                                <div className="job-desc-list">
                                    <ul className="d-flex flex-wrap">
                                        <li className="d-flex"><span className="svg-secondary-100 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13"><path id="Path_806" data-name="Path 806" d="M4,11H9V5H4Zm0,7H9V12H4Zm6,0h5V12H10Zm6,0h5V12H16Zm-6-7h5V5H10Zm6-6v6h5V5Z" transform="translate(-4 -5)" fill="#333"></path></svg></span>
                                            <p>Test</p>
                                        </li>
                                        <li className="d-flex"><span className="svg-secondary-100 flex-shrink-0"><svg id="event" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><g id="Group_8125" data-name="Group 8125"><path id="Path_3559" data-name="Path 3559" d="M469.333,304.232V85.333a42.716,42.716,0,0,0-42.667-42.667H373.333a10.661,10.661,0,0,0-10.667,10.667v53.333A21.333,21.333,0,1,1,334.25,86.688a10.675,10.675,0,0,0,7.083-10.052V10.667a10.667,10.667,0,1,0-21.333,0v32H160a10.661,10.661,0,0,0-10.667,10.667v53.333a21.333,21.333,0,1,1-28.416-19.979A10.675,10.675,0,0,0,128,76.636V10.667a10.667,10.667,0,1,0-21.334,0v32h-64A42.715,42.715,0,0,0,0,85.333V426.666a42.716,42.716,0,0,0,42.667,42.667H304.23a117.283,117.283,0,1,0,165.1-165.1Zm-192,90.435a116.818,116.818,0,0,0,4.549,32H42.667v-256h384V281.883A117.022,117.022,0,0,0,277.333,394.667Zm156.875,39.541a10.664,10.664,0,0,1-15.084,0l-32-32A10.659,10.659,0,0,1,384,394.666v-64a10.667,10.667,0,0,1,21.334,0v59.583l28.875,28.875A10.663,10.663,0,0,1,434.208,434.208Z"></path></g></svg></span>
                                            <p>{_jobDetails.frequency}</p>
                                        </li>
                                        <li className="d-flex"><span className="svg-secondary-100 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="137.358" height="20px" width="20px" viewBox="0 0 137.358 186.548"><g id="map-location" transform="translate(0)"><path id="Path_899" data-name="Path 899" d="M306.791,0a68.757,68.757,0,0,0-68.676,68.68,66.993,66.993,0,0,0,6.006,28.034c17.171,37.574,50.093,77.245,59.776,88.507a3.824,3.824,0,0,0,5.792,0c9.679-11.26,42.6-50.929,59.778-88.507a66.964,66.964,0,0,0,6.006-28.034A68.764,68.764,0,0,0,306.791,0Zm0,104.353a35.676,35.676,0,1,1,35.675-35.675A35.716,35.716,0,0,1,306.791,104.353Z" transform="translate(-238.115)"></path></g></svg></span>
                                            <p>#37, Mohali, 17000</p>
                                        </li>
                                        <li className="d-flex"><span className="svg-secondary-100 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="15.002" height="16.001" viewBox="0 0 15.002 16.001"><path id="Forma_1" data-name="Forma 1" d="M1.375,0A1.413,1.413,0,0,0,0,1.443V12.786a1.414,1.414,0,0,0,1.335,1.433V12.284A1.549,1.549,0,0,1,2.854,10.7h.959a1.557,1.557,0,0,1,1.528,1.58v1.942h4.32V12.284a1.557,1.557,0,0,1,1.528-1.58h.958a1.549,1.549,0,0,1,1.519,1.58v1.936A1.414,1.414,0,0,0,15,12.786V1.443A1.415,1.415,0,0,0,13.627,0Zm.379,8.008V2.149a.608.608,0,0,1,.595-.62H12.627a.608.608,0,0,1,.595.62h0V8.008a.608.608,0,0,1-.594.62H2.349A.608.608,0,0,1,1.754,8.008ZM9.93,2.376a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363h1.215a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363H8.109a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363H5.071a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363ZM9.93,5.543a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363h1.215a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363H8.109a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363H5.071a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm7.321,6.2a.532.532,0,0,0-.521.543v3.173a.532.532,0,0,0,.521.543h.948a.532.532,0,0,0,.521-.543V12.284a.532.532,0,0,0-.521-.543Zm-8.326,0a.532.532,0,0,0-.521.543v3.173A.532.532,0,0,0,2.851,16H3.8a.532.532,0,0,0,.521-.543V12.284a.532.532,0,0,0-.521-.543Z"></path></svg></span>
                                            <p>30 Jan, 2020</p>
                                        </li>
                                        <li className="job-start-blc w-100">
                                            <h4>Bidding ends in:</h4>
                                            <div className="d-flex job-start-rw"><span className="svg-secondary-100 flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="23.003" height="23.003" viewBox="0 0 23.003 23.003"><path id="Forma_1" data-name="Forma 1" d="M0,11.5A11.5,11.5,0,1,1,11.5,23,11.514,11.514,0,0,1,0,11.5Zm2.447,0A9.054,9.054,0,1,0,11.5,2.446,9.065,9.065,0,0,0,2.445,11.5Zm8.933,1.539a.947.947,0,0,1-.947-.947V4.93a.947.947,0,0,1,1.894,0v6.215h5.168a.947.947,0,1,1,0,1.894Z" transform="translate(0.002 0.002)"></path></svg></span>
                                                <p>
                                                    <label>0 Days</label>
                                                    <label>3 Hours</label>
                                                    <label>57 Mins</label>
                                                    <label>3 Secs</label>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <h4>Bidding ends in:</h4>
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
                                    {/* {job && job.jobEndDate ? 
                                <div className="job-detail-desc">
                                    <h4>About</h4>
                                    <Paragraph>{_jobDetails.description}</Paragraph>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>*/}
            </Modal>
        </div>
    );
}

export default ReviewModal;