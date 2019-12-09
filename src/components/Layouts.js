/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
 */

import React, { useState, useRef } from "react";
import { Container, Button } from "reactstrap";
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
      <Banner path={props.children} />
      <div className="wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto">
        <Container className="d-flex flex-column flex-shrink-0 mb-50 position-relative">
          {props.children}
          <button type="button"
            className={"btn scroll-tp-btn rounded-circle position-absolute"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="31.49" height="22.142" viewBox="0 0 31.49 22.142">
              <path id="arrow-up" d="M21.2,5.007a1.117,1.117,0,0,0-1.587,1.571l8.047,8.047H1.111A1.106,1.106,0,0,0,0,15.737a1.118,1.118,0,0,0,1.111,1.127H27.665L19.618,24.9a1.139,1.139,0,0,0,0,1.587,1.112,1.112,0,0,0,1.587,0l9.952-9.952a1.093,1.093,0,0,0,0-1.571Z" transform="translate(0 -4.674)" fill="#1e201d" />
            </svg>
          </button>
          <Button className="sidebar-toogle-btn text-right position-fixed rounded-left d-md-none flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="11.667"
              viewBox="0 0 21 11.667"
            >
              <path
                id="Path_804"
                data-name="Path 804"
                d="M3,14H5.333V11.667H3Zm0,4.667H5.333V16.333H3ZM3,9.333H5.333V7H3ZM7.667,14H24V11.667H7.667Zm0,4.667H24V16.333H7.667ZM7.667,7V9.333H24V7Z"
                transform="translate(-3 -7)"
                fill="#b3b3b3"
              />
            </svg>
          </Button>
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
