import React from "react";
import "./homeVideo.scss";
const HomeVideo = (path) => {
  return (
    <section className="home-video text-center text-white">
      <div className="container">
        <div className="home-video-blc d-flex justify-items-center align-items-center">
          <div>
            <h1>
              How it <span>works?</span>
            </h1>
            <p className="text-white">
              Our objective is to provide a platform where service providers and
              service seeker can come interact and exchange services on the
              bases of requirements.
            </p>
            <div className="home-video-inner d-flex justify-items-center align-items-center position-relative">
              <span className="video-play-btn video-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="86.983" height="86.983" viewBox="0 0 86.983 86.983">
                  <g id="Group_8134" data-name="Group 8134" transform="translate(0 0)">
                    <g id="Group_8130" data-name="Group 8130" transform="translate(30.06 19.81)">
                      <path id="Path_1" data-name="Path 1" d="M848.71,457.86l41.019,23.681L848.71,505.222Z" transform="translate(-848.71 -457.86)" fill="#fff" />
                    </g>
                    <g id="Group_8131" data-name="Group 8131">
                      <path id="Path_15" data-name="Path 15" d="M798.472,483.073a43.491,43.491,0,1,1,43.491-43.491A43.541,43.541,0,0,1,798.472,483.073Zm0-83.772a40.284,40.284,0,1,0,40.284,40.284A40.331,40.331,0,0,0,798.472,399.3Z" transform="translate(-754.98 -396.09)" fill="#fff" />
                    </g>
                  </g>
                </svg>
              </span>
              <span className="video-pause-btn video-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="595.912" height="595.911" viewBox="0 0 595.912 595.911">
                  <g id="Group_8266" data-name="Group 8266" transform="translate(2013 -3485)">
                    <g id="Group_8134" data-name="Group 8134" transform="translate(-2013.001 3484.999)">
                      <g id="Group_8131" data-name="Group 8131" transform="translate(0.001 0.001)">
                        <path id="Path_15" data-name="Path 15" d="M1052.937,992C888.38,992,754.981,858.6,754.981,694.047s133.4-297.956,297.956-297.956,297.956,133.4,297.956,297.956C1350.7,858.525,1217.414,991.813,1052.937,992Zm0-573.92c-152.422,0-275.985,123.563-275.985,275.985s123.563,275.985,275.985,275.985,275.984-123.562,275.984-275.985c-.173-152.351-123.633-275.814-275.984-275.991Z" transform="translate(-754.981 -396.091)" fill="#fff"/>
                      </g>
                    </g>
                    <g id="Group_8265" data-name="Group 8265" transform="translate(-27 28.969)">
                      <g id="Rectangle_3028" data-name="Rectangle 3028" transform="translate(-1737 3668.031)" fill="#fff" stroke="#707070" stroke-width="1">
                        <rect width="21" height="172" rx="10.5" stroke="none"/>
                        <rect x="0.5" y="0.5" width="20" height="171" rx="10" fill="none"/>
                      </g>
                      <g id="Rectangle_3029" data-name="Rectangle 3029" transform="translate(-1661 3668.031)" fill="#fff" stroke="#707070" stroke-width="1">
                        <rect width="21" height="172" rx="10.5" stroke="none"/>
                        <rect x="0.5" y="0.5" width="20" height="171" rx="10" fill="none"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <video width="400" controls>
                <source
                  src={require("../../../src/assets/sample.mp4")}
                  type="video/mp4"
                />
                {/* <source src={require('mov_bbb.ogg')} type="video/ogg" /> */}
                Your browser does not support HTML5 video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;
