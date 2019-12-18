import React from "react";
import "./spinner.scss";
const Spinner = ({ className = "" }) => {
  return (
    <div className={`spinner-blc ${className}`}>
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
