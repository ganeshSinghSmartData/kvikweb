import React from "react";

const StatusBar = (props) => {
  if (props.visible)
    return (
      <>
        <div className="job-step-rw">
          <ul className="d-flex">
            <li className="d-flex justify-content-center position-relative complete">
              {/* <span className="step-bar position-absolute">
                  </span> */}
              <label className="d-flex flex-column align-items-center position-relative mb-0">
                <span className="step-cell d-flex flex-column align-items-center justify-content-center rounded-circle">
                  <span className="inline-block rounded-circle"></span>
                </span>
                <span className="step-label">Open</span>
              </label>
            </li>
            <li className="d-flex justify-content-center  position-relative complete">
              <span className="step-bar position-absolute"></span>
              <label className="d-flex flex-column align-items-center position-relative mb-0">
                <span className="step-cell d-flex flex-column align-items-center justify-content-center rounded-circle">
                  <span className="inline-block rounded-circle"></span>
                </span>
                <span className="step-label">Accepted</span>
              </label>
            </li>
            <li className="d-flex justify-content-center position-relative active-step">
              <span className="step-bar position-absolute"></span>
              <label className="d-flex flex-column align-items-center position-relative mb-0">
                <span className="step-cell d-flex flex-column align-items-center justify-content-center rounded-circle">
                  <span className="inline-block rounded-circle"></span>
                </span>
                <span className="step-label">In Progress</span>
              </label>
            </li>
            <li className="d-flex justify-content-center position-relative">
              <span className="step-bar position-absolute"></span>
              <label className="d-flex flex-column align-items-center position-relative mb-0">
                <span className="step-cell d-flex flex-column align-items-center justify-content-center rounded-circle">
                  <span className="inline-block rounded-circle"></span>
                </span>
                <span className="step-label">Completed</span>
              </label>
            </li>
          </ul>
        </div>
      </>
    );
  return null;
};

export default StatusBar;
