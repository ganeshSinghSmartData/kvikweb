import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Control } from "react-redux-form";
import Match from "../../../utilities/validation";
import Error from "./../error";
import {
  invalidEmail,
  invalidPass,
  required
} from "./../../../utilities/message";

import "./inputCell.scss";
const InputCell = ({
  InputType,
  Name,
  Model,
  Placeholder,
  InputIcon,
  ClassName = "",
  Disabled = false,
  DefaultValue = "hourly",
  Errors
}) => {
  let ErrorsObject = {};
  /**************** Error validations ****************/
  const validation = () => {
    let errors = {};
    if (Errors["required"] === "required") {
      errors = { ...errors, required: val => !val || !val.length };
      ErrorsObject = { required };
    }
    if (Errors["invalidEmail"] === "invalidEmail") {
      errors = { ...errors, invalidEmail: val => !Match.validateEmail(val) };
      ErrorsObject = { invalidEmail };
    }
    if (Errors["invalidPass"] === "invalidPass") {
      errors = { ...errors, invalidPass: val => !Match.validatePassword(val) };
      ErrorsObject = { invalidPass };
    }
    return errors;
  };

  const categoryItems = [
    { label: "Gardening", value: "gardening" },
    { label: "Painting", value: "painting" },
    { label: "Help Moving", value: "help moving" },
    { label: "Home Design", value: "home design" },
    { label: "Laundry Service", value: "laundry service" }
  ];

  const frequencyItem = [
    { label: "Hourly", value: "hourly" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" }
  ];

  return (
    <FormGroup>
      <div
        className={`position-relative d-flex flex-wrap align-items-center ${ClassName}`}
      >
        {InputIcon ? (
          <span className="input-icon">
            {InputType === "text" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="54"
                viewBox="0 0 46 54"
              >
                <path
                  id="Forma_1"
                  data-name="Forma 1"
                  d="M41.014,42.889l-9.553-4.776A2.63,2.63,0,0,1,30,35.748V32.367c.229-.28.47-.6.719-.951a22.886,22.886,0,0,0,2.954-5.8A3.968,3.968,0,0,0,36,22V18a3.988,3.988,0,0,0-1-2.625V10.056a8.965,8.965,0,0,0-2.092-6.525C30.854,1.188,27.521,0,23,0s-7.854,1.188-9.908,3.53A8.967,8.967,0,0,0,11,10.056v5.319A3.988,3.988,0,0,0,10,18v4a3.976,3.976,0,0,0,1.5,3.109A20.988,20.988,0,0,0,15,32.346v3.309a2.642,2.642,0,0,1-1.377,2.32L4.7,42.841A9.018,9.018,0,0,0,0,50.762V54H46V50.957A8.973,8.973,0,0,0,41.014,42.889Z"
                />
              </svg>
            ) : InputType === "email" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="146"
                height="114.714"
                viewBox="0 0 146 114.714"
              >
                <path
                  id="Forma_1"
                  data-name="Forma 1"
                  d="M13.536,114.857a12.549,12.549,0,0,1-9.207-3.83A12.548,12.548,0,0,1,.5,101.82V37.131A43.159,43.159,0,0,0,8.729,44.22Q38.223,64.262,49.221,72.328q4.644,3.422,7.536,5.336a46.578,46.578,0,0,0,7.7,3.911,23.468,23.468,0,0,0,8.962,2h.165a23.46,23.46,0,0,0,8.96-2,46.506,46.506,0,0,0,7.7-3.911q2.893-1.913,7.537-5.336,13.848-10.022,40.572-28.108a44.921,44.921,0,0,0,8.149-7.088V101.82a13.076,13.076,0,0,1-13.036,13.037ZM73.5,73.14h-.082a12.933,12.933,0,0,1-4.074-.734,24.609,24.609,0,0,1-4.685-2.2q-2.487-1.465-4.238-2.647t-4.4-3.1q-2.649-1.913-3.462-2.484-7.414-5.214-21.346-14.868T14.513,35.5a40.441,40.441,0,0,1-9.533-9.41Q.5,20.106.5,14.971A16.45,16.45,0,0,1,3.881,4.378Q7.261.144,13.535.143H133.464a12.592,12.592,0,0,1,9.166,3.829,12.491,12.491,0,0,1,3.871,9.207,21.516,21.516,0,0,1-3.993,12.3A38.685,38.685,0,0,1,132.568,35.5Q101.935,56.767,94.44,61.98q-.815.571-3.463,2.484t-4.4,3.1q-1.752,1.181-4.236,2.647a24.608,24.608,0,0,1-4.685,2.2,12.933,12.933,0,0,1-4.074.734Z"
                  transform="translate(-0.5 -0.143)"
                />
              </svg>
            ) : InputType === "password" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="14.001"
                viewBox="0 0 12 14.001"
              >
                <path
                  id="Forma_1"
                  data-name="Forma 1"
                  d="M850.148,402.653h-.3v-1.277a4.6,4.6,0,0,0-4.7-4.376c-.071,0-.214,0-.285,0a4.6,4.6,0,0,0-4.7,4.376v1.277h-.3a.917.917,0,0,0-.851.97v6.4a.921.921,0,0,0,.851.973h10.3a.921.921,0,0,0,.851-.973v-6.4A.917.917,0,0,0,850.148,402.653Zm-4.184,4.165v1.935a.439.439,0,0,1-.454.409h-1.021a.439.439,0,0,1-.454-.409v-1.935a1.094,1.094,0,0,1-.379-.828,1.214,1.214,0,0,1,1.2-1.165c.071,0,.214,0,.285,0a1.214,1.214,0,0,1,1.2,1.165A1.1,1.1,0,0,1,845.964,406.818Zm1.875-4.165H842.16v-1.277a2.854,2.854,0,0,1,5.679,0Z"
                  transform="translate(-839 -396.999)"
                  fill="#6d6d6d"
                />
              </svg>
            ) : InputType === "date" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15.002"
                height="16.001"
                viewBox="0 0 15.002 16.001"
              >
                <path
                  id="Forma_1"
                  data-name="Forma 1"
                  d="M1.375,0A1.413,1.413,0,0,0,0,1.443V12.786a1.414,1.414,0,0,0,1.335,1.433V12.284A1.549,1.549,0,0,1,2.854,10.7h.959a1.557,1.557,0,0,1,1.528,1.58v1.942h4.32V12.284a1.557,1.557,0,0,1,1.528-1.58h.958a1.549,1.549,0,0,1,1.519,1.58v1.936A1.414,1.414,0,0,0,15,12.786V1.443A1.415,1.415,0,0,0,13.627,0Zm.379,8.008V2.149a.608.608,0,0,1,.595-.62H12.627a.608.608,0,0,1,.595.62h0V8.008a.608.608,0,0,1-.594.62H2.349A.608.608,0,0,1,1.754,8.008ZM9.93,2.376a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363h1.215a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363H8.109a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V4.006a.356.356,0,0,0,.348.363H5.071a.356.356,0,0,0,.348-.363V2.739a.356.356,0,0,0-.348-.363ZM9.93,5.543a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363h1.215a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363H8.109a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm-3.037,0a.356.356,0,0,0-.348.363V7.173a.356.356,0,0,0,.348.363H5.071a.356.356,0,0,0,.348-.363V5.906a.356.356,0,0,0-.348-.363Zm7.321,6.2a.532.532,0,0,0-.521.543v3.173a.532.532,0,0,0,.521.543h.948a.532.532,0,0,0,.521-.543V12.284a.532.532,0,0,0-.521-.543Zm-8.326,0a.532.532,0,0,0-.521.543v3.173A.532.532,0,0,0,2.851,16H3.8a.532.532,0,0,0,.521-.543V12.284a.532.532,0,0,0-.521-.543Z"
                />
              </svg>
            ) : InputType === "time" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23.003"
                height="23.003"
                viewBox="0 0 23.003 23.003"
              >
                <path
                  id="Forma_1"
                  data-name="Forma 1"
                  d="M0,11.5A11.5,11.5,0,1,1,11.5,23,11.514,11.514,0,0,1,0,11.5Zm2.447,0A9.054,9.054,0,1,0,11.5,2.446,9.065,9.065,0,0,0,2.445,11.5Zm8.933,1.539a.947.947,0,0,1-.947-.947V4.93a.947.947,0,0,1,1.894,0v6.215h5.168a.947.947,0,1,1,0,1.894Z"
                  transform="translate(0.002 0.002)"
                />
              </svg>
            ) : null}
          </span>
        ) : null}
        {InputType !== "select" && InputType !== "textarea" && (
          <Control.text
            type={InputType}
            name={Name}
            placeholder={Placeholder}
            model={Model}
            className={"form-control"}
            errors={validation()}
          />
        )}

        {InputType === "select" && (
          <Control.select
            type={InputType}
            name={Name}
            placeholder={Placeholder}
            model={Model}
            className={"form-control custom-select"}
            defaultValue={DefaultValue}
            disabled={Disabled}
            errors={validation()}
          >
            {Name === "frequency" &&
              frequencyItem &&
              frequencyItem.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            {Name === "category" &&
              categoryItems &&
              categoryItems.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </Control.select>
        )}
        {InputType === "textarea" && (
          <Control.textarea
            type={InputType}
            name={Name}
            placeholder={Placeholder}
            model={Model}
            className={"form-control"}
            errors={validation()}
          ></Control.textarea>
        )}
        <Error
          model={Model}
          errors={{
            ...ErrorsObject
          }}
        />
      </div>
    </FormGroup>
  );
};

export default InputCell;
