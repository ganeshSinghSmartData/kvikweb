import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import {
  getTranslations,
  changeLanguage,
  getCurrentLanguage,
  getAvailableTranslations
} from "../../utilities/translations";
// import { logout } from "./../../actions/user";
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
      document.querySelector("#home").scrollIntoView({
        block: "start",
        inline: "nearest"
      });
    }
  };

  const changeLang = useCallback((lang) => {
    changeLanguage(lang);
  }, []);
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
                {getTranslations("post_job")}
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
              {getTranslations("browse_task")}
            </Link>
          </li>
          {!loggedInUser ? (
            <li>
              <Link
                className="btn btn-link"
                to={"/about-us"}
                onClick={navVisibleHander}
              >
                {getTranslations("about")} Qviktask
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
                  {getTranslations("bids")}
                </Link>
              </li>
              <li>
                <Link
                  className="btn btn-link"
                  to={"/job-list"}
                  onClick={navVisibleHander}
                >
                  {getTranslations("jobs")}
                </Link>
              </li>
            </>
          )}

          {!user.loggedIn && (
            <li>
              <Link
                className="btn btn-link"
                to={"/register"}
                onClick={navVisibleHander}
              >
                {getTranslations("create_account")}
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
                {getTranslations("login")}
              </Link>
            )}
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                as="button"
                id="languageDropdown"
                className="btn btn-light"
              >
                {getCurrentLanguage() && getCurrentLanguage().toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {getAvailableTranslations() &&
                  getAvailableTranslations().map((i) => (
                    <Dropdown.Item
                      key={i}
                      as="button"
                      onClick={() => changeLang(i)}
                    >
                      {i.toUpperCase()}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      }
    </nav>
  );
};

export default Nav;
