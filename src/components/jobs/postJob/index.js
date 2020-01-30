import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, actions } from "react-redux-form";
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./postJob.scss";

import { apiUrl } from "../../../environment";
import { getJobCategory } from "./../../../actions/job";
import InputCell from "../../commonUi/input/inputCell";
import Loader from "../../../components/commonUi/loader/loader";
import ReviewJob from "./reviewJob/reviewJob";
import JobDetail from "../jobDetail/jobDetail";


export default ({
  _jobDetails = {},
  _currentstage,
  _handleStageChange,
  _handleJobPost,
  _handleCategoryOnchange,
  _selectedCategory,
  dataload,
  path,
  previewData,
  getPagesNumber
}) => {
  const [images, setImages] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(
    _jobDetails && _jobDetails.images ? _jobDetails.images : []
  );
  const [imageData, setImageData] = useState({});
  console.log("imageData", imageData);
  let { job } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!job.category || job.category.length === 0) {
      dispatch(getJobCategory());
    }
  });
  let CategoryItems = [];
  job.category &&
    job.category.length &&
    job.category.map(item => {
      if (item) {
        CategoryItems.push({ name: item.title, value: item.title });
      }
    });

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

  let files = {};
  const handleOnInputClick = () => {
    document.body.classList.add("datepicker");
  };
  const handleOnClickOutsideEvent = () => {
    document.body.classList.remove("datepicker");
  };

  const getPagesNumbers = (data) => {
    getPagesNumber(data);
  };
  const handleImageOnchange = event => {
    files = event;
    setImageData({ ...imageData, ...files });
    const imagesData = Object.values(files)
      .slice(0, 5)
      .reduce((list, key) => {
        if (key.type.includes("image/")) {
          if (key && typeof key === "object") {
            let url = URL.createObjectURL(key);
            list.push(url);
          }
        }
        return list;
      }, []);
    setImages([...images, ...imagesData]);
  };

  const removeImage = index => {
    images.splice(index, 1);
    let updatedImageData = { ...imageData };
    for (var key in updatedImageData) {
      if (!Number(updatedImageData[key]) && parseInt(key) === index) {
        delete updatedImageData[key];
      }
    }
    setImageData(updatedImageData);
    setImages(images);
  };

  const removeUploadedImage = index => {
    let _uploadedImages = [...uploadedImages];
    _uploadedImages.splice(index, 1);
    setUploadedImages(_uploadedImages);
  };

  const _openPreviewData = index => {
    setOpenView(true);
  };

  const closePrevieModal = index => {
    setOpenView(false);
  };


  /********** Change class on steps ************/
  const getClass = step => {
    if (step === _currentstage) {
      return "active";
    } else if (step < _currentstage) {
      return "complete";
    } else if (step > _currentstage) {
      return "link";
    }
  };

  let isImageLengthExist = false;

  if (images && uploadedImages && uploadedImages.length + images.length > 5) {
    isImageLengthExist = true;
  }

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="post-wrapper data-block ml-auto mr-auto position-relative">
        {dataload && <Loader loading={dataload} />}
        <div className="post-job-nav d-flex justify-content-center">
          <ul className="d-flex">
            <li className={getClass(1)}>
              <Button color="link" className="disabled">
                <span>1</span>
              </Button>
            </li>
            <li className={getClass(2)}>
              <Button color="link" className="disabled">
                <span>2</span>
              </Button>
            </li>
            <li className={getClass(3)}>
              <Button color="link" className="disabled">
                <span>3</span>
              </Button>
            </li>
          </ul>
        </div>
        <div
          className={`post-job-inner ${
            _currentstage === 3 ? "gallery-block" : ""
            }`}
        >
          <LocalForm
            initialState={_jobDetails}
            onSubmit={values =>
              _handleJobPost(
                values,
                startDate,
                endDate,
                imageData,
                images,
                _currentstage
              )
            }
            getDispatch={dispatch => dispatch(actions.change(_jobDetails))}
          >
            {/* Stage 1 */}
            {_currentstage === 1 && (
              <div className="row flex-wrap post-job-form">
                <div className="col-md-6">
                  <label className="input-title">Select Category</label>
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
                      onChange={category => _handleCategoryOnchange(category)}
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
            )}
            {/* Stage 2 */}
            {_currentstage === 2 && (
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
            )}
            {/* Stage 3 */}
            {_currentstage === 3 && (
              <>
                <div className="post-job-gallery d-flex justify-content-center">
                  <ul className="d-flex flex-wrap ml-auto mr-auto">
                    {images &&
                      images.length > 0 &&
                      images.slice(0, 5).map((item, key) => {
                        return (
                          <li key={key} className="position-relative">
                            <Button
                              color="link"
                              className="gallery-btn d-flex align-items-center justify-content-center position-absolute"
                              onClick={() => removeImage(key)}
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
                            </Button>
                            <img src={item} alt="Job Pic" />
                          </li>
                        );
                      })}
                    {uploadedImages &&
                      uploadedImages.map((item, key) => {
                        return (
                          <li key={key} className="position-relative">
                            <Button
                              color="link"
                              className="gallery-btn d-flex align-items-center justify-content-center"
                              onClick={() => removeUploadedImage(key)}
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
                            </Button>
                            <img src={`${apiUrl}/${item.path}`} alt="Job Pic" />
                          </li>
                        );
                      })}

                    <li>
                      <Button
                        color="primary"
                        block
                        className="add-gallery-btn position-relative"
                        type="button"
                      >
                        <InputCell
                          Name={"file"}
                          Model=".images"
                          InputType="file"
                          Placeholder={"Image Upload"}
                          Multiple="multiple"
                          Errors={{ required: "" }}
                          HandleImageOnchange={handleImageOnchange}
                        />
                        <svg
                          id="_x38__3_"
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                        >
                          <g id="Group_512" data-name="Group 512">
                            <path
                              id="Path_902"
                              data-name="Path 902"
                              d="M24,0A24,24,0,1,0,48,24,24,24,0,0,0,24,0Zm0,45A21,21,0,1,1,45,24,21,21,0,0,1,24,45Zm9-22.5H25.5V15a1.5,1.5,0,1,0-3,0v7.5H15a1.5,1.5,0,1,0,0,3h7.5V33a1.5,1.5,0,0,0,3,0V25.5H33a1.5,1.5,0,0,0,0-3Z"
                              fill="#fff"
                            />
                          </g>
                        </svg>
                      </Button>
                    </li>
                  </ul>
                </div>
                {isImageLengthExist ? (
                  <div className="job-post-img-error text-danger text-center">
                    You can't select more then 5 images
                </div>
                ) : (
                    ""
                  )}
              </>
            )}

            {/* Next, Save, Back and Cancel button */}
            <div className="post-job-btns text-center d-flex justify-content-center">
              {_currentstage === 1 && (
                <Link
                  className="text-black btn-dark cancel btn btn-link"
                  to={"/"}
                >
                  Cancel
              </Link>
              )}
              {_currentstage !== 1 && (
                <Button
                  color="link"
                  className="btn-dark"
                  type="button"
                  onClick={() => {
                    _handleStageChange(-1);
                  }}
                >
                  Back
              </Button>
              )}
              {_currentstage !== 3 && (
                <Button type="submit" color="secondary">
                  Next
              </Button>
              )}
              {_currentstage === 3 && (
                <div>
                  {/* <Button
                color="secondary"
                disabled={isImageLengthExist}
                onClick={_openPreviewData}
              >
                View Job
              </Button> */}
                  <Button
                    color="secondary"
                    type="submit"
                    disabled={isImageLengthExist}
                  >
                    {path == '/post-job' ?
                      'Post Now'
                      : 'Update Job'}
                  </Button>
                </div>
              )}
            </div>
          </LocalForm>
        </div>
        {openView ?
          <ReviewJob
            _jobDetails={previewData}
            _selectedCategory={_selectedCategory}
            CategoryItems={CategoryItems}
            closePrevieModal={closePrevieModal}
            images={images}
            pagesCount={getPagesNumbers}
          />
          : null
        }
      </div>

      {/* ViewJob Modal Start */}
      {/* <Modal isOpen={modal} toggle={toggle} size="lg" 
      className="d-flex flex-column align-items-center  
     justify-content-center users-review-mdl">
     <Spinner className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center with-overlay overlay-opacity" />
     <ModalHeader>
       User Reviews
       <Button
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
       </Button>
     </ModalHeader>
     <ModalBody className="job-view-blc overflow-auto">  
       
     </ModalBody>
   </Modal> */}
      {/* ViewJob Modal Ends */}
    </>
  );
};
