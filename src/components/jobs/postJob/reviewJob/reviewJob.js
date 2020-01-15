import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LocalForm, actions } from "react-redux-form";
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "../postJob.scss";

import { apiUrl } from "../../../../environment";
import { getJobCategory } from "./../../../../actions/job";
import InputCell from "../../../commonUi/input/inputCell";
import Loader from "../../../../components/commonUi/loader/loader";
import ReviewJob from "../reviewJob/reviewJob";

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ReviewModal = (props) => {
    const {
    buttonLabel,
        _jobDetails,
        _selectedCategory,
        CategoryItems,
        closePrevieModal,
        images
  } = props;

    const [modal, setModal] = useState(true);

    const toggle = () => {
        setModal(false);
        setTimeout(function () {
            closePrevieModal();
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

    const [startDate, setStartDate] = useState(setStartDateOnRender);
    const [endDate, setEndDate] = useState(setEndDateOnRender);

    const handleOnInputClick = () => {
        document.body.classList.add("datepicker");
    };
    const handleOnClickOutsideEvent = () => {
        document.body.classList.remove("datepicker");
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={`modal-lg`}>
                <ModalHeader toggle={toggle}>View Job Details</ModalHeader>
                <ModalBody>
                    <LocalForm
                        initialState={_jobDetails}
                    >

                        <div className="row flex-wrap post-job-form">
                            <div className="col-md-6">
                                <label className="input-title">Category</label>

                                {CategoryItems && (
                                    <SelectSearch
                                        options={CategoryItems}
                                        className={"select-search-box"}
                                        value={
                                            _selectedCategory
                                                ? _selectedCategory
                                                : CategoryItems &&
                                                CategoryItems.length &&
                                                CategoryItems[0].value
                                        }
                                        name="category"
                                        placeholder="Category"
                                    />
                                )}

                            </div>
                            <div className="col-md-6">
                                <label className="input-title">Job Title</label>
                                <InputCell
                                    Name={"jobtitle"}
                                    Placeholder={"Job Title"}
                                    Model=".jobtitle"
                                    InputType={"text"}
                                    Length={50}
                                    Errors={{ required: "required", lengthExist: "lengthExist" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="input-title">About the job</label>
                                <InputCell
                                    Name={"aboutjob"}
                                    Placeholder={"About the job"}
                                    Model=".description"
                                    InputType={"textarea"}
                                    Length={500}
                                    Errors={{ required: "required", lengthExist: "lengthExist" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="input-title">Budget</label>
                                <InputCell
                                    Name={"budget"}
                                    Placeholder={"Budget"}
                                    Model=".budget"
                                    InputType={"text"}
                                    Length={6}
                                    Errors={{
                                        invalidNumber: "invalidNumber",
                                        lengthExist: "lengthExist"
                                    }}
                                />
                            </div>
                        </div>


                        <div className="row flex-wrap post-job-form">
                            <div className="col-md-4">
                                <label className="input-title">Street</label>
                                <InputCell
                                    Name={"street"}
                                    Placeholder={"Street"}
                                    Model=".street"
                                    InputType={"text"}
                                    Length={20}
                                    Errors={{ required: "required", lengthExist: "lengthExist" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="input-title">City</label>
                                <InputCell
                                    Name={"city"}
                                    Placeholder={"City"}
                                    Model=".city"
                                    InputType={"text"}
                                    Length={20}
                                    Errors={{ required: "required", lengthExist: "lengthExist" }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="input-title">Postal Code</label>
                                <InputCell
                                    Name={"postalCode"}
                                    Placeholder={"Postal Code"}
                                    Model=".location"
                                    InputType={"text"}
                                    Length={6}
                                    Errors={{
                                        required: "required",
                                        lengthExist: "lengthExist",
                                        invalidNumber: "invalidNumber"
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="input-title">Start Date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={date => {
                                        return (
                                            setStartDate(date),
                                            setEndDate(
                                                new Date(
                                                    moment(new Date(date), "DD-MM-YYYY").subtract(
                                                        5,
                                                        "minutes"
                                                    )
                                                )
                                            )
                                        );
                                    }}
                                    minDate={new Date()}
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    onInputClick={() => handleOnInputClick()}
                                    onClickOutsideEvent={handleOnClickOutsideEvent()}
                                    showTimeInput
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="input-title">Bid deadline date</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    timeInputLabel="Time:"
                                    minDate={new Date()}
                                    maxDate={startDate}
                                    dateFormat="MM/dd/yyyy h:mm aa"
                                    onInputClick={() => handleOnInputClick()}
                                    onClickOutsideEvent={handleOnClickOutsideEvent()}
                                    showTimeInput
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="input-title">Frequency</label>
                                <InputCell
                                    Name={"frequency"}
                                    Model=".frequency"
                                    InputType="select"
                                    Placeholder={"Frequency"}
                                    Errors={{ required: "required" }}
                                />
                            </div>
                        </div>

                        <div className="post-job-gallery d-flex justify-content-center">
                            <ul className="d-flex flex-wrap ml-auto mr-auto">
                                {images &&
                                    images.length > 0 &&
                                    images.slice(0, 5).map((item, key) => {
                                        return (
                                            <li key={key} className="position-relative">
                                                <img src={item} alt="Job Pic" />
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>

                    </LocalForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ReviewModal;