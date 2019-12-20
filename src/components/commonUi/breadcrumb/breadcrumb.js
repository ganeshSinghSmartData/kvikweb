import React from "react";
import { Link } from "react-router-dom";

import "./breadcrumb.scss";
const Breadcrumb = ({ path }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={"/"}>Home</Link>
        </li>
        {path === "/job-proposal" && (
          <li className="breadcrumb-item">
            <Link to={"/job-list"}>Job List</Link>
          </li>
        )}
        {path === "/bid-details" && (
          <li className="breadcrumb-item">
            <Link to={"/bid-list"}>Bid List</Link>
          </li>
        )}
        {(path === "/job-proposal" || path === "/job-details") && (
          <li className="breadcrumb-item active" aria-current="page">
            Job Detail
          </li>
        )}
        {path === "/bid-details" && (
          <li className="breadcrumb-item active" aria-current="page">
            Bid Detail
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
