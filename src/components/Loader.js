/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========                Page loader           ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React from "react";
import { css } from "@emotion/core";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const ReactLoader = ({ loading }) => {
  return (
    loading && (
      <React.Fragment>
        <div className="dataLoader block position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span
              className="spinner-border text-primary"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

ReactLoader.propTypes = {
  loading: PropTypes.bool
};

ReactLoader.defaultProps = {
  loading: false
};

export default ReactLoader;
