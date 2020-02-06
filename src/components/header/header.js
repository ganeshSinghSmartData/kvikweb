import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import Spinner from "../commonUi/spinner/spinner"
import Nav from "../nav/nav";
import UserProfile from "./userProfile/userProfile";
import Logo from "../commonUi/logo/logo";

import "./header.scss";
const Header = (props) => {
  const { user } = useSelector(state => state);

  let imagepath = "", metricsData;
  if (user.data && user.data.image && user.data.image.length) {
    imagepath = user.data.image;
  }
  if (user.data && user.userDetails) {
    metricsData = user.userDetails;
  }
  const [navVisible, setnavVisible] = useState(false);
  const navToggle = e => {
    e.nativeEvent.stopImmediatePropagation();
    setnavVisible(() => {
      setnavVisible(!navVisible);
    });
  };
  useEffect(() => {
    document.addEventListener("click", bodyClickHandler);
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("click", bodyClickHandler);
      document.removeEventListener("keydown", escFunction);
    };
  }, []);
  const bodyClickHandler = () => {
    setnavVisible(false);
  };
  const escFunction = e => {
    if (e.keyCode === 27) {
      setnavVisible(false);
    }
  };
  const navClickCallback = value => {
    setnavVisible(value);
  };
  const location = props.children.props.location.pathname

  console.log('props', props)
  return (
    <header className={`header d-flex flex-column flex-shrink-0 
    ${location === "/" ? 'header-home' : ''}
    ${props.headerFixed ? 'active' : ''}
    `

    }
      id={"header"}>
      <Container>
        <Row>
          <Col
            className={`d-flex flex-wrap header-inner align-items-center ${!user.loggedIn && "beforeLogin"}`}>

            <Logo navigate={true} />
            <div className="d-flex align-items-center ml-auto nav-wrapper">
              {navVisible ?
                <Spinner className="with-overlay no-spin-icon nav-overlay"
                  onClickEvent={() => setnavVisible(false)}
                />
                : null}
              <Nav
                {...props}
                navVisibleProp={navClickCallback}
                className={
                  "d-sm-none d-md-block nav " + (navVisible ? "active" : "")
                }
              />
              {user.loggedIn && <UserProfile image={imagepath} metricsData={metricsData} />}
              <Button
                color="link"
                className={
                  "nav-toggle-btn rounded-circle p-0 d-md-none position-relative flex-shrink-0 " +
                  (navVisible ? "active" : "")
                }
                onClick={navToggle}
              >
                <span></span>
                <span></span>
                <span></span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
