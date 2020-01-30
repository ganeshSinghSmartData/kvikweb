import React, { useState } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LocalForm, actions } from "react-redux-form";

import Heading from "../../commonUi/heading/heading";
import JobAddress from "../jobDetail/JobAddress/jobAddress";
import UserInfo from "../bidderProfile/userInfo/userInfo";
import InputCell from "../../commonUi/input/inputCell";
import UserImage from "../jobDetail/userImage/userImage";
import UserPayment from "./userPayment";
import "./userProfileDetail.scss";
import RatingBlock from '../ratingBock/ratingBlock';
import Spinner from "../../commonUi/spinner/spinner";

const UserProfile = ({
  user,
  handleImageUpload,
  imegeUploading,
  isEdit,
  handleSubmit,
  loading,
  _toggleEdit,
  job_seeker_id
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className="job-detail-blc d-flex flex-column flex-fill">
      <div className="detail-blc-hd d-flex align-items-center mb-3">
        <Heading className="h3 flex-fill mb-0 mr-3">
          Profile
        </Heading>
        <div className="user-profl-edit">
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
        </div>
      </div>

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
                      imegeUploading={imegeUploading}
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
                            imegeUploading={imegeUploading}
                            edit={isEdit}
                          />
                          <div className="job-user-info flex-fill">
                            <div className="edit-profile-blc text-left">
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
                <div className="flex-shrink-0">
                  <div className="user-review-blc d-flex flex-column align-items-end">
                    <RatingBlock />
                    <Button color="link"
                      className="user-rating-btn p-0 text-primary"
                      onClick={toggle}
                    >
                      See your Reviews
                    </Button>
                    {/* Review Modal Start */}
                    <Modal isOpen={modal} toggle={toggle} size="lg" className="d-flex flex-column align-items-center  
                      justify-content-center users-review-mdl">
                      {/* <Spinner className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center with-overlay overlay-opacity" /> */}
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
                      <ModalBody className="users-review-blc overflow-auto">
                      <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                        <div className="users-review-card d-flex shadow-sm bg-white">
                          <div className="users-review-hd">
                            <UserImage className="linkImage" />
                          </div>
                          <div className="users-review-inner">
                            <div className="users-review-cell">
                              <div className="review-lbl-cell d-flex flex-column align-items-start">
                                <Button color="link" className="p-0 review-lbl-1">
                                  Chandigarh Painting
                               </Button>
                              </div>
                              <RatingBlock className="users-review-rating" />
                              <label className="users-review-time d-block mb-0">
                                Jan 2016
                               </label>
                            </div>
                            <div className="users-review-txt">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            </div>
                          </div>
                        </div>
                      </ModalBody>
                    </Modal>
                    {/* Review Modal Ends */}
                  </div>
                  <div className="profile-bar ml-auto user-profile-bar">
                    <span className="profile-percentage">95%</span>
                    <div className="progress">
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                    <span className="d-block profile-bar-txt text-left">
                      Profile Completion
                    </span>
                  </div>
                  {/* <Button
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
                  </Button> */}
                  {/* </Link> */}
                </div>
              )}
            </div>
            {!isEdit && <UserInfo description={user.about} />}
            <div className="bidder-profl-rw bidder-profile-desc bidder-profile-l-padd">
              <h3>Skills</h3>
              <p>
                Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with 'real' content. This is required when, for example, the final text is not yet available.
              </p>
            </div>
          </div>
          <UserPayment />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
