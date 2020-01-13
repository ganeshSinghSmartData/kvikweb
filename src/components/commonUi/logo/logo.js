import React from "react";
import { Link, Button } from "react-router-dom";

import "./logo.scss";

const Logo = ({ classname = "", navigate = false }) => {
  return (
    <>
      {navigate ? (
        <Link className={`btn btn-link p-0 logo rounded-0 flex-shrink-0 ${classname}`} to={"/"}>
          <label className='mb-0'>
            <img src={require("../../../assets/images/logo.svg")} alt="Logo" />
          </label>
        </Link>
      ) : (
          <label className={`logo ${classname}`}>
            <img src={require("../../../assets/images/logo.svg")} alt="Logo" />
          </label>
        )}
    </>
  );
};

export default Logo;
