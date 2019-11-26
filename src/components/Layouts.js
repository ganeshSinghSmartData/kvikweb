/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
 */

import React from "react";
import Header from "./header/header";
// import Sidebar from './Sidebar';
// import Footer from "./Footer";

/*************** Public Layout ***************/
export const publicLayout = props => {
  window.scrollTo(0, 0);
  return (
    <div className="main">
      <Header />
      <div className="main-header-bg custom-main-header-bg">
        {props.children}
      </div>
      {/* <Footer /> */}
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
    case "/dashboard":
      _class = "black-bg";
      break;
    case "/forgot-password":
      _class = "main-header-bg";
      break;
    default:
  }
  return (
    <div className="main">
      {/* <DashboardHeader /> */}
      {props.children}
      {/* <Footer /> */}
    </div>
  );
};
