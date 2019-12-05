import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./../../actions/user";
import "./nav.scss";

const Nav = props => {
  const stopPropagationHandler = e => {
    e.nativeEvent.stopImmediatePropagation();
  };
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <nav
      className={"d-flex align-items-center " + props.className}
      onClick={stopPropagationHandler}
    >
      <ul className="d-flex align-items-center">
        <li>
          <Link className="btn btn-link" to={""}>
            Bids
          </Link>
        </li>
        <li>
          <Link className="btn btn-link" to={""}>
            Categories
          </Link>
        </li>
        <li>
          <Link className="btn btn-link" to={""}>
            Help
          </Link>
        </li>
        {!user.loggedIn && (
          <li>
            <Link className="btn btn-link" to={"/register"}>
              Create an Account
            </Link>
          </li>
        )}
        <li>
          {user.loggedIn ? (
            <Link
              className="login-btn btn btn-info"
              to={""}
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          ) : (
            <Link className="login-btn btn btn-info" to={"/login"}>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
