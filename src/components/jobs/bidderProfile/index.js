import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";

import JobAddress from "../jobDetail/JobAddress/jobAddress";
import Proposal from "../jobDetail/proposal/proposal";
import Chat from "./chat/chat";
import UserInfo from "./userInfo/userInfo";
import { getUserDetails } from "./../../../actions/user";
import "./bidderProfile.scss";

const BidderProfile = ({ user_id, review }) => {
  const dispatch = useDispatch();
  const biderDetails = useSelector(state => state.user.userDetails);

  useEffect(() => {
    if (user_id) {
      dispatch(getUserDetails(user_id));
    }
  }, []);
  const [chatVisible, setchatVisible] = useState(false);
  const chatToggle = () => {
    setchatVisible(!chatVisible);
  };
  const chatHideCallback = value => {
    setchatVisible(value);
  };

  return (
    <>
      <div className="bidder-profl-wrapper">
        <h3 className="text-center">Profile</h3>
        <div className="data-page bidder-profl-blc position-relative">
          <div className="bidder-profl-blc-rw">
            <div className="bidder-profl-rw d-flex">
              <div className="bidder-profl-l">
                <JobAddress job_seeker_id={biderDetails} />
              </div>
            </div>
            <UserInfo description={biderDetails.about} />
            <div className="bidder-profl-rw bidder-profile-l-padd bidder-profile-list">
              <ul className="d-flex flex-wrap">
                <li>
                  <h3>{biderDetails.total_jobs}</h3>
                  <label>Jobs</label>
                </li>
                <li>
                  <h3>${biderDetails.total_earnings}k</h3>
                  <label>Total Earnings</label>
                </li>
                {/* <li>
                  <h3>1,500</h3>
                  <label>Hours Worked</label>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="bidder-profl-blc-rw bidder-review">
            <h2>REVIEWS</h2>
            {review.length !== 0 &&
              review.map((item, key) => {
                return <Proposal props={item} key={key} />;
              })}
            {review.length === 0 && <h6>No review found.</h6>}
          </div>

          <Button
            color="primary"
            className="chat-btn rounded-circle position-fixed"
            onClick={chatToggle}
          >
            <svg
              id="chat"
              xmlns="http://www.w3.org/2000/svg"
              width="19.361"
              height="19.37"
              viewBox="0 0 19.361 19.37"
            >
              <g id="Group_7885" data-name="Group 7885">
                <path
                  id="Path_3432"
                  data-name="Path 3432"
                  d="M16.643,2.839A9.682,9.682,0,0,0,2.31,15.825,3.634,3.634,0,0,1,.785,17.59a.9.9,0,0,0,.26,1.7,4.608,4.608,0,0,0,.685.053h0a6.262,6.262,0,0,0,3.48-1.127A9.685,9.685,0,0,0,16.643,2.839Z"
                  transform="translate(-0.117 0)"
                  fill="#fff"
                />
              </g>
            </svg>
          </Button>
          <Chat
            Id={biderDetails._id}
            chatToggle={chatVisible}
            chatHideCallback={value => chatHideCallback(value)}
          />
        </div>
      </div>
    </>
  );
};

export default BidderProfile;
