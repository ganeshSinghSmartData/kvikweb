import React, { useState } from "react";
import { Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm } from "react-redux-form";
import JobAddress from "../jobDetail/JobAddress/jobAddress";
import UserInfo from "../bidderProfile/userInfo/userInfo";
import InputCell from "../../commonUi/input/inputCell";
import UserImage from "../jobDetail/userImage/userImage";
import "./userProfileDetail.scss";
import StripeCard from '../../../config/stripe';
import { AddCard } from '../../../actions/user';
import UserPayment from "./userPayment";

const UserProfile = ({ path, user, _handleSubmit }) => {


  return (
    <div className="data-page user-profl-blc">
      <div className="d-flex user-profl-blc-rw">
        <div className="user-profl-col flex-fill">
          <div className="user-profl-rw d-flex">
            <div className="user-profl-l flex-fill">
              <LocalForm onSubmit={values => _handleSubmit(values)}>
                {path ? (
                  <JobAddress job_seeker_id={user} />
                ) : (
                    <div className="job-address d-flex">
                      <UserImage />
                      <div className="job-user-info flex-fill">
                        <Label>Address</Label>
                        <InputCell
                          Name={"address"}
                          Placeholder={"Card Number"}
                          Model=".address"
                          InputType={"text"}
                          className="input-line-blc"
                          Errors={{ required: "required" }}
                        />
                        <Label>Email</Label>
                        <InputCell
                          Name={"email"}
                          Placeholder={"Card Number"}
                          Model=".email"
                          InputType={"text"}
                          className="input-line-blc"
                          Errors={{ required: "required" }}
                        />
                        <Label>Phone</Label>
                        <InputCell
                          Name={"phone"}
                          Placeholder={"Card Number"}
                          Model=".phone"
                          InputType={"text"}
                          className="input-line-blc"
                          Errors={{ required: "required" }}
                        />
                        <Label>About Me </Label>
                        <InputCell
                          Name={"aboutme"}
                          Placeholder={"Card Number"}
                          Model=".aboutme"
                          InputType={"textarea"}
                          className="input-line-blc"
                          Errors={{ required: "required" }}
                        />
                        <div className="post-job-btns text-center d-flex justify-content-center">
                          <Button
                            color="text-black btn-dark cancel btn btn-link"
                            type="button"
                          >
                            Cancel
                        </Button>
                          <Button color="secondary" type="submit">
                            Submit
                        </Button>
                        </div>
                      </div>
                    </div>
                  )}
              </LocalForm>
            </div>
            {path && (
              <div className="user-profl-edit flex-shrink-0">
                <Link className="btn btn-link" to={"/edit-profile"}>
                  <Button color="link" className="edit-btn">
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
                </Link>
              </div>
            )}
          </div>
          {path && <UserInfo handleSsubmit={_handleSubmit} />}
        </div>
        <UserPayment></UserPayment>
      </div>
    </div>
  );
};

export default UserProfile;
