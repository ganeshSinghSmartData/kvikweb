import React from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import InputCell from '../../commonUi/input/inputCell';
import './postJob.scss';
const PostJob = (props) => {
  return (
    <div className="post-wrapper data-block ml-auto mr-auto">
      <div className="post-job-nav d-flex justify-content-center">
        <ul className="d-flex">
          <li className="complete">
            <Button color="link">
              <span>1</span>
            </Button>
          </li>
          <li className="active">
            <Button color="link">
              <span>2</span>
            </Button>
          </li>
          <li>
            <Button color="link">
              <span>3</span>
            </Button>
          </li>
        </ul>
      </div>
      <div className="post-job-inner">
        <div className="post-job-gallery d-flex">
          <ul className="d-flex flex-wrap ml-auto mr-auto">
            <li>
              <img src={require("../../../assets/images/job-gallery/1.jpg")} alt="Job Pic" />
            </li>
            <li>
              <img src={require("../../../assets/images/job-gallery/1.jpg")} alt="Job Pic" />
            </li>
            <li>
              <img src={require("../../../assets/images/job-gallery/1.jpg")} alt="Job Pic" />
            </li>
            <li>
              <img src={require("../../../assets/images/job-gallery/1.jpg")} alt="Job Pic" />
            </li>
            <li>
              <img src={require("../../../assets/images/job-gallery/1.jpg")} alt="Job Pic" />
            </li>
            <li>
              <img src={require("../../../assets/images/job-gallery/1.jpg")} alt="Job Pic" />
            </li>
            <li>
              <Button color="primary" block className="add-gallery-btn position-relative">
                <Input type="file" name="file" />
                <svg id="_x38__3_" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <g id="Group_512" data-name="Group 512">
                    <path id="Path_902" data-name="Path 902" d="M24,0A24,24,0,1,0,48,24,24,24,0,0,0,24,0Zm0,45A21,21,0,1,1,45,24,21,21,0,0,1,24,45Zm9-22.5H25.5V15a1.5,1.5,0,1,0-3,0v7.5H15a1.5,1.5,0,1,0,0,3h7.5V33a1.5,1.5,0,0,0,3,0V25.5H33a1.5,1.5,0,0,0,0-3Z" fill="#fff" />
                  </g>
                </svg>
              </Button>
            </li>
          </ul>
        </div>
        <form>
          <div className="row flex-wrap post-job-form">
            <div className="col-md-4">
              <InputCell inputTitle={true} />
            </div>
            <div className="col-md-4">
              <InputCell inputTitle={true} />
            </div>
            <div className="col-md-4">
              <InputCell inputTitle={true} />
            </div>
            <div className="col-md-6">
              <InputCell inputTitle={true} />
            </div>
            <div className="col-md-6">
              <FormGroup>
                <label className="input-title">
                  About the job
              </label>
                <Input type="textarea" name="text" />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <InputCell inputTitle={true} />
            </div>
            <div className="col-md-6">
              <InputCell inputTitle={true} inputIconRt={true} />
            </div>
            <div className="col-md-6">
              <FormGroup>
                <label className="input-title">
                  About the job
              </label>
                <Input type="select" name="select" id="exampleSelect" className="custom-select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </div>
          </div>
          <div className="post-job-btns text-center">
            <Button color="link" className="btn-dark">CANCEL</Button>
            <Button color="secondary">NEXT</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;