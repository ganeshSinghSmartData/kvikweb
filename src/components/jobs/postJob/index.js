import React from "react";
import { Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm } from "react-redux-form";

import InputCell from "../../commonUi/input/inputCell";
import "./postJob.scss";

export default ({
  _currentstage,
  _handleStageChange,
  _handleJobPost,
  _handleJobUpdate
}) => {
  return (
    <div className="post-wrapper data-block ml-auto mr-auto">
      {/* Top Header Buttons */}
      <div className="post-job-nav d-flex justify-content-center">
        <ul className="d-flex">
          <li className="complete">
            <Button color="link">
              <span>1</span>
            </Button>
          </li>
          <li className="active">
            <Button color="link">
              <span>2</span>
            </Button>
          </li>
          <li>
            <Button color="link">
              <span>3</span>
            </Button>
          </li>
        </ul>
      </div>
      <div className="post-job-inner">
        <LocalForm>
          {/* Stage 1 */}
          {_currentstage === 1 && (
            <div className="row flex-wrap post-job-form">
              <div className="col-md-6">
                <label className="input-title">Select Category</label>
                <InputCell
                  Name={"select"}
                  Model=".jobAbout"
                  InputType="select"
                  ClassName={"custom-select"}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </InputCell>
              </div>
              <div className="col-md-6">
                <label className="input-title">Job Title</label>
                <InputCell
                  Name={"password"}
                  Placeholder={"First Name"}
                  Model=".lname"
                  InputType={"text"}
                />
              </div>
              <div className="col-md-6">
                <label className="input-title">About the job</label>
                <InputCell
                  Name={"aboutjob"}
                  Placeholder={"About the job"}
                  Model=".aboutTheJob"
                  InputType={"textarea"}
                />
              </div>
              <div className="col-md-6">
                <InputCell
                  Name={"cost"}
                  Placeholder={"Cost"}
                  Model=".cost"
                  InputType={"number"}
                />
              </div>
            </div>
          )}
          {/* Stage 2 */}
          {_currentstage === 2 && (
            <div className="row flex-wrap post-job-form">
              {/* <div className="col-md-6">
                <label className="input-title">Select Category</label>
                <InputCell
                  Name={"select"}
                  Model=".jobAbout"
                  InputType="select"
                  ClassName={"custom-select"}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </InputCell>
              </div> */}
              <div className="col-md-6">
                <label className="input-title">Location</label>
                <InputCell
                  Name={"location"}
                  Placeholder={"Location"}
                  Model=".location"
                  InputType={"text"}
                />
              </div>
              <div className="col-md-6">
                <label className="input-title">Address</label>
                <InputCell
                  Name={"address"}
                  Placeholder={"Address"}
                  Model=".address"
                  InputType={"text"}
                />
              </div>
              <div className="col-md-4">
                <label className="input-title">Date</label>
                <InputCell
                  Name={"address"}
                  Placeholder={"Address"}
                  Model=".address"
                  InputType={"text"}
                />
              </div>
              <div className="col-md-4">
                <label className="input-title">Time</label>
                <InputCell
                  Name={"address"}
                  Placeholder={"Address"}
                  Model=".address"
                  InputType={"text"}
                />
              </div>
              <div className="col-md-6">
                <label className="input-title">Frequency</label>
                <InputCell
                  Name={"frequency"}
                  Model=".frequency"
                  InputType="select"
                  Placeholder={"Frequency"}
                  ClassName={"custom-select"}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </InputCell>
              </div>

              <div className="col-md-6">
                <label className="input-title">Duration</label>
                <InputCell
                  Name={"duration"}
                  Placeholder={"Duration"}
                  Model=".duration"
                  InputType={"number"}
                />
              </div>
            </div>
          )}
          {/* Stage 3 */}
          {_currentstage === 3 && (
            <div className="post-job-gallery d-flex">
              <ul className="d-flex flex-wrap ml-auto mr-auto">
                <li>
                  <img
                    src={require("./../../../assets/images/job-gallery/1.jpg")}
                    alt="Job Pic"
                  />
                </li>
                <li>
                  <img
                    src={require("../../../assets/images/job-gallery/1.jpg")}
                    alt="Job Pic"
                  />
                </li>
                <li>
                  <img
                    src={require("../../../assets/images/job-gallery/1.jpg")}
                    alt="Job Pic"
                  />
                </li>
                <li>
                  <img
                    src={require("../../../assets/images/job-gallery/1.jpg")}
                    alt="Job Pic"
                  />
                </li>
                <li>
                  <img
                    src={require("../../../assets/images/job-gallery/1.jpg")}
                    alt="Job Pic"
                  />
                </li>
                <li>
                  <img
                    src={require("../../../assets/images/job-gallery/1.jpg")}
                    alt="Job Pic"
                  />
                </li>
                <li>
                  <Button
                    color="primary"
                    block
                    className="add-gallery-btn position-relative"
                  >
                    <Input type="file" name="file" />
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
            {_currentstage != 3 && (
              <Button
                color="secondary"
                onClick={() => {
                  _handleStageChange(1);
                }}
              >
                NEXT
              </Button>
            )}
            {_currentstage === 3 && (
              <Button
                color="secondary"
                onClick={() => {
                  _handleJobPost("stage");
                }}
              >
                POST NOW
              </Button>
            )}
          </div>
        </LocalForm>
      </div>
    </div>
  );
};
