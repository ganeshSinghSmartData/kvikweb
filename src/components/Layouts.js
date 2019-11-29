/*
 * @file: Layouts.js
 * @description: Defined all Layouts for application
 * @author: smartData
 */

import React from "react";
import { Container } from "reactstrap";
import Header from "./header/header";
import Banner from "./banner/banner";
import Footer from "./footer/footer";

/*************** Public Layout ***************/
export const publicLayout = props => {
  window.scrollTo(0, 0);
  return (
    <div className="main-wrapper d-flex flex-column flex-fill">
      <Header />
      <Banner />
      <div className="wrapper-inner d-flex flex-column flex-fill position-relative overflow-auto">
        <Container className="d-flex flex-column flex-shrink-0">
          {props.children}
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
