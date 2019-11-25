import React from 'react';
import './banner.scss';
import SearchService from '../searchService/searchService';
const Banner = () => {
  return (
    <section className="banner d-flex flex-column flex-shrink-0">
        <SearchService/>
    </section >
  );
};

export default Banner;