/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
 */

import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sidebarToggleHandler } from "./../actions/job";
import smoothscroll from "smoothscroll-polyfill";
import { Container } from "reactstrap";
import Header from "./header/header";
import Banner from "./banner/banner";
import Footer from "./footer/footer";

smoothscroll.polyfill();
/*************** Public Layout ***************/
export const PublicLayout = (props) => {
  const sidebarToggleValue = useSelector((state) => state.job.sidebarToggle);
  const lang = useSelector((state) => state.user.lang);
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  const wrapperRef = useRef(null);
  const [scrollVisible, setscrollVisible] = useState(false);
  const [headerFixed, setheaderFixed] = useState(false);

  const scrollCheck = () => {
    let scrollTopCheck = wrapperRef.current.scrollTop;
    //Header Fixed Function start
    if (scrollTopCheck > 60) {
      !headerFixed && setheaderFixed(true);
    } else {
      headerFixed && setheaderFixed(false);
    }
    //Scroll to top Function start

    if (scrollTopCheck > 300) {
      !scrollVisible && setscrollVisible(true);
    } else if (scrollTopCheck < 100) {
      scrollVisible && setscrollVisible(false);
    }
    let home = document.getElementById("home");
    if (home && home.getBoundingClientRect().top <= 0) {
      return !sidebarToggleValue && dispatch(sidebarToggleHandler(true));
    } else {
      document.querySelector("#blank-div") &&
        document
          .querySelector("#blank-div")
          .setAttribute("style", "display:none");
      return sidebarToggleValue && dispatch(sidebarToggleHandler(false));
    }
  };
  const scrollTopFunction = () => {
    window.scrollTo(0, 0);
    wrapperRef.current.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  let custom_class = "";
  let routeCheck = props.children.props.match.path;
  routeCheck = routeCheck.split("/");
  if (routeCheck[1] === "verify-email") {
    custom_class = "verify-email-container";
  }
  return (
    <>
      <div
        className={`main-wrapper d-flex flex-column flex-fill ${custom_class}`}
        onLoadStart={() => dispatch(sidebarToggleHandler(false))}
      >
        <div
          id="main_container"
          className={`wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto ${
            props.children.props.match.path !== "/" && !sidebarToggleValue
              ? "active"
              : ""
          } ${
            props.children.props.match.path === "/job-details/:job_id" ||
            props.children.props.match.path === "/bid-details/:job_id"
              ? "jobDetailLayout"
              : ""
          } ${props.children.props.match.path === "/" ? "homeLayout" : ""}
          `}
          ref={wrapperRef}
          onScroll={scrollCheck}
        >
          {!custom_class ? (
            <Header {...props} headerFixed={headerFixed} />
          ) : null}
          {(props.children.props.match.path === "/" ||
            props.children.props.match.path === "/post-job") && (
            <Banner path={props.children} />
          )}
          <Container
            className={`d-flex flex-column flex-shrink-0 mb-50 position-relative pt-20 inner-section-wrapper
          ${custom_class}`}
          >
            {props.children}
            <button
              type="button"
              className={`btn scroll-tp-btn rounded-circle position-fixed ${
                scrollVisible ? "on" : ""
              }`}
              onClick={scrollTopFunction}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31.49"
                height="22.142"
                viewBox="0 0 31.49 22.142"
              >
                <path
                  id="arrow-up"
                  d="M21.2,5.007a1.117,1.117,0,0,0-1.587,1.571l8.047,8.047H1.111A1.106,1.106,0,0,0,0,15.737a1.118,1.118,0,0,0,1.111,1.127H27.665L19.618,24.9a1.139,1.139,0,0,0,0,1.587,1.112,1.112,0,0,0,1.587,0l9.952-9.952a1.093,1.093,0,0,0,0-1.571Z"
                  transform="translate(0 -4.674)"
                  fill="#1e201d"
                />
              </svg>
            </button>
          </Container>
          {!custom_class ? <Footer /> : null}
        </div>
      </div>
    </>
  );
};

/*************** Private Layout ***************/
export const privateLayout = (props) => {
  window.scrollTo(0, 0);

  const path = props.children.props.history.location.pathname;
  let _class = "";
  switch (path) {
    case "/":
      _class = "black-bg";
      break;
    case "/forgot-password":
      _class = "main-header-bg";
      break;
    default:
  }
  return (
    <div className="main-wrapper d-flex flex-column flex-fill">
      {/* <DashboardHeader /> */}
      {props.children}
      {/* <Footer /> */}
    </div>
  );
};

/*************** Private Layout ***************/
export const commonLayout = (props) => {
  let custom_class = "";
  if (props.children.props.match.path === "/verify-email") {
    custom_class = "verify-email-container";
  }
  return (
    <div className={`main-wrapper d-flex flex-column flex-fill`}>
      <div
        className={`wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto`}
      >
        <Container
          className={`d-flex flex-column flex-shrink-0 mb-50 position-relative ${custom_class}`}
        ></Container>
      </div>
    </div>
  );
};
