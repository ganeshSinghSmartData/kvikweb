import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

import "./userImage.scss";
import { DummyUserImage } from "../../../../utilities/constants";
import { apiUrl } from "./../../../../environment";

const UserImage = ({
  image,
  handleImageUpload,
  imegeUploading,
  edit = false,
  path
}) => {
  let imagepath = DummyUserImage;
  if (image && image.length !== 0) {
    imagepath = `${apiUrl}/${image[0].path}`;
  }

  return (
    <div
      className={`job-user rounded-circle border-secondary-200 d-flex align-items-center justify-content-center flex-shrink-0 position-relative ${
        path ? "hidden" : ""
      }`}
    >
      {edit && (
        <div className="update-cell position-absolute w-100 h-100">
          <span className="update-cell-inner position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
            {imegeUploading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            <span className="d-flex justify-content-center align-items-center udpate-image-btn position-absolute rounded-circle ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.446"
                height="19.435"
                viewBox="0 0 19.446 19.435"
              >
                <path
                  id="edit"
                  d="M18.987,1.513a4.29,4.29,0,0,0-6.07,0L1.788,12.633a.556.556,0,0,0-.157.319l-.825,6.1a.555.555,0,0,0,.157.468.566.566,0,0,0,.394.166.452.452,0,0,0,.075,0l3.679-.5a.56.56,0,1,0-.149-1.11l-2.95.4.576-4.258L7.071,18.7a.566.566,0,0,0,.394.166.549.549,0,0,0,.394-.166L18.987,7.58a4.283,4.283,0,0,0,0-6.067ZM13.132,2.88,15,4.748,4.846,14.9,2.977,13.031ZM7.468,17.516,5.641,15.69,15.8,5.539l1.827,1.826ZM18.4,6.566,13.932,2.1A3.175,3.175,0,0,1,18.4,6.566Z"
                  transform="translate(-0.8 -0.255)"
                  fill="#9d9d9d"
                />
              </svg>
            </span>
            <input
              className="position-absolute w-100 h-100"
              type="file"
              onChange={event => handleImageUpload(event.target.files)}
            />
          </span>
        </div>
      )}

      <Button color="link" className="p-0 rounded-circle" disabled>
        <img className="rounded-circle" src={imagepath} alt="Job Post User" />
      </Button>
    </div>
  );
};

export default UserImage;
