import React from 'react';
import { Button,Input } from 'reactstrap';
import FilterBlock from '../sidebar/filterBlock/filterBlock';
import './sidebar.scss';
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-item">
        <h3 className="d-flex">
          <label className="flex-fill m-0">SEARCH BY CATEGORY</label>
          <Button color="link" className="item-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0   btn btn-link p-0">
            <span className="d-flex align-items-center justify-content-center">
              <span className="d-flex active">
              </span>
            </span>
          </Button>
        </h3>
        <div className="sidebar-list-blc">
          <ul>
          <li className="active-sub-list">
              <h4 className="d-flex">
                <label className="flex-fill m-0">Gardening</label>
                <Button color="link" className="list-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0 btn btn-link p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.496" height="8.07" viewBox="0 0 12.496 8.07">
  <path id="Path_899" data-name="Path 899" d="M5.586-3.738a.929.929,0,0,0,1.32,0l5.312-5.312a.934.934,0,0,0,0-1.324l-.883-.883a.934.934,0,0,0-1.324,0L6.246-7.492,2.48-11.258a.934.934,0,0,0-1.324,0l-.883.883a.934.934,0,0,0,0,1.324Z" transform="translate(0.002 11.533)" fill="#333"/>
</svg>

                </Button>
              </h4>
              <div className="sidebar-list">
                <ul>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 1
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 2
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 3
                  </Button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h4 className="d-flex">
                <label className="flex-fill m-0">Painting</label>
                <Button color="link" className="list-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0 btn btn-link p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.496" height="8.07" viewBox="0 0 12.496 8.07">
  <path id="Path_899" data-name="Path 899" d="M5.586-3.738a.929.929,0,0,0,1.32,0l5.312-5.312a.934.934,0,0,0,0-1.324l-.883-.883a.934.934,0,0,0-1.324,0L6.246-7.492,2.48-11.258a.934.934,0,0,0-1.324,0l-.883.883a.934.934,0,0,0,0,1.324Z" transform="translate(0.002 11.533)" fill="#333"/>
</svg>

                </Button>
              </h4>
              <div className="sidebar-list">
                <ul>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 1
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 2
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 3
                  </Button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h4 className="d-flex">
                <label className="flex-fill m-0">Help Moving</label>
                <Button color="link" className="list-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0 btn btn-link p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.496" height="8.07" viewBox="0 0 12.496 8.07">
  <path id="Path_899" data-name="Path 899" d="M5.586-3.738a.929.929,0,0,0,1.32,0l5.312-5.312a.934.934,0,0,0,0-1.324l-.883-.883a.934.934,0,0,0-1.324,0L6.246-7.492,2.48-11.258a.934.934,0,0,0-1.324,0l-.883.883a.934.934,0,0,0,0,1.324Z" transform="translate(0.002 11.533)" fill="#333"/>
</svg>

                </Button>
              </h4>
              <div className="sidebar-list">
                <ul>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 1
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 2
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 3
                  </Button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h4 className="d-flex">
                <label className="flex-fill m-0">Home Design</label>
                <Button color="link" className="list-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0 btn btn-link p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.496" height="8.07" viewBox="0 0 12.496 8.07">
  <path id="Path_899" data-name="Path 899" d="M5.586-3.738a.929.929,0,0,0,1.32,0l5.312-5.312a.934.934,0,0,0,0-1.324l-.883-.883a.934.934,0,0,0-1.324,0L6.246-7.492,2.48-11.258a.934.934,0,0,0-1.324,0l-.883.883a.934.934,0,0,0,0,1.324Z" transform="translate(0.002 11.533)" fill="#333"/>
</svg>

                </Button>
              </h4>
              <div className="sidebar-list">
                <ul>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 1
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 2
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 3
                  </Button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <h4 className="d-flex">
                <label className="flex-fill m-0">Laundry Service</label>
                <Button color="link" className="list-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0 btn btn-link p-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.496" height="8.07" viewBox="0 0 12.496 8.07">
  <path id="Path_899" data-name="Path 899" d="M5.586-3.738a.929.929,0,0,0,1.32,0l5.312-5.312a.934.934,0,0,0,0-1.324l-.883-.883a.934.934,0,0,0-1.324,0L6.246-7.492,2.48-11.258a.934.934,0,0,0-1.324,0l-.883.883a.934.934,0,0,0,0,1.324Z" transform="translate(0.002 11.533)" fill="#333"/>
</svg>

                </Button>
              </h4>
              <div className="sidebar-list">
                <ul>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 1
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 2
                  </Button>
                  </li>
                  <li>
                  <Button color="link" block  className="text-left">
                    Subcategory 3
                  </Button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-item">
      <h3 className="d-flex">
          <label className="flex-fill m-0">FILTER BY</label>
          <Button color="link" className="item-toggle-btn d-flex flex-column 
flex-column align-items-center flex-shrink-0   btn btn-link p-0">
            <span className="d-flex align-items-center justify-content-center">
              <span className="active d-flex">
              </span>
            </span>
          </Button>
        </h3>
        <div className="sidebar-list-blc">                     
            <FilterBlock/>          
          <div className="filter-row postal-rw">    
          <h5 className="d-flex postal-head">
          <label className="flex-fill m-0 text-primary">
          Postal Code
          </label>         
        </h5>       
          <Input type="text" name="postal-code" id="exampleEmail" placeholder="Enter Postal Code" />
          </div>
          <FilterBlock budgetFilter={true}/>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;