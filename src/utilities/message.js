/*
 * @file: messages.js
 * @description: Handle staic messages for the application
 * @author: smartData
 */

const Message = {
  requiredField: field => `Please enter ${field}!`,
  required: "This field is required. ",
  invalidNumber: "Please enter valid number.",
  fileRequired: "Please Upload! your Post-Job Images.",
  emptyField: "This field is required.",
  success: "Success!",
  error: "Error!",
  commonError: "Something went wrong!",
  logout: "Logout!",
  invalidEmail: "Please enter valid email.",
  invalidPass:
    "Your password must have at least 8 characters with at least one upper case letter, at least one lower case letter and at least one number or special character.",
  passMismatch: "Password and re-enter password does not match.",
  validatePrice: "Valid format is 123.00"
};

module.exports = Message;
