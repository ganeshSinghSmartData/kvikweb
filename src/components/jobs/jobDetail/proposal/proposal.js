import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserImage from "../userImage/userImage";
import RatingBlock from "../../ratingBock/ratingBlock";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import "./proposal.scss";
import { GetCards } from "../../../../actions/user";
import { DaysBetween } from "../../../../utilities/common";
import AcceptProposalModal from "../../../commonUi/modal/modal";
import { acceptBid, rejectBid } from "../../../../actions/bid";

const Proposal = ({ props, jobId, history, isclick = false }) => {
  const dispatch = useDispatch();

  let usercards = [];
  let user = useSelector(state => state.user);
  if (user && user.cards && user.cards.length !== 0) {
    usercards = user.cards;
  }
  useEffect(() => {
    if (usercards.length === 0) {
      dispatch(GetCards());
    }
  });

  let imagepath = [];
  let username = "Dummy User";

  if (props.job_provider_id) {
    imagepath = props.job_provider_id.image;
    username = `${props.job_provider_id.fname} ${props.job_provider_id.lname}`;
  } else {
    username = `${props.user.fname} ${props.user.lname}`;
    imagepath = props.user.image;
  }

  const [openModal, setOpenModal] = useState(false);
  const [acceptProposal, setAcceptProposal] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(usercards[0]);

  let daysfrom = new Date() - new Date(DaysBetween(props.created_at));
  daysfrom = parseInt(daysfrom / (1000 * 3600 * 24));

  const confirmAccept = () => {
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

  const makePayment = () => {
    setModalLoading(true);
    const reqData = {
      job_provider_id: props.job_provider_id._id,
      job_id: jobId,
      card: {
        cardId: selectedCard.id,
        // cardCvv: "",
        last4: selectedCard.last4,
        amount: props.bid_amount,
        meta: {
          bidderId: props.job_provider_id._id,
          name: `${props.job_provider_id.fname} ${props.job_provider_id.lname}`
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
    <div
      className="proposal-rw d-flex"
      onClick={() => (isclick ? setOpenModal(true) : {})}
    >
      <div className="proposal-col-l">
        <UserImage image={imagepath} />
      </div>
      <div className="proposal-col-m flex-fill">
        <h5>{username}</h5>
        <p>{props.job_provider_id ? props.description : props.review}</p>
      </div>
      <div className="proposal-col-r time-rate text-right flex-shrink-0">
        {props.job_provider_id && (
          <React.Fragment>
            <span className="d-block"> {daysfrom} Day Ago</span>
            <h3 className="text-primary">${props.bid_amount}</h3>
          </React.Fragment>
        )}
        <RatingBlock rating={props.rating} />
      </div>
      {props.job_provider_id && (
        <AcceptProposalModal
          _isOpen={openModal}
          _toggleModal={() => setOpenModal(false)}
          _modalType={"Bid Details"}
          _handleAccept={confirmAccept}
          _hadleReject={hadleReject}
          _propsDetails={{ ...props, daysfrom: daysfrom }}
          _acceptProposal={acceptProposal}
          _loading={isModalLoading}
          _cards={usercards}
          _cardHolderName={` ${user.data.fname} ${user.data.lname}`}
          _selectedCard={value => setSelectedCard(value)}
          _makePayment={makePayment}
        />
      )}
    </div>
  );
};

export default Proposal;
