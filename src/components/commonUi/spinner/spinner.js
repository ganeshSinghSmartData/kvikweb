import React from "react";
import "./spinner.scss";
const Spinner = ({ className = "" }) => {
  return (
    <div className={`spinner-blc position-absolute position-fixed w-100 h-100 d-flex justify-content-center align-items-center ${className}`}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
