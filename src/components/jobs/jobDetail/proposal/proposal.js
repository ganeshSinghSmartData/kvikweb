import React, { useState } from "react";
import UserImage from "../userImage/userImage";
import RatingBlock from "../../ratingBock/ratingBlock";

import "./proposal.scss";
import { DaysBetween } from "../../../../utilities/common";
import AcceptProposalModal from "../../../commonUi/modal/modal";

const Proposal = ({ props }) => {
  const [openModal, setOpenModal] = useState(false);

  let daysfrom = new Date() - new Date(DaysBetween(props.created_at));
  daysfrom = parseInt(daysfrom / (1000 * 3600 * 24));

  const handleAccept = value => {
    console.log("Here i am in accept : ", value);
    setOpenModal(false);
  };
  const hadleReject = value => {
    console.log("Here i am in reject : ", value);
    setOpenModal(false);
  };

  return (
    <div className="proposal-rw d-flex" onClick={() => setOpenModal(true)}>
      <div className="proposal-col-l">
        <UserImage />
      </div>
      <div className="proposal-col-m flex-fill">
        <h5>{`${props.job_provider_id.fname} ${props.job_provider_id.lname}`}</h5>
        <p>{props.description}</p>
      </div>
      <div className="proposal-col-r time-rate text-right flex-shrink-0">
        <span className="d-block"> {daysfrom} Day Ago</span>
        <h3 className="text-primary">${props.bid_amount}</h3>
        {/* <RatingBlock /> */}
      </div>
      <AcceptProposalModal
        _isOpen={openModal}
        _toggleModal={() => setOpenModal(false)}
        _modalType={"Bid Details"}
        _handleAccept={handleAccept}
        _hadleReject={hadleReject}
        _propsDetails={{ ...props, daysfrom: daysfrom }}
      />
    </div>
  );
};

export default Proposal;
