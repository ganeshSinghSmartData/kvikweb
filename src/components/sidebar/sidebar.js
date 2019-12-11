import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { Collapse } from 'reactstrap';

import FilterBlock from '../sidebar/filterBlock/filterBlock';
import './sidebar.scss';
const Sidebar = () => {

  const [isCategory, setIsCategory] = useState(true);
  const [isFilter, setIsFilter] = useState(true);

  const toggleCategory = () => setIsCategory(!isCategory);
  const toggleFilter = () => setIsFilter(!isFilter);

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
              <li className="active-sub-list">
                <h4 className="d-flex"><label className="flex-fill m-0">Gardening</label></h4>
              </li>
              <li>
                <h4 className="d-flex"><label className="flex-fill m-0">Painting</label></h4>
              </li>
              <li>
                <h4 className="d-flex"><label className="flex-fill m-0">Help Moving</label></h4>
              </li>
              <li>
                <h4 className="d-flex"><label className="flex-fill m-0">Home Design</label></h4>
              </li>
              <li>
                <h4 className="d-flex"><label className="flex-fill m-0">Laundry Service</label></h4>
              </li>
            </ul>
          </Collapse>
        </div>
      </div>
      <div className="sidebar-item">
        <h3 className="d-flex">
          <label className="flex-fill m-0">FILTER BY</label>
          <Button color="link" className="item-toggle-btn d-flex flex-column flex-column align-items-center flex-shrink-0 btn btn-link p-0" onClick={toggleFilter}>
            <span className="d-flex align-items-center justify-content-center"><span className={`${isFilter ? 'active' : ''} d-flex`}></span></span>
          </Button>
        </h3>
        <Collapse isOpen={isFilter}>
          <div className="sidebar-list-blc">
            <FilterBlock />
            <div className="filter-row postal-rw">
              <h5 className="d-flex postal-head">
                <label className="flex-fill m-0 text-primary">
                  Postal Code
                </label>
              </h5>
              <Input type="text" name="postal-code" id="exampleEmail" placeholder="Enter Postal Code" />
            </div>
            <FilterBlock budgetFilter={true} />
          </div>
        </Collapse>
      </div>
    </aside>
  );
};

export default Sidebar;