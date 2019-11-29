import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";
const Nav = props => {
  const stopPropagationHandler = e => {
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    <nav
      className={"d-flex align-items-center " + props.className}
      onClick={stopPropagationHandler}
    >
      <ul className="d-flex align-items-center">
        <li>
          <Link className="btn btn-link" to={''}>
            Bids
          </Link>
        </li>
        <li>
          <Link className="btn btn-link" to={''}>
            Categories
        </Link>
        </li>
        <li>
          <Link className="btn btn-link" to={''}>
            Help
        </Link>
        </li>
        <li>
          <Link className="btn btn-link" to={"/register"}>
            Create an Account
          </Link>
        </li>
        <li>
          <Link className="login-btn btn btn-info" to={"/login"}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
