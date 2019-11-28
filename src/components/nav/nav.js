import React from "react";
import { Button } from "reactstrap";
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
          <Link className="btn btn-link">
            Bids
        </Link>
        </li>
        <li>
          <Link className="btn btn-link">
            Categories
        </Link>
        </li>
        <li>
          <Link className="btn btn-link">
            Help
        </Link>
        </li>
        <li>
          {/* <Link className="btn btn-link" to={"/register"}>
            <Button color="link">Create an Account</Button>
          </Link> */}
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
