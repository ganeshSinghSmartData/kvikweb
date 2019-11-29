import React from 'react';
import './banner.scss';
import SearchService from '../searchService/searchService';
const Banner = () => {
  return (
    <section className="banner d-flex flex-column flex-shrink-0">
      <SearchService />
      <h2 className="banner-title m-auto">Post a Job</h2>
    </section>
  );
};

export default Banner;