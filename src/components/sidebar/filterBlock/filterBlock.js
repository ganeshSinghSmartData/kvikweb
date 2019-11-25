import React from 'react';
import { Progress } from 'reactstrap';
import '../filterBlock/filterBlock';
import './filterBlock.scss';
const FilterBlock = (props) => {
  return (
    <div className="filter-row">
      <div className="filter-row filter-bar-rw">
        <h5 className="d-flex">
          <label className="flex-fill m-0">
            {props.budgetFilter ? 'Budget' : 'Distance'}
          </label>
          <span>
            {props.budgetFilter ? '$150' : '10 mile'}
          </span>
        </h5>
        <div className={"filter-bar-blc position-relative " + (props.budgetFilter ? 'secondary-bg-bar' : 'primary-bg-bar')}>
          <div className="filter-bar-outer">
            <Progress value={50} className={"filter-bar " + (props.budgetFilter ? 'secondary-bg-dark' : '')}></Progress>
          </div>
          <button color="primary" className={"p-0 filter-bar-btn " + (props.budgetFilter ? 'btn-secondary1' : 'btn-primary1')}></button>
        </div>
      </div>
    </div>
  );
};

export default FilterBlock;