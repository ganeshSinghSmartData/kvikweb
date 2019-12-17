import React from "react";
import "./breadcrumb.scss";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Job</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Job List</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Job Detail
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
