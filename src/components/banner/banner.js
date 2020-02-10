import React from "react";
import "./banner.scss";
import SearchService from "../searchService/searchService";
import HomeVideo from "../homeVideo/homeVideo";
const Banner = (path) => {
  const location = path.path.props.location.pathname;
  // !bid && !proposal && !details &&

  return (
    <>
      {/* <div className="header-invisible"></div> */}
      <section className={`banner d-flex flex-column flex-shrink-0 ${location === "/" ? 'home-banner' : ''}`}>
        {
          location === "/" || location === "/login" ||  location === "/register" ?
            <HomeVideo />
            : null
        }
        {/* {location === "/" &&
        <SearchService posJobButton={true} />
      } */}
        {location === "/post-job" && (
          <h2 className="banner-title m-auto">Post a Job</h2>
        )}
      </section>
    </>
  );
};

export default Banner;
