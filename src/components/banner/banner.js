import React from "react";
import "./banner.scss";
import SearchService from "../searchService/searchService";
const Banner = path => {
  const location = path.path.props.location.pathname;
  const proposal = location.includes('job-proposal');
  const details = location.includes('job-details');

  return (
    <section className="banner d-flex flex-column flex-shrink-0">
      {!proposal && !details && (location !== "/post-job" ? (
        <SearchService />
      ) : (
          <h2 className="banner-title m-auto">Post a Job</h2>
        ))}
    </section>
  );
};

export default Banner;
