import React from "react";
import "./spinner.scss";
import { getTranslations } from "../../../utilities/translations";
const Spinner = ({ className = "", onClickEvent = () => {} }) => {
  return (
    <div
      onClick={onClickEvent}
      className={`spinner-blc position-absolute w-100 h-100 d-flex justify-content-center align-items-center ${className}`}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">{getTranslations("loading")}</span>
      </div>
    </div>
  );
};

export default Spinner;
