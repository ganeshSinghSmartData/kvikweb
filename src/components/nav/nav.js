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
          <Button color="link">Bids</Button>
        </li>
        <li>
          <Button color="link">Categories</Button>
        </li>
        <li>
          <Button color="link">Help</Button>
        </li>
        <li>
          {/* <Link className="text-black" to={"/register"}>
            <Button color="link">Create an Account</Button>
          </Link> */}
          <Link className="text-black" to={"/register"}>
            <Button color="link">Create an Account</Button>
          </Link>
        </li>
        <li>
          <Link className="text-black" to={"/login"}>
            <Button color="link">Login</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
