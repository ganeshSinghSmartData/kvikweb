import React from 'react';
import UserImage from '../userImage/userImage';
import RatingBlock from '../../ratingBock/ratingBlock';
import './proposal.scss';
const Proposal = (props) => {
  return (
    <div className="proposal-rw d-flex">
      <div className="proposal-col-l">
        <UserImage />
      </div>
      <div className="proposal-col-m">
        <h5>Jorden Luise</h5>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
          </p>
      </div>
      <div className="proposal-col-r time-rate text-right flex-shrink-0">
        <span className="d-block"> 1 Day Ago</span>
        <h3 className="text-primary">$650.00</h3>
        <RatingBlock />
      </div>
    </div>
  );
};

export default Proposal;