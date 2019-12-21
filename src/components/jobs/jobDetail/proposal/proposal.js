import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserImage from "../userImage/userImage";
import RatingBlock from "../../ratingBock/ratingBlock";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./proposal.scss";
import { DaysBetween } from "../../../../utilities/common";
import AcceptProposalModal from "../../../commonUi/modal/modal";
import { acceptBid, rejectBid } from "../../../../actions/bid";

const Proposal = ({ props, jobId, history }) => {
  const dispatch = useDispatch();
  let imagepath = false;
  if (
    props.job_provider_id &&
    props.job_provider_id.image &&
    props.job_provider_id.image.length !== 0
  ) {
    imagepath = props.job_provider_id.image;
  }

  const [openModal, setOpenModal] = useState(false);
  const [acceptProposal, setAcceptProposal] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);

  let daysfrom = new Date() - new Date(DaysBetween(props.created_at));
  daysfrom = parseInt(daysfrom / (1000 * 3600 * 24));

  const confirmAccept = value => {
    confirmAlert({
      title: "",
      message: "Are you sure do you want to pay for this job ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => setAcceptProposal(true)
        },
        {
          label: "No",
          onClick: () => setOpenModal(false)
        }
      ]
    });
  };

  const handleAccept = value => {
    setModalLoading(true);
    const reqData = {
      job_provider_id: value.job_provider_id._id,
      job_id: jobId,
      card: {
        cardId: "card_1Fo4x0DakNpcPSmAjYVZQ1MX",
        // cardCvv: "",
        last4: "4242",
        amount: value.bid_amount,
        meta: {
          bidderId: value.job_provider_id._id,
          name: `${value.job_provider_id.fname} ${value.job_provider_id.lname}`
        }
      }
    };
    dispatch(
      acceptBid(reqData, callback => {
        if (callback) {
          setOpenModal(false);
          history.push("/job-list");
          setModalLoading(false);
        } else {
          setOpenModal(false);
          setModalLoading(false);
        }
      })
    );
  };

  const hadleReject = value => {
    setModalLoading(true);
    dispatch(
      rejectBid(
        { job_provider_id: value.job_provider_id._id, job_id: jobId },
        callback => {
          if (callback) {
            history.push("/job-list");
            setOpenModal(false);
            setModalLoading(false);
          } else {
            setOpenModal(false);
            setModalLoading(false);
          }
        }
      )
    );
  };
  return (
    <div className="proposal-rw d-flex" onClick={() => setOpenModal(true)}>
      <div className="proposal-col-l">
        <UserImage image={imagepath} />
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
        _handleAccept={confirmAccept}
        _hadleReject={hadleReject}
        _propsDetails={{ ...props, daysfrom: daysfrom }}
        _acceptProposal={acceptProposal}
        _loading={isModalLoading}
      />
    </div>
  );
};

export default Proposal;
