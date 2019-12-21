import React from "react";
import { Link } from "react-router-dom";

import "./logo.scss";

const Logo = props => {
  return (
    <label className={"logo " + props.className}>
      <img src={require("../../../assets/images/logo.svg")} alt="Logo" />
    </label>
  );
};

export default Logo;
