import React from "react";
import { Button } from "reactstrap";
import "./emailVerify.scss";
const EmailVerify = () => {
  return (
    <section className="verify-email-wrapper">
      <table>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr className="head-row">
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="78.708" height="29.16"
                        viewBox="0 0 78.708 29.16">
                        <path id="Path_899" data-name="Path 899"
                          d="M9.873,0V-28.471h-6.8V0ZM19.7-28.471,10.424-16.577,22.5,0h8.036L17.725-16.485l10.24-11.985ZM36.645.276H37.93L48.125-19.241H41.65L37.287-9.092,32.879-19.241H26.45ZM56.85-25.394c0-1.745-1.469-2.755-3.352-2.755s-3.352,1.01-3.352,2.755,1.469,2.8,3.352,2.8S56.85-23.649,56.85-25.394ZM50.558,0h5.924V-19.241H50.558ZM67.274,0V-28.884L61.4-27.69V0Zm.367-11.113L74.713,0h7.072L73.978-11.113,79.9-19.241H72.968Z"
                          transform="translate(-3.077 28.884)" fill="#fff" />
                      </svg>
                    </td>
                    <td className="tag-line">
                      kviktask Market place
                </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr className="mid-row text-center">
                    <td>
                      <div className="mid-row-data d-flex align-items-center justify-content-center">
                        <div>
                          <div className="success-icon-row">
                            <svg id="_002-check" data-name="002-check" xmlns="http://www.w3.org/2000/svg" width="415.869" height="415.869" viewBox="0 0 415.869 415.869">
                              <path id="Path_1" data-name="Path 1" d="M193.306,282.645h0a14.972,14.972,0,0,1-11.494-5.224l-78.89-85.682a15.534,15.534,0,0,1,22.988-20.9l67.918,73.665L381.91,56.947c6.269-6.269,16.2-6.269,21.943,0,6.269,6.269,6.269,16.2,0,21.943L204.278,277.943A14.229,14.229,0,0,1,193.306,282.645Z" fill="#4dcfe0" />
                              <path id="Path_2" data-name="Path 2" d="M207.935,415.869C93.518,415.869,0,322.351,0,207.935S93.518,0,207.935,0a15.393,15.393,0,0,1,15.673,15.673,15.394,15.394,0,0,1-15.673,15.673c-97.176,0-176.588,79.412-176.588,176.588s79.412,176.588,176.588,176.588S384.523,305.11,384.523,207.934a15.673,15.673,0,1,1,31.346,0C415.869,322.351,322.351,415.869,207.935,415.869Z" fill="#1185e0" />
                            </svg>

                          </div>
                          <p>
                            Your Email Has been <strong>Successfully!!</strong> Verified.
                          </p>
                          <Button>
                            Please visit Login Page
                        </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr className="bottom-row">
                    <td>
                      <a href="#">
                        <span>
                          www.example.com
                        </span>
                      </a>
                    </td>
                    <td>
                      Email:
                          <a href="#">
                        <span>
                          support@example.com
                        </span>
                      </a>
                    </td>
                    <td>
                      <table>
                        <tr className="social-row">
                          <td>
                            <a href="#">
                              <img className="rounded-circle" src={require('../../assets/images/email-template/twitter.svg')} alt="" width="25" height="25" />
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <img className="rounded-circle" src={require('../../assets/images/email-template/facebook.svg')} alt="" width="25" height="25" />
                            </a>
                          </td>
                          <td>
                            <a href="#">
                              <img className="rounded-circle" src={require('../../assets/images/email-template/youtube.svg')} alt="" width="25" height="25" />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default EmailVerify;
