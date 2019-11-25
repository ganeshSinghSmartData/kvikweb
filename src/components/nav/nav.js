import React from 'react';
import { Button } from 'reactstrap';
import './nav.scss';
const Nav = (props) => {
  const stopPropagationHandler = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  }
  return (
    <nav className={"d-flex align-items-center " + (props.className)} onClick={stopPropagationHandler}>
      <ul className="d-flex align-items-center">
        <li>
          <Button color="link">
            Bids
        </Button>
        </li>
        <li>
          <Button color="link">
            Categories
        </Button>
        </li>
        <li>
          <Button color="link">
            Help
        </Button>
        </li>
        <li>
          <Button color="link">
            Create an Account
        </Button>
        </li>
        <li>
          <Button color="info" className="login-btn">
            Login
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;