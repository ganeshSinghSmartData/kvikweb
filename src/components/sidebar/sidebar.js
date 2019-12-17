import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { Collapse } from 'reactstrap';

import FilterBlock from '../sidebar/filterBlock/filterBlock';
import './sidebar.scss';
const Sidebar = () => {

  const [isCategory, setIsCategory] = useState(true);
  const [isFilter, setIsFilter] = useState(true);
  const [toggleCheck, setToggleCheck] = useState(false);

  const toggleCategory = () => setIsCategory(!isCategory);
  const toggleFilter = () => setIsFilter(!isFilter);


  const toggleCheckHandler = () => setToggleCheck(!toggleCheck);

  return (
    <aside className="sidebar">
      <div className="sidebar-item">
        <h3 className="d-flex">
          <label className="flex-fill m-0">SEARCH BY CATEGORY</label>
          <Button color="link" className="item-toggle-btn d-flex flex-column flex-column align-items-center flex-shrink-0   btn btn-link p-0" onClick={toggleCategory}>
            <span className="d-flex align-items-center justify-content-center"><span className={`${isCategory ? 'active' : ''} d-flex`}></span></span>
          </Button>
        </h3>
        <div className="sidebar-list-blc">
          <Collapse isOpen={isCategory}>
            <ul>
              <li className="position-relative">
                <Button color="link" block className={`d-flex flex-fill m-0 text-left ${toggleCheck ? 'active' : ''}`} onClick={toggleCheckHandler}>
                  Gardening
                  <input type="checkbox" name='select' className="position-absolute w-100 h-100" />
                  <label className="ml-auto mb-0">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="78.775" height="57.775" viewBox="0 0 78.775 57.775">
                        <path id="Forma_1" data-name="Forma 1" d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z" transform="translate(-0.111 -0.114)" />
                      </svg>
                    </span>
                  </label>
                </Button>
              </li>
              <li>
                <Button color="link" block className={`d-flex flex-fill m-0 text-left`}>
                  Painting
                <input type="checkbox" name='select' className="position-absolute w-100 h-100" />
                  <label className="ml-auto mb-0">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="78.775" height="57.775" viewBox="0 0 78.775 57.775">
                        <path id="Forma_1" data-name="Forma 1" d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z" transform="translate(-0.111 -0.114)" />
                      </svg>
                    </span>
                  </label>
                </Button>
              </li>
              <li>
                <Button color="link" block className={`d-flex flex-fill m-0 text-left`}>
                  Help Moving
                <input type="checkbox" name='select' className="position-absolute w-100 h-100" />
                  <label className="ml-auto mb-0">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="78.775" height="57.775" viewBox="0 0 78.775 57.775">
                        <path id="Forma_1" data-name="Forma 1" d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z" transform="translate(-0.111 -0.114)" />
                      </svg>
                    </span>
                  </label>
                </Button>
              </li>
              <li>
                <Button color="link" block className={`d-flex flex-fill m-0 text-left`}>
                  Home Design
                <input type="checkbox" name='select' className="position-absolute w-100 h-100" />
                  <label className="ml-auto mb-0">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="78.775" height="57.775" viewBox="0 0 78.775 57.775">
                        <path id="Forma_1" data-name="Forma 1" d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z" transform="translate(-0.111 -0.114)" />
                      </svg>
                    </span>
                  </label>
                </Button>
              </li>
              <li>
                <Button color="link" block className={`d-flex flex-fill m-0 text-left`}>
                  Laundry Service
                <input type="checkbox" name='select' className="position-absolute w-100 h-100" />
                  <label className="ml-auto mb-0">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="78.775" height="57.775" viewBox="0 0 78.775 57.775">
                        <path id="Forma_1" data-name="Forma 1" d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z" transform="translate(-0.111 -0.114)" />
                      </svg>
                    </span>
                  </label>
                </Button>
              </li>
            </ul >
          </Collapse >
        </div >
      </div >
      <div className="sidebar-item">
        <h3 className="d-flex">
          <label className="flex-fill m-0">FILTER BY</label>
          <Button color="link" className="item-toggle-btn d-flex flex-column flex-column align-items-center flex-shrink-0 btn btn-link p-0" onClick={toggleFilter}>
            <span className="d-flex align-items-center justify-content-center"><span className={`${isFilter ? 'active' : ''} d-flex`}></span></span>
          </Button>
        </h3>
        <Collapse isOpen={isFilter}>
          <div className="sidebar-list-blc">
            <div className="filter-row postal-rw">
              <h5 className="d-flex postal-head">
                <label className="flex-fill m-0 text-primary">
                  Postal Code
                </label>
              </h5>
              <Input type="text" name="postal-code" id="exampleEmail" placeholder="Enter Postal Code" />
            </div>
            <FilterBlock />
            <FilterBlock budgetFilter={true} />
          </div>
        </Collapse>
      </div>
    </aside >
  );
};

export default Sidebar;