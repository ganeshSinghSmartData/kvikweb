/* Fucntion to calulatre date from miliseconds */

import { MONTH_NAME } from "./constants";
import moment from "moment";

export const StringToDate = value => {
  const newdate = new Date(Number(value));
  return (
    newdate.getDate() +
    " " +
    MONTH_NAME[newdate.getMonth()] +
    ", " +
    newdate.getFullYear()
  );
};

export const DaysBetween = (startDate, endDate) => {
  const newdate = new Date(Number(startDate));
  return newdate.toString();
};

export const AddOffset = value => {
  var userOffset = new Date(value).getTimezoneOffset();
  var userOffsetMilli = (userOffset * 60) / 1000;
  var dateInMilli = moment(value).unix() * 1000;
  var dateInUtc = dateInMilli + userOffsetMilli;
  return dateInUtc;
};
