import React from 'react';
import { Button } from 'reactstrap';
import './userImage.scss';
const UserImage = (props) => {
  return (
    <div className="job-user rounded-circle border-secondary-200 d-flex align-items-center justify-content-center flex-shrink-0">
      <Button color="link" className="p-0 rounded-circle" disabled>
        <img className="rounded-circle" src={require('../../../../assets/images/job-user.jpg')} alt="Job Post User" />
      </Button>
    </div>
  );
};

export default UserImage;