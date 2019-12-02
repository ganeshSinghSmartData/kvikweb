import React from 'react';
import { Button } from 'reactstrap';
import JobAddress from '../../jobs/jobDetail/JobAddress/jobAddress';
import Proposal from "../../jobs/jobDetail/proposal/proposal";
import Chat from './chat/chat';
import './bidderProfile.scss';
const BidderProfile = () => {
  return (
    <div className="data-page bidder-profl-blc position-relative">
      <div className="bidder-profl-blc-rw">
        <div className="bidder-profl-rw d-flex">
          <div className="bidder-profl-l">
            <JobAddress />
          </div>
          <div className="bidder-profl-r ml-auto">
            <div className="profile-bar ml-auto">
              <span className="profile-percentage">95%</span>
              <div className="progress">
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }}></div>
              </div>
              <span className="d-block profile-bar-txt text-left">Profile Completion</span>
            </div>
            <div className="mark-btn">
              <Button color="secondary" block>
                Mark as Done
              </Button>
            </div>
          </div>
        </div>
        <div className="bidder-profl-rw bidder-profile-desc bidder-profile-l-padd">
          <h3>About Me</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque leo ipsum, consequat a tellus pharetra, commodo bibendum dui. In rhoncus lacus ut justo lacinia, id tempus ligula convallis.
          </p>
        </div>
        <div className="bidder-profl-rw bidder-profile-l-padd bidder-profile-list">
          <ul className="d-flex">
            <li>
              <h3>
                43
                </h3>
              <label>Jobs</label>
            </li>
            <li>
              <h3>
                $31k+
                </h3>
              <label>
                Total Earnings
                </label>
            </li>
            <li>
              <h3>
                1,500
                </h3>
              <label>
                Hours Worked
                </label>
            </li>
          </ul>
        </div>
      </div>
      <div className="bidder-profl-blc-rw bidder-review">
        <h2>REVIEWS</h2>
        <Proposal />
      </div>

      <Button color="primary" className="chat-btn rounded-circle position-absolute">
        <svg id="chat" xmlns="http://www.w3.org/2000/svg" width="19.361" height="19.37" viewBox="0 0 19.361 19.37">
          <g id="Group_7885" data-name="Group 7885">
            <path id="Path_3432" data-name="Path 3432" d="M16.643,2.839A9.682,9.682,0,0,0,2.31,15.825,3.634,3.634,0,0,1,.785,17.59a.9.9,0,0,0,.26,1.7,4.608,4.608,0,0,0,.685.053h0a6.262,6.262,0,0,0,3.48-1.127A9.685,9.685,0,0,0,16.643,2.839Z" transform="translate(-0.117 0)" fill="#fff" />
          </g>
        </svg>
      </Button>
      <Chat />
    </div>
  );
};

export default BidderProfile;