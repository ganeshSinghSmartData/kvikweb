import React from "react";
import "./banner.scss";
import SearchService from "../searchService/searchService";
const Banner = path => {
  const location = path.path.props.location.pathname;
  const proposal = location.includes("/job-proposal");
  const details = location.includes("/job-details");
  const bid = location.includes("/bid-details");
  // !bid && !proposal && !details &&

  return (
    <section className="banner d-flex flex-column flex-shrink-0">
      {location === "/" && <SearchService />}
      {location === "/post-job" && (
        <h2 className="banner-title m-auto">Post a Job</h2>
      )}
    </section>
  );
};

export default Banner;
