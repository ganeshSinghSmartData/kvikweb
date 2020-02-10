import React, { useRef, useState } from "react";
import "./homeVideo.scss";
const HomeVideo = (path) => {
  const videoRef = useRef(null);
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
              <span
                className="video-play-btn"
                onClick={() => {
                  videoRef.current.paused
                    ? videoRef.current.play()
                    : videoRef.current.pause();
                }}
              >
                <img
                  src={require("../../assets/images/icons/play.svg")}
                  alt={
                    videoRef.current && videoRef.current.paused
                      ? "Play"
                      : "Pause"
                  }
                />
              </span>
              <video width="400" controls ref={videoRef} id="Video">
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
