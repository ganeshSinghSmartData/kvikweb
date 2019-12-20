import React, { useState } from "react";
import { Button, Label } from "reactstrap";
import { LocalForm, actions } from "react-redux-form";

import Heading from "../../commonUi/heading/heading";
import JobAddress from "../jobDetail/JobAddress/jobAddress";
import UserInfo from "../bidderProfile/userInfo/userInfo";
import InputCell from "../../commonUi/input/inputCell";
import UserImage from "../jobDetail/userImage/userImage";
import UserPayment from "./userPayment";

import "./userProfileDetail.scss";

const UserProfile = ({
  user,
  handleImageUpload,
  isEdit,
  handleSubmit,
  loading,
  _toggleEdit
}) => {
  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <Heading className="h3 text-center">Profile</Heading>
      <div className="data-page user-profl-blc">
        <div className="d-flex user-profl-blc-rw">
          <div className="user-profl-col flex-fill">
            <div className="user-profl-rw d-flex">
              <div className="user-profl-l flex-fill">
                <LocalForm
                  initialState={user}
                  onSubmit={values => handleSubmit(values)}
                  getDispatch={dispatch => dispatch(actions.change(user))}
                >
                  {!isEdit ? (
                    <JobAddress
                      job_seeker_id={user}
                      handleImageUpload={handleImageUpload}
                      editimage={true}
                    />
                  ) : (
                      <React.Fragment>
                        <div
                          className={`job-address d-flex ${
                            isEdit ? "editMode" : ""
                            }`}
                        >
                          <UserImage
                            image={user.image}
                            handleImageUpload={handleImageUpload}
                            edit={isEdit}
                          />
                          <div className="job-user-info flex-fill">
                            <div className="edit-profile-blc">
                              <Label className="input-title">Email</Label>
                              <InputCell
                                Name={"email"}
                                Placeholder={"Email"}
                                Model=".email"
                                InputType={"text"}
                                Disabled={true}
                                className="input-line-blc"
                                Errors={{
                                  required: "required",
                                  invalidEmail: "invalidEmail"
                                }}
                              />
                              <Label className="input-title">First Name</Label>
                              <InputCell
                                Name={"fname"}
                                Placeholder={"First Name"}
                                Model=".fname"
                                InputType={"text"}
                                className="input-line-blc"
                                Errors={{
                                  required: "required"
                                }}
                              />
                              <Label className="input-title">Last Name</Label>
                              <InputCell
                                Name={"lname"}
                                Placeholder={"Last Name"}
                                Model=".lname"
                                InputType={"text"}
                                className="input-line-blc"
                                Errors={{
                                  required: "required"
                                }}
                              />

                              <Label className="input-title">Mobile</Label>
                              <InputCell
                                Name={"mobile"}
                                Placeholder={"Mobile"}
                                Model=".mobile"
                                InputType={"text"}
                                className="input-line-blc"
                                Errors={{
                                  required: "required",
                                  invalidNumber: "invalidNumber"
                                }}
                              />
                              <Label className="input-title">Zip Code</Label>
                              <InputCell
                                Name={"zip"}
                                Placeholder={"Zip"}
                                Model=".zip_code"
                                InputType={"text"}
                                className="input-line-blc"
                                Errors={{
                                  required: "required",
                                  invalidNumber: "invalidNumber"
                                }}
                              />
                              <Label className="input-title">City</Label>
                              <InputCell
                                Name={"city"}
                                Placeholder={"City"}
                                Model=".city"
                                InputType={"text"}
                                className="input-line-blc"
                                Errors={{
                                  required: "required"
                                }}
                              />
                              <Label className="input-title">About Me </Label>
                              <InputCell
                                Name={"aboutme"}
                                Placeholder={"About Me"}
                                Model=".about"
                                InputType={"textarea"}
                                className="input-line-blc"
                                Errors={{ required: "required" }}
                              />
                            </div>
                            <div className="edit-profile-btns">
                              <Button color="secondary" type="submit">
                                Submit
                            </Button>
                              <Button
                                color="link"
                                className="btn-dark cancel"
                                onClick={() => _toggleEdit(!isEdit)}
                                type="button"
                              >
                                Cancel
                            </Button>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                </LocalForm>
              </div>
              {!isEdit && (
                <div className="user-profl-edit flex-shrink-0">
                  {/* <Link className="btn btn-link" to={""}> */}
                  <Button
                    color="link"
                    className="edit-btn"
                    onClick={() => _toggleEdit(!isEdit)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19.446"
                        height="19.435"
                        viewBox="0 0 19.446 19.435"
                      >
                        <path
                          id="edit"
                          d="M18.987,1.513a4.29,4.29,0,0,0-6.07,0L1.788,12.633a.556.556,0,0,0-.157.319l-.825,6.1a.555.555,0,0,0,.157.468.566.566,0,0,0,.394.166.452.452,0,0,0,.075,0l3.679-.5a.56.56,0,1,0-.149-1.11l-2.95.4.576-4.258L7.071,18.7a.566.566,0,0,0,.394.166.549.549,0,0,0,.394-.166L18.987,7.58a4.283,4.283,0,0,0,0-6.067ZM13.132,2.88,15,4.748,4.846,14.9,2.977,13.031ZM7.468,17.516,5.641,15.69,15.8,5.539l1.827,1.826ZM18.4,6.566,13.932,2.1A3.175,3.175,0,0,1,18.4,6.566Z"
                          transform="translate(-0.8 -0.255)"
                          fill="#9d9d9d"
                        />
                      </svg>
                    </span>
                    <label className="text-secondary mb-0">Edit</label>
                  </Button>
                  {/* </Link> */}
                </div>
              )}
            </div>
            {!isEdit && <UserInfo description={user.about} />}
          </div>
          <UserPayment></UserPayment>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
