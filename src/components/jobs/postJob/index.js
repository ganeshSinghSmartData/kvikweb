import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm } from "react-redux-form";
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./postJob.scss";

import { apiUrl } from "../../../environment";
import { CategoryItems, FrequencyItem } from "./../../../utilities/constants";
import InputCell from "../../commonUi/input/inputCell";
import Loader from "../../../components/commonUi/loader/loader";

export default ({
  _jobDetails = {},
  _currentstage,
  _handleStageChange,
  _handleJobPost,
  _handleCategoryOnchange,
  _handleJobUpdate,
  _path,
  dataload,
  _selectedCategory
}) => {
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState(
    _jobDetails && _jobDetails.images ? _jobDetails.images : []
  );
  const [imageData, setImageData] = useState({});

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
      return new Date(moment(new Date(), "DD-MM-YYYY").add(7, "days"));
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

  const handleImageOnchange = event => {
    files = event;
    setImageData({ ...imageData, ...files });
    const imagesData = Object.values(files).reduce((list, key) => {
      if (key && typeof key === "object") {
        let url = URL.createObjectURL(key);
        list.push(url);
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

  return (
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
              uploadedImages,
              _currentstage
            )
          }
        >
          {/* Stage 1 */}
          {_currentstage === 1 && (
            <div className="row flex-wrap post-job-form">
              <div className="col-md-6">
                <label className="input-title">Select Category</label>
                <SelectSearch
                  options={CategoryItems}
                  className={"select-search-box"}
                  value={_selectedCategory}
                  name="category"
                  onMount={() => _handleCategoryOnchange(_selectedCategory)}
                  onChange={category => _handleCategoryOnchange(category.value)}
                  placeholder="Category"
                />
              </div>
              <div className="col-md-6">
                <label className="input-title">Job Title</label>
                <InputCell
                  Name={"jobtitle"}
                  Placeholder={"Job Title"}
                  Model=".jobtitle"
                  InputType={"text"}
                  Errors={{ required: "required" }}
                />
              </div>
              <div className="col-md-6">
                <label className="input-title">About the job</label>
                <InputCell
                  Name={"aboutjob"}
                  Placeholder={"About the job"}
                  Model=".description"
                  InputType={"textarea"}
                  Errors={{ required: "required" }}
                />
              </div>
              <div className="col-md-6">
                <label className="input-title">Budget</label>
                <InputCell
                  Name={"budget"}
                  Placeholder={"Budget"}
                  Model=".budget"
                  InputType={"text"}
                  Errors={{
                    invalidNumber: "invalidNumber"
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
                  Errors={{ required: "required" }}
                />
              </div>
              <div className="col-md-4">
                <label className="input-title">City</label>
                <InputCell
                  Name={"city"}
                  Placeholder={"City"}
                  Model=".city"
                  InputType={"text"}
                  Errors={{ required: "required" }}
                />
              </div>
              <div className="col-md-4">
                <label className="input-title">Postal Code</label>
                <InputCell
                  Name={"postalCode"}
                  Placeholder={"Postal Code"}
                  Model=".location"
                  InputType={"text"}
                  Errors={{
                    required: "required",
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
                          moment(new Date(date), "DD-MM-YYYY").add(7, "days")
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
                  minDate={startDate}
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
            <div className="post-job-gallery d-flex justify-content-center">
              <ul className="d-flex flex-wrap ml-auto mr-auto">
                {images &&
                  images.length > 0 &&
                  images.map((item, key) => {
                    return (
                      <li key={key} className="position-relative">
                        <Button
                          color="link"
                          className="gallery-btn d-flex align-items-center justify-content-center"
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
          )}

          {/* Next, Save, Back and Cancel button */}
          <div className="post-job-btns text-center d-flex justify-content-center">
            {_currentstage === 1 && (
              <Link
                className="text-black btn-dark cancel btn btn-link"
                to={"/"}
              >
                CANCEL
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
                BACK
              </Button>
            )}
            {_currentstage !== 3 && (
              <Button type="submit" color="secondary">
                NEXT
              </Button>
            )}
            {_currentstage === 3 && (
              <Button color="secondary" type="submit">
                POST NOW
              </Button>
            )}
          </div>
        </LocalForm>
      </div>
    </div>
  );
};
