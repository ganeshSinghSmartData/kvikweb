import React from "react";

const Status = (props) => {
  return (
    <li
      className={`d-flex justify-content-center position-relative  ${
        props.isActive ? "active-step" : ""
      } ${props.isComplete ? "complete" : ""} ${
        props.isRejected ? "rejected" : ""
      }`}
    >
      {props.index > 0 && <span className="step-bar position-absolute"></span>}
      <label className="d-flex flex-column align-items-center position-relative mb-0">
        <span className="step-cell d-flex flex-column align-items-center justify-content-center rounded-circle">
          <span className="inline-block rounded-circle"></span>
        </span>
        <span className="step-label">{props.title}</span>
      </label>
    </li>
  );
};

export default Status;
