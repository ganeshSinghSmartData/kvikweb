import React, { useState } from "react";
import InputRange from "react-input-range";
import "../filterBlock/filterBlock";
import "./filterBlock.scss";
const FilterBlock = ({
  handleDistanceRange,
  handleBudgetRange,
  budgetFilter = false
}) => {
  const [distanceRange, setDistanceRange] = useState(0);
  const [budgetRange, setBudgetRange] = useState(0);

  return (
    <div className={`filter-row filter-bar-rw ${budgetFilter ? 'distance-row' : 'budget-row'}`}>
      <h5 className="d-flex">
        <label className="flex-fill m-0">
          {budgetFilter ? "Budget" : "Distance"}
        </label>
        <span>{budgetFilter ? "$150" : "10 mile"}</span>
      </h5>
      <div
        className={
          "filter-bar-blc position-relative " +
          (budgetFilter ? "secondary-bg-bar" : "primary-bg-bar")
        }
      >
        <div className="filter-bar-outer">
          {budgetFilter ? (
            <InputRange
              // step={2}
              allowSameValues={true}
              maxValue={150}
              minValue={0}
              value={budgetRange}
              onChange={value => setBudgetRange(value)}
              onChangeComplete={value =>
                handleBudgetRange && handleBudgetRange(value)
              }
            />
          ) : (
              <InputRange
                // step={2}
                allowSameValues={true}
                maxValue={10}
                minValue={0}
                value={distanceRange}
                onChange={value => setDistanceRange(value)}
                onChangeComplete={value =>
                  handleDistanceRange && handleDistanceRange(value)
                }
              />
            )}

          {/* <Progress value={50} className={"filter-bar " + (props.budgetFilter ? 'secondary-bg-dark' : '')}></Progress> */}
        </div>
        {/* <button
            color="primary"
            className={
              "p-0 filter-bar-btn " +
              (props.budgetFilter ? "btn-secondary1" : "btn-primary1")
            }
          ></button> */}
      </div>
    </div>
  );
};

export default FilterBlock;
