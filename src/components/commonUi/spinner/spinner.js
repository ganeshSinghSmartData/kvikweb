import React from "react";
import "./spinner.scss";
const Spinner = () => {
  return (
    <div className="spinner-blc">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
