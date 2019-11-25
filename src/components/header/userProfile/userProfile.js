import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import './userProfile.scss';
const UserProfile = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div className={"user-profile-blc row m-0 align-items-center flex-shrink-0 " + (props.className)}>
      <Button color="link" className="user-mail">
        <svg xmlns="http://www.w3.org/2000/svg" width="146" height="114.714" viewBox="0 0 146 114.714">
          <path id="Forma_1" data-name="Forma 1" d="M13.536,114.857a12.549,12.549,0,0,1-9.207-3.83A12.548,12.548,0,0,1,.5,101.82V37.131A43.159,43.159,0,0,0,8.729,44.22Q38.223,64.262,49.221,72.328q4.644,3.422,7.536,5.336a46.578,46.578,0,0,0,7.7,3.911,23.468,23.468,0,0,0,8.962,2h.165a23.46,23.46,0,0,0,8.96-2,46.506,46.506,0,0,0,7.7-3.911q2.893-1.913,7.537-5.336,13.848-10.022,40.572-28.108a44.921,44.921,0,0,0,8.149-7.088V101.82a13.076,13.076,0,0,1-13.036,13.037ZM73.5,73.14h-.082a12.933,12.933,0,0,1-4.074-.734,24.609,24.609,0,0,1-4.685-2.2q-2.487-1.465-4.238-2.647t-4.4-3.1q-2.649-1.913-3.462-2.484-7.414-5.214-21.346-14.868T14.513,35.5a40.441,40.441,0,0,1-9.533-9.41Q.5,20.106.5,14.971A16.45,16.45,0,0,1,3.881,4.378Q7.261.144,13.535.143H133.464a12.592,12.592,0,0,1,9.166,3.829,12.491,12.491,0,0,1,3.871,9.207,21.516,21.516,0,0,1-3.993,12.3A38.685,38.685,0,0,1,132.568,35.5Q101.935,56.767,94.44,61.98q-.815.571-3.463,2.484t-4.4,3.1q-1.752,1.181-4.236,2.647a24.608,24.608,0,0,1-4.685,2.2,12.933,12.933,0,0,1-4.074.734Z" transform="translate(-0.5 -0.143)" />
        </svg>
      </Button>
      <Button color="link" className="user-pic p-0 rounded-circle">
        <img className="rounded-circle w-100 h-100" src={require('../../../assets/images/user-profile.jpg')} alt="User Profile" />
      </Button>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="user-dropdown">
        <DropdownToggle caret color="link">
          <svg xmlns="http://www.w3.org/2000/svg" width="81.309" height="47.418" viewBox="0 0 81.309 47.418">
            <path id="Forma_1" data-name="Forma 1" d="M80.341,4.679,76.268.606a2.562,2.562,0,0,0-3.748,0L40.5,32.625,8.481.607a2.562,2.562,0,0,0-3.748,0L.66,4.68a2.561,2.561,0,0,0,0,3.747L38.626,46.395a2.562,2.562,0,0,0,3.747,0L80.341,8.428a2.566,2.566,0,0,0,0-3.748Z" transform="translate(0.154 0.209)" />
          </svg>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserProfile;