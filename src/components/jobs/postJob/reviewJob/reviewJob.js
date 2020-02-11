import React, { useState } from "react";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "../postJob.scss";
import "./reviewJob.scss";

/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import JobDetail from "../../jobDetail/jobDetail";

const ReviewModal = (props) => {
  const { _jobDetails, closePrevieModal, submitJobData } = props;
  const [modal, setModal] = useState(true);
  const _isLoading = useSelector((state) => state.loader.isFetching);
  const toggle = () => {
    setModal(false);
    setTimeout(function() {
      closePrevieModal();
    }, 300);
  };

  const saveJobData = () => {
    setModal(false);
    setTimeout(function() {
      submitJobData();
    }, 300);
  };

  return (
    <>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-lg job-review-modal d-flex flex-column align-items-center justify-content-center"
      >
        <ModalHeader>
          <span>View Job Details</span>
          <Button
            color="secondary"
            className="job-post-btn ml-auto"
            onClick={saveJobData}
          >
            Post Now
          </Button>
        </ModalHeader>
        {/* //CHANGES */}
        <ModalBody className="overflow-auto">
          <JobDetail
            history={props.history}
            job={_jobDetails}
            path=""
            _isLoading={_isLoading}
            _isStatusLoading={false}
            hideHeader={true}
            reviewModal
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ReviewModal;
