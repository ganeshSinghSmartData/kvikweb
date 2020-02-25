import React from "react";
import "./banner.scss";
import HomeVideo from "../homeVideo/homeVideo";
import { getTranslations } from "../../utilities/translations";
const Banner = (props) => {
  const location = props.path.props.location.pathname;
  // !bid && !proposal && !details &&

  return (
    <>
      {/* <div className="header-invisible"></div> */}
      <section
        className={`banner d-flex flex-column flex-shrink-0 ${
          location === "/" ? "home-banner" : ""
        }`}
      >
        {location === "/" ||
        location === "/login" ||
        location === "/register" ? (
          <HomeVideo {...props} />
        ) : null}
        {/* {location === "/" &&
        <SearchService posJobButton={true} />
      } */}
        {location === "/post-job" && (
          <h2 className="banner-title m-auto">{getTranslations("post_job")}</h2>
        )}
      </section>
    </>
  );
};

export default Banner;
