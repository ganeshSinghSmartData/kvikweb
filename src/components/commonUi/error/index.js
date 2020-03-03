import React from "react";
import PropTypes from "prop-types";
import { Errors } from "react-redux-form";
import { getTranslations } from "../../../utilities/translations";

const errors = ({ model, errors }) => {
  return (
    <Errors
      className="errors"
      model={model}
      show="touched"
      messages={{
        required: getTranslations("required"),
        invalidEmail: getTranslations("invalidEmail"),
        invalidNumber: getTranslations("invalidNumber"),
        invalidPass: getTranslations("invalidPass"),
        ...errors
      }}
    />
  );
};

errors.propTypes = {
  model: PropTypes.string.isRequired,
  errors: PropTypes.object
};

export default errors;
