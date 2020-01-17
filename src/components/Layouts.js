/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
 */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {
//   sidebarToggleHandler
// } from "./../actions/job";
import smoothscroll from "smoothscroll-polyfill";
import { Container, Button } from "reactstrap";
import * as Scroll from "react-scroll";
import Header from "./header/header";
import Banner from "./banner/banner";
import Footer from "./footer/footer";

smoothscroll.polyfill();
/*************** Public Layout ***************/
export const PublicLayout = props => {
  const sidebarToggleValue = useSelector(state => state.job.sidebarToggle);
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  const wrapperRef = useRef(null);
  const [scrollVisible, setscrollVisible] = useState(false);
  const scrollCheck = () => {
    let scrollTopCheck = wrapperRef.current.scrollTop;
    if (scrollTopCheck > 300) {
      console.log('> 300')
      setscrollVisible(true);
    } else {
      console.log('< 300')
      setscrollVisible(false);
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
      <div className={`main-wrapper d-flex flex-column flex-fill ${custom_class}`}>
        {!custom_class ?
          <Header {...props} />
          : null}
        <div
          className={`wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto ${!sidebarToggleValue ? 'active' : ''}`}
          ref={wrapperRef}
          onScroll={scrollCheck}
        >
          {(props.children.props.match.path === "/" ||
            props.children.props.match.path === "/post-job") && (
              <Banner path={props.children} />
            )}
          <Container className={`d-flex flex-column flex-shrink-0 mb-50 position-relative pt-30 ${custom_class}`}>
            {props.children}
            <button
              type="button"
              className={
                "btn scroll-tp-btn rounded-circle position-fixed " +
                (scrollVisible ? "on" : "")
              }
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
            {/* {(props.children.props.match.path === "/" &&
              <Button color="link" className="border-0 d-flex align-items-center sidebar-toogle-btn text-right position-fixed rounded-left d-md-none flex-shrink-0"
                onClick={(e) => {
                  dispatch(sidebarToggleHandler(!sidebarToggleValue),
                    e.nativeEvent.stopImmediatePropagation()
                  )
                }}>
                <span className="btn btn btn-secondary d-inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="257.569" height="451.847" viewBox="0 0 257.569 451.847">
                    <g id="arrow-point-to-right" transform="translate(-97.139 0)">
                      <path id="Path_1" data-name="Path 1" d="M345.441,248.292,151.154,442.573a31.641,31.641,0,0,1-44.75-44.744L278.318,225.92,106.409,54.017a31.642,31.642,0,0,1,44.75-44.748L345.446,203.553a31.638,31.638,0,0,1,0,44.739Z" />
                    </g>
                  </svg>
                </span>

              </Button>
            )} */}
          </Container>
          {!custom_class ?
            <Footer />
            : null}
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = state => {
//   console.log('state-------------', state);

//   return ({
//     sidebarToggle: state.job.sidebarToggle
//   })
// };
// const mapDispatchToProps = dispatch => ({
//   sidebarToggleHandler: bindActionCreators(sidebarToggle, dispatch)
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PublicLayout);
/*************** Private Layout ***************/
export const privateLayout = props => {
  window.scrollTo(0, 0);
  // const childrenWithProps = React.Children.map(props.children, child =>
  //   React.cloneElement(child, { value })
  // );

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
export const commonLayout = props => {
  let custom_class = "";
  if (props.children.props.match.path === "/verify-email") {
    custom_class = "verify-email-container";
  }
  return (
    <div
      className={`main-wrapper d-flex flex-column flex-fill`}
    >
      <div
        className={`wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto`}
      >
        <Container className={`d-flex flex-column flex-shrink-0 mb-50 position-relative ${custom_class}`}>

        </Container>
      </div>
    </div>
  );
};
