import React, { useState } from "react";
import { LocalForm } from "react-redux-form";
import { Button, Input } from "reactstrap";
import { Collapse } from "reactstrap";
import "react-input-range/lib/css/index.css";

// onChangeComplete

import FilterBlock from "../sidebar/filterBlock/filterBlock";
import { CategoryItems } from "../../utilities/constants";
import InputCell from "../commonUi/input/inputCell";
import "./sidebar.scss";

const Sidebar = ({
  _handleCategory,
  _handlePostalCode,
  _handleDistance,
  _handleBudget
}) => {
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
          <Button
            color="link"
            className="item-toggle-btn d-flex flex-column flex-column align-items-end flex-shrink-0   btn btn-link p-0"
            onClick={toggleCategory}
          >
            <span className="d-flex align-items-center justify-content-center">
              <span className={`${isCategory ? "active" : ""} d-flex`}></span>
            </span>
          </Button>
        </h3>
        <div className="sidebar-list-blc">
          <Collapse isOpen={isCategory}>
            <ul>
              {CategoryItems &&
                CategoryItems.length &&
                CategoryItems.map((item, key) => {
                  return (
                    <li className="position-relative" key={key}>
                      <Button
                        color="link"
                        block
                        className={`d-flex flex-fill m-0 text-left`}
                        onClick={() => toggleCheckHandler(key)}
                        // className={`d-flex flex-fill m-0 text-left ${toggleCheck ? "active" : ""}`}
                      >
                        {item.name}
                        <input
                          type="checkbox"
                          name="select"
                          className="position-absolute w-100 h-100"
                          onChange={() => _handleCategory(item.name)}
                        />
                        <label className="ml-auto mb-0">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="78.775"
                              height="57.775"
                              viewBox="0 0 78.775 57.775"
                            >
                              <path
                                id="Forma_1"
                                data-name="Forma 1"
                                d="M78.564,8.73,29.722,57.567a1.1,1.1,0,0,1-1.556,0L.433,29.836a1.1,1.1,0,0,1,0-1.555l6.739-6.738a1.1,1.1,0,0,1,1.556,0L28.945,41.757,70.27.436a1.1,1.1,0,0,1,1.555,0l6.739,6.738A1.1,1.1,0,0,1,78.564,8.73Z"
                                transform="translate(-0.111 -0.114)"
                              />
                            </svg>
                          </span>
                        </label>
                      </Button>
                    </li>
                  );
                })}
            </ul>
          </Collapse>
        </div>
      </div>
      <div className="sidebar-item">
        <h3 className="d-flex">
          <label className="flex-fill m-0">FILTER BY</label>
          <Button
            color="link"
            className="item-toggle-btn d-flex flex-column flex-column align-items-end flex-shrink-0 btn btn-link p-0"
            onClick={toggleFilter}
          >
            <span className="d-flex align-items-center justify-content-center">
              <span className={`${isFilter ? "active" : ""} d-flex`}></span>
            </span>
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
              <LocalForm>
                <InputCell
                  Name={"postal-code"}
                  Placeholder={"Enter Postal Code"}
                  Model=".postal-code"
                  InputType={"text"}
                  Length={6}
                  handlePostalCode={_handlePostalCode}
                  Errors={{
                    invalidNumber: "invalidNumber",
                    lengthExist: "lengthExist"
                  }}
                />
              </LocalForm>
            </div>
            <FilterBlock
              handleBudgetRange={val => _handleBudget(val)}
              handleDistanceRange={val => _handleDistance(val)}
              budgetFilter={false}
            />
            <FilterBlock
              handleBudgetRange={val => _handleBudget(val)}
              handleDistanceRange={val => _handleDistance(val)}
              budgetFilter={true}
            />
          </div>
        </Collapse>
      </div>
    </aside>
  );
};

export default Sidebar;
