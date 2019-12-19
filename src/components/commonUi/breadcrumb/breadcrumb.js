import React from "react";
import { Link } from "react-router-dom";

import "./breadcrumb.scss";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={"/"}>
            Job
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={"/job-list"}>
            Job List
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Job Detail
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
