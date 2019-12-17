import React from "react";
import "./userInfo.scss";
const UserInfo = ({ description }) => {
  return (
    <div className="bidder-profl-rw bidder-profile-desc bidder-profile-l-padd">
      <h3>About Me</h3>
      <p>{description}</p>
    </div>
  );
};

export default UserInfo;
