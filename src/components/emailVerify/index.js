import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./emailVerify.scss";
import { verifyEmail } from "../../actions/user";
import Logo from "../commonUi/logo/logo";

const EmailVerify = () => {
    const dispatch = useDispatch();
    const [verified, setVerified] = useState(true);

    const { location } = useSelector(state => state.router);
    let params = location.pathname.split("/");

    useEffect(() => {
        if (params && params.length) {
            dispatch(
                verifyEmail({ userId: params[2], otp: params[3] }, callback => {
                    if (callback) {
                        setVerified(callback);
                    } else {
                    }
                })
            );
        }
    }, []);

    return (
        <section className="verify-email-wrapper">
            <div className="email-header d-flex align-items-center">
                <div className="email-logo">
                    <Logo classname="m-0 email-template-logo" navigate={true} />
                </div>
                <div className="email-head-txt text-right flex-fill">
                    QvikTask Marketplace
        </div>
            </div>
            <div className="email-inner-blc d-flex align-items-center justify-content-center text-center">
                <div>
                    <div className="success-icon-row">
                        <svg
                            id="_002-check"
                            data-name="002-check"
                            xmlns="http://www.w3.org/2000/svg"
                            width="415.869"
                            height="415.869"
                            viewBox="0 0 415.869 415.869"
                        >
                            <path
                                id="Path_1"
                                data-name="Path 1"
                                d="M193.306,282.645h0a14.972,14.972,0,0,1-11.494-5.224l-78.89-85.682a15.534,15.534,0,0,1,22.988-20.9l67.918,73.665L381.91,56.947c6.269-6.269,16.2-6.269,21.943,0,6.269,6.269,6.269,16.2,0,21.943L204.278,277.943A14.229,14.229,0,0,1,193.306,282.645Z"
                                fill="#4dcfe0"
                            />
                            <path
                                id="Path_2"
                                data-name="Path 2"
                                d="M207.935,415.869C93.518,415.869,0,322.351,0,207.935S93.518,0,207.935,0a15.393,15.393,0,0,1,15.673,15.673,15.394,15.394,0,0,1-15.673,15.673c-97.176,0-176.588,79.412-176.588,176.588s79.412,176.588,176.588,176.588S384.523,305.11,384.523,207.934a15.673,15.673,0,1,1,31.346,0C415.869,322.351,322.351,415.869,207.935,415.869Z"
                                fill="#1185e0"
                            />
                        </svg>
                    </div>
                    {verified && (
                        <p>
                            Your Email Has been{" "}
                            <strong>Successfully!!</strong> Verified.
                            </p>
                    )}
                    {!verified && <p>Already Verified.</p>}
                    <Link className="btn btn-secondary" to={"/login"}>
                        Please visit Login Page
                          </Link>
                </div>
            </div>
            <div className="email-footer d-flex flex-wrap align-items-center p-3">
                <div className="email-footer-col text-center flex-fill social-icon">
                    <a href="www.test.com">
                        www.example.com
          </a>
                </div>
                <div className="email-footer-col text-center flex-fill social-icon">
                    <a href="mailto:support@example.com">
                        Email:support@example.com
          </a>
                </div>
                <div className="email-footer-col flex-wrap  text-center d-flex justify-content-center flex-fill email-social-icon">
                    <a href="www.test.com">
                        <img
                            className="rounded-circle"
                            src={require("../../assets/images/email-template/twitter.svg")}
                            alt=""
                            width="25"
                            height="25"
                        />
                    </a>
                    <a href="www.test.com">
                        <img
                            className="rounded-circle"
                            src={require("../../assets/images/email-template/facebook.svg")}
                            alt=""
                            width="25"
                            height="25"
                        />
                    </a>
                    <a href="#">
                        <img
                            className="rounded-circle"
                            src={require("../../assets/images/email-template/youtube.svg")}
                            alt=""
                            width="25"
                            height="25"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default EmailVerify;
