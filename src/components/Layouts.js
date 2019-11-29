/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
 */

import React, { useState, useRef } from 'react';
import { Container } from "reactstrap";
import Header from "./header/header";
import Banner from "./banner/banner";
import Footer from "./footer/footer";

/*************** Public Layout ***************/
export const publicLayout = props => {
  window.scrollTo(0, 0);
  // const wrapperRef = useRef(null);
  // const [scrollVisible, setscrollVisible] = useState(false);
  // const scrollCheck = () => {
  //   let scrollTopCheck = wrapperRef.current.scrollTop;
  //   if (scrollTopCheck > 300) {
  //     setscrollVisible(true);
  //   } else {
  //     setscrollVisible(false);
  //   }
  // }
  // const scrollTopFunction = () => {
  //   wrapperRef.current.scroll({ top: 0, left: 0, behavior: 'smooth' });
  // }
  return (
    <div className="main-wrapper d-flex flex-column flex-fill">
      <Header />
      <Banner />
      <div className="wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto">
        <Container className="d-flex flex-column flex-shrink-0 mb-50">
          {props.children}
          {/* <button type="button"
            className={"btn btn-light scroll-tp-btn rounded-circle position-absolute " + (scrollVisible ? 'on' : '')}
            onClick={scrollTopFunction}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31.49" height="22.142" viewBox="0 0 31.49 22.142">
              <path id="arrow-up" d="M21.2,5.007a1.117,1.117,0,0,0-1.587,1.571l8.047,8.047H1.111A1.106,1.106,0,0,0,0,15.737a1.118,1.118,0,0,0,1.111,1.127H27.665L19.618,24.9a1.139,1.139,0,0,0,0,1.587,1.112,1.112,0,0,0,1.587,0l9.952-9.952a1.093,1.093,0,0,0,0-1.571Z" transform="translate(0 -4.674)" fill="#1e201d" />
            </svg>
          </button> */}
        </Container>
        <Footer />
      </div>
    </div>
  );
};

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
