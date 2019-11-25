import React from 'react';
import './footer.scss';
import { Container, Row, Col, Button } from 'reactstrap';
const Footer = () => {
  return (
    <footer className="footer position-relative">
      <Container>
        <Row>
          <Col>
            <div className="social-icons d-flex justify-content-center position-relative">
              <button className=" shadow-none btn p-0 d-flex justify-content-center align-items-center fcbk">
                <span className="primary-bg d-flex align-items-center justify-content-center rounded-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="51.969" height="96.123" viewBox="0 0 51.969 96.123">
                    <g id="facebook-logo" transform="translate(-22.077)">
                      <path id="Path_1" data-name="Path 1" d="M72.089.02,59.624,0C45.62,0,36.57,9.285,36.57,23.656V34.563H24.037a1.96,1.96,0,0,0-1.96,1.961v15.8a1.96,1.96,0,0,0,1.96,1.96H36.57V94.163a1.959,1.959,0,0,0,1.96,1.96H54.882a1.96,1.96,0,0,0,1.96-1.96V54.287H71.5a1.959,1.959,0,0,0,1.96-1.96l.006-15.8A1.961,1.961,0,0,0,71.5,34.563H56.842V25.317c0-4.444,1.059-6.7,6.848-6.7l8.4,0a1.96,1.96,0,0,0,1.959-1.96V1.98A1.961,1.961,0,0,0,72.089.02Z" />
                    </g>
                  </svg>

                </span>
              </button>
              <button className=" shadow-none btn p-0 d-flex justify-content-center align-items-center">
                <span className="primary-bg d-flex align-items-center justify-content-center rounded-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="799.718" height="655" viewBox="0 0 799.718 655">
                    <path id="Shape_1" data-name="Shape 1" d="M781.862,76.592a303.062,303.062,0,0,1-38.679,14.1,171.054,171.054,0,0,0,34.811-61.24,12.9,12.9,0,0,0-18.865-15.03,304.321,304.321,0,0,1-89.976,35.57A172.491,172.491,0,0,0,548.987,1C454.324,1,377.309,78.042,377.309,172.739a175.366,175.366,0,0,0,1.406,22.189A439.472,439.472,0,0,1,77.047,34.826,12.9,12.9,0,0,0,55.9,36.482,172.045,172.045,0,0,0,73.51,234.16,145.412,145.412,0,0,1,50.533,223.9a12.9,12.9,0,0,0-19.16,10.987c-.018.761-.018,1.522-.018,2.294a172.361,172.361,0,0,0,84.039,147.691c-4.365-.435-8.727-1.068-13.061-1.9a12.9,12.9,0,0,0-14.7,16.612A171.643,171.643,0,0,0,213.391,514.7,303.626,303.626,0,0,1,51.043,561.048a310.44,310.44,0,0,1-36.361-2.132,12.9,12.9,0,0,0-8.477,23.676A462.842,462.842,0,0,0,256.56,656c174.786,0,284.128-82.453,345.074-151.624,76-86.25,119.585-200.413,119.585-313.213,0-4.713-.072-9.472-.217-14.215a333.811,333.811,0,0,0,76.807-81.385,12.9,12.9,0,0,0-15.948-18.971Z" transform="translate(-0.268 -1)" />
                  </svg>
                </span>
              </button>
              <button className=" shadow-none btn p-0 d-flex justify-content-center align-items-center">
                <span className="primary-bg d-flex align-items-center justify-content-center rounded-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="97.008" height="97.008" viewBox="0 0 97.008 97.008">
                    <path id="Forma_1" data-name="Forma 1" d="M12.447,0H84.553A12.156,12.156,0,0,1,97,12.446V84.553A12.156,12.156,0,0,1,84.553,97H12.447A12.156,12.156,0,0,1,0,84.553V12.446A12.156,12.156,0,0,1,12.447,0ZM70.662,10.774A4.379,4.379,0,0,0,66.3,15.141V25.594a4.379,4.379,0,0,0,4.366,4.368H81.626a4.38,4.38,0,0,0,4.366-4.368V15.141a4.379,4.379,0,0,0-4.366-4.367ZM86.039,41.019H77.5a28.389,28.389,0,0,1,1.245,8.322c0,16.136-13.5,29.215-30.154,29.215S18.44,65.478,18.44,49.342a28.334,28.334,0,0,1,1.245-8.322H10.775V82a3.868,3.868,0,0,0,3.857,3.857H82.185A3.867,3.867,0,0,0,86.041,82V41.019ZM48.59,29.411c-10.759,0-19.482,8.451-19.482,18.878S37.832,67.167,48.59,67.167s19.485-8.452,19.485-18.878S59.352,29.411,48.59,29.411Z" transform="translate(0.005 0.005)" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="footer-links text-center">
              <ul className="d-flex justify-content-center flex-wrap">
                <li className="d-flex align-items-center">
                  <Button color="link">
                    Help
                  </Button>
                </li>
                <li className="d-flex align-items-center">
                  <Button color="link">
                    FAQ
                  </Button>
                </li>
                <li className="d-flex align-items-center">
                  <Button color="link">
                    Support
                  </Button>
                </li>
                <li className="d-flex align-items-center">
                  <Button color="link">
                    Services
                  </Button>
                </li>
                <li className="d-flex align-items-center">
                  <Button color="link">
                    Contact
                  </Button>
                </li>
                <li className="d-flex align-items-center">
                  <Button color="link">
                    Terms &amp; Conditions
                  </Button>
                </li>
              </ul>
              <p className="p-0">
                Copyright 2019. All Rights Reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;