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


/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
                    {/* <Button
                        color="link"
                        className="close-btn btn2"
                        onClick={toggle}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="357"
                            height="357"
                            viewBox="0 0 357 357"
                        >
                            <path
                                id="Forma_1"
                                data-name="Forma 1"
                                d="M357,35.7,321.3,0,178.5,142.8,35.7,0,0,35.7,142.8,178.5,0,321.3,35.7,357,178.5,214.2,321.3,357,357,321.3,214.2,178.5Z"
                            />
                        </svg>
                    </Button> */}
                    {/* <Button color="secondary" className="close-btn btn2" onClick={saveJobData}>Submit</Button> */}
                    <Button color="secondary" className="review-job-btn ml-auto" onClick={saveJobData}>
                        Submit
                    </Button>
                </ModalHeader>
                <ModalBody className="overflow-auto">
                    <LocalForm
                        initialState={_jobDetails}
                    >
                        <div className="flex-wrap post-job-form view-job-blc">
                            <div className="view-job-heading d-flex w-100 align-items-center col-sm-12">
                                <h2 className="flex-fill mb-0 mr-3">Step 1</h2>
                                <Button
                                    color="link"
                                    className="edit-job-btn"
                                    onClick={() => pagesNumber(1)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="528.899" height="526.321" viewBox="0 0 528.899 526.321">
                                        <g id="pencil-edit-button" transform="translate(0 -1.289)">
                                            <path id="Path_3559" data-name="Path 3559" d="M328.883,89.125l107.59,107.589-272.34,272.34L56.6,361.465Zm189.23-25.948L470.132,15.2a47.614,47.614,0,0,0-67.259,0L356.912,61.157,464.5,168.747l53.611-53.611A36.679,36.679,0,0,0,518.113,63.177ZM.3,512.69a12.243,12.243,0,0,0,14.811,14.565L135,498.186,27.473,390.6Z" />
                                        </g>
                                    </svg>
                                </Button>
                            </div>
                            <div className="view-job-inner d-flex flex-wrap">
                                <div className="col-md-6 select-picker-cell">
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
                                            Disabled={true}
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
                                        Disabled={true}
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
                                        Disabled={true}
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
                                        Disabled={true}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="flex-wrap post-job-form view-job-blc">
                            <div className="view-job-heading d-flex w-100 align-items-center col-sm-12">
                                <h2 className="flex-fill mb-0 mr-3">Step 2</h2>
                                <Button
                                    color="link"
                                    className="edit-job-btn"
                                    onClick={() => pagesNumber(2)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="528.899" height="526.321" viewBox="0 0 528.899 526.321">
                                        <g id="pencil-edit-button" transform="translate(0 -1.289)">
                                            <path id="Path_3559" data-name="Path 3559" d="M328.883,89.125l107.59,107.589-272.34,272.34L56.6,361.465Zm189.23-25.948L470.132,15.2a47.614,47.614,0,0,0-67.259,0L356.912,61.157,464.5,168.747l53.611-53.611A36.679,36.679,0,0,0,518.113,63.177ZM.3,512.69a12.243,12.243,0,0,0,14.811,14.565L135,498.186,27.473,390.6Z" />
                                        </g>
                                    </svg>
                                </Button>
                            </div>
                            <div className="view-job-inner d-flex flex-wrap">
                                <div className="col-md-6">
                                    <label className="input-title">Street</label>
                                    <InputCell
                                        Name={"street"}
                                        Placeholder={"Street"}
                                        Model=".street"
                                        InputType={"text"}
                                        Length={20}
                                        Errors={{ required: "required", lengthExist: "lengthExist" }}
                                        Disabled={true}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="input-title">City</label>
                                    <InputCell
                                        Name={"city"}
                                        Placeholder={"City"}
                                        Model=".city"
                                        InputType={"text"}
                                        Length={20}
                                        Errors={{ required: "required", lengthExist: "lengthExist" }}
                                        Disabled={true}
                                    />
                                </div>
                                <div className="col-md-6">
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
                                        Disabled={true}
                                    />
                                </div>
                                <div className="col-md-6 data-picker-cell">
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
                                <div className="col-md-6 data-picker-cell">
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
                                <div className="col-md-6">
                                    <label className="input-title">Frequency</label>
                                    <InputCell
                                        Name={"frequency"}
                                        Model=".frequency"
                                        InputType="select"
                                        Placeholder={"Frequency"}
                                        Errors={{ required: "required" }}
                                        Disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {images && images.length > 0 ?
                            <div className="post-job-gallery view-job-blc">
                                <div className="view-job-heading d-flex w-100 align-items-center col-sm-12">
                                    <h2 className="flex-fill mb-0 mr-3">Step 3</h2>
                                    <Button
                                        color="link"
                                        className="edit-job-btn"
                                        onClick={() => pagesNumber(3)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="528.899" height="526.321" viewBox="0 0 528.899 526.321">
                                            <g id="pencil-edit-button" transform="translate(0 -1.289)">
                                                <path id="Path_3559" data-name="Path 3559" d="M328.883,89.125l107.59,107.589-272.34,272.34L56.6,361.465Zm189.23-25.948L470.132,15.2a47.614,47.614,0,0,0-67.259,0L356.912,61.157,464.5,168.747l53.611-53.611A36.679,36.679,0,0,0,518.113,63.177ZM.3,512.69a12.243,12.243,0,0,0,14.811,14.565L135,498.186,27.473,390.6Z" />
                                            </g>
                                        </svg>
                                    </Button>
                                </div>
                                <div className="view-job-inner view-job-gallery">
                                    <ul className="overflow-auto">
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
                            </div>
                            : null}
                    </LocalForm>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
        </div>
    );
}

export default ReviewModal;