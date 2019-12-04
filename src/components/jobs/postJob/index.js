import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { Control } from "react-redux-form";
import { Link } from "react-router-dom";
import { LocalForm } from "react-redux-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import InputCell from "../../commonUi/input/inputCell";
import "./postJob.scss";

export default ({
  _currentstage,
  _handleStageChange,
  _handleJobPost,
  _handleJobUpdate
}) => {
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  let files;
  const handleImageOnchange = event => {
    files = event.target.files;
    setImageData(files);
    console.log("files: ", files);
    const imagesData = Object.values(files).reduce((list, key) => {
      if (key && typeof key === "object") {
        let url = URL.createObjectURL(key);
        list.push(url);
      }
      return list;
    }, []);
    setImages(imagesData);
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
    <div className="post-wrapper data-block ml-auto mr-auto">
      {/* Top Header Buttons */}
      <div className="post-job-nav d-flex justify-content-center">
        <ul className="d-flex">
          <li className={getClass(1)}>
            <Button color="link">
              <span>1</span>
            </Button>
          </li>
          <li className={getClass(2)}>
            <Button color="link">
              <span>2</span>
            </Button>
          </li>
          <li className={getClass(3)}>
            <Button color="link">
              <span>3</span>
            </Button>
          </li>
        </ul>
      </div>
      <div className="post-job-inner">
        <LocalForm
          onSubmit={values =>
            _handleJobPost(values, startDate, endDate, imageData, _currentstage)
          }
        >
          {/* Stage 1 */}
          {_currentstage === 1 && (
            <div className="row flex-wrap post-job-form">
              <div className="col-md-6">
                <label className="input-title">Select Category</label>
                <InputCell
                  Name={"category"}
                  Model=".category"
                  InputType="select"
                  ClassName={"custom-select"}
                  Errors={{ required: "required" }}
                ></InputCell>
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
                  InputType={"number"}
                  Errors={{ required: "required" }}
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
                  InputType={"number"}
                  Errors={{ required: "required" }}
                />
              </div>
              <div className="col-md-4">
                <label className="input-title">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  showTimeInput
                />
              </div>
              <div className="col-md-4">
                <label className="input-title">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
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
                  ClassName={"custom-select"}
                  Errors={{ required: "required" }}
                />
              </div>
            </div>
          )}
          {/* Stage 3 */}
          {_currentstage === 3 && (
            <div className="post-job-gallery d-flex">
              <ul className="d-flex flex-wrap ml-auto mr-auto">
                {images &&
                  images.length > 0 &&
                  images.map((item, key) => {
                    return (
                      <li key={key}>
                        <img src={item} alt="Job Pic" />
                      </li>
                    );
                  })}
                <li>
                  <Button
                    color="primary"
                    block
                    className="add-gallery-btn position-relative"
                  >
                    <Input
                      type="file"
                      model=".images"
                      name="file"
                      multiple="multiple"
                      onChange={event => handleImageOnchange(event)}
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
          <div className="post-job-btns text-center">
            {_currentstage === 1 && (
              <Link className="text-black" to={"/"}>
                <Button color="link" className="btn-dark">
                  CANCEL
                </Button>
              </Link>
            )}
            {_currentstage !== 1 && (
              <Button
                color="link"
                className="btn-dark"
                onClick={() => {
                  _handleStageChange(-1);
                }}
              >
                BACK
              </Button>
            )}
            {_currentstage !== 3 && (
              <Button
                type="submit"
                color="secondary"
                /* onClick={() => {
                  _handleStageChange(1);
                }} */
              >
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
