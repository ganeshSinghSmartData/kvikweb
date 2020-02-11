import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { logout } from "./../../actions/user";
import "./nav.scss";

const Nav = (props) => {
  const loggedInUser = useSelector((state) => state.user.loggedIn);
  const stopPropagationHandler = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  };
  const { user } = useSelector((state) => state);

  const navVisibleHander = async () => {
    props.navVisibleProp(false);
    if (window.location.pathname === "/") {
      document.querySelector("#blank-div") &&
        document
          .querySelector("#blank-div")
          .setAttribute("style", "display:block");
      document
        .querySelector("#home")
        .scrollIntoView({ block: "start", inline: "nearest" });
      // let home = await document.getElementById("home");
      // home && home.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };
  return (
    <nav
      className={"d-flex align-items-center " + props.className}
      onClick={stopPropagationHandler}
    >
      {
        <ul className="d-flex align-items-center flex-wrap">
          <li>
            <Link
              className="text-black"
              to={loggedInUser ? "/post-job" : "/login"}
            >
              <Button
                className="post-job-btn btn-block"
                onClick={navVisibleHander}
              >
                Post a Job
              </Button>
            </Link>
          </li>
          <li>
            <Link
              className="btn btn-link"
              to={{
                pathname: "/",
                hash: window.location.pathname === "/" ? "#home" : ""
              }}
              onClick={navVisibleHander}
            >
              Browse Task
            </Link>
          </li>
          {!loggedInUser ? (
            <li>
              <Link
                className="btn btn-link"
                to={"/about-us"}
                onClick={navVisibleHander}
              >
                About Qviktask
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className="btn btn-link"
                  to={"/bid-list"}
                  onClick={navVisibleHander}
                >
                  Bids
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-link"
                  to={"/job-list"}
                  onClick={navVisibleHander}
                >
                  Jobs
                </Link>
              </li>
            </>
          )}
          {/* <li>
            <Link className="btn btn-link" to={"/contact-us"} onClick={navVisibleHander}>
              Contact Us
            </Link>
          </li> */}
          {!user.loggedIn && (
            <li>
              <Link
                className="btn btn-link"
                to={"/register"}
                onClick={navVisibleHander}
              >
                Create an Account
              </Link>
            </li>
          )}
          <li>
            {!user.loggedIn && (
              <Link
                className={`login-btn btn btn-info`}
                to={"/login"}
                onClick={navVisibleHander}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      }
    </nav>
  );
};

export default Nav;
