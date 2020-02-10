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
import "./reviewJob.scss";
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

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import JobDetail from "../../jobDetail/jobDetail";

const ReviewModal = (props) => {
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
  };

  const saveJobData = () => {
    setModal(false);
    setTimeout(function () {
      submitJobData();
    }, 300);
  };

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
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-lg job-review-modal d-flex flex-column align-items-center justify-content-center"
      >
        <ModalHeader>
          <span>
            View Job Details
          </span>
          <Button
            color="secondary"
            className="job-post-btn ml-auto"
            onClick={saveJobData}
          >
            Post Now
          </Button>
        </ModalHeader>
        {/* //CHANGES */}
        <ModalBody className="overflow-auto">
          <JobDetail
            history={props.history}
            job={_jobDetails}
            path=""
            _isLoading={false}
            _isStatusLoading={false}
            hideHeader={true}
            reviewModal
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ReviewModal;
