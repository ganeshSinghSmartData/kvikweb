import React from "react";
import { Link } from "react-router-dom";

import "./logo.scss";

const Logo = props => {
  return (
    <Link className="text-black" to={"/"}>
      <label className={"logo " + props.className}>
        <img src={require("../../../assets/images/logo.svg")} alt="Logo" />
      </label>
    </Link>
  );
};

export default Logo;
