import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Nav from '../nav/nav';
import UserProfile from './userProfile/userProfile';
import Logo from '../commonUi/logo/logo';
import './header.scss';
const Header = () => {
  const [navVisible, setnavVisible] = useState(false);
  const navToggle = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    setnavVisible(() => {
      setnavVisible(!navVisible);
    }
    )
  }
  useEffect(() => {
    document.addEventListener("click", bodyClickHandler);
    document.addEventListener("keydown", escFunction);
  })
  const bodyClickHandler = () => {
    setnavVisible(false);
  }
  const escFunction = (e) => {
    if (e.keyCode === 27) {
      setnavVisible(false);
    }
  }
  return (
    <header className="header d-flex flex-column flex-shrink-0">
      <Container className="d-flex flex-column h-100">
        <Row className="d-flex flex-column h-100">
          <Col className="d-flex align-items-center">
            <Button color="link" className="logo p-0 rounded-0">
              <Logo className="m-0" />
            </Button>
            <div className="d-flex align-items-center ml-auto">
              <Nav className={"d-sm-none d-md-block nav " + (navVisible ? 'active' : '')} />
              <UserProfile />
              <Button color="link" className={"nav-toggle-btn rounded-circle p-0 d-md-none position-relative flex-shrink-0 " + (navVisible ? 'active' : '')} onClick={navToggle}>
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