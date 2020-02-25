import React from "react";
import "./userInfo.scss";
import { getTranslations } from "../../../../utilities/translations";
const UserInfo = ({ description }) => {
  return (
    <div className="bidder-profl-rw bidder-profile-desc bidder-profile-l-padd">
      <h3>{getTranslations("about_me")}</h3>
      <p>{description}</p>
    </div>
  );
};

export default UserInfo;
