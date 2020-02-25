import React from "react";
import { Link } from "react-router-dom";
import { getTranslations } from "../../../utilities/translations";
import "./breadcrumb.scss";
const Breadcrumb = ({ path }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={"/"}>{getTranslations("home")}</Link>
        </li>
        {path === "/job-proposal" && (
          <li className="breadcrumb-item">
            <Link to={"/job-list"}>{getTranslations("job_list")}</Link>
          </li>
        )}
        {path === "/bid-details" && (
          <li className="breadcrumb-item">
            <Link to={"/bid-list"}>{getTranslations("bid_list")}</Link>
          </li>
        )}
        {(path === "/job-proposal" || path === "/job-details") && (
          <li className="breadcrumb-item active" aria-current="page">
            {getTranslations("job_details")}
          </li>
        )}
        {path === "/bid-details" && (
          <li className="breadcrumb-item active" aria-current="page">
            {getTranslations("bid_details")}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
