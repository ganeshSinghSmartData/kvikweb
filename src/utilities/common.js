/* Fucntion to calulatre date from miliseconds */

import { MONTH_NAME } from "./constants";

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
