/*
 * @file: constants.js
 * @description: It Contain action types Related Action.
 * @author: smartData
 */

/************ User *************/
export const public_type = "public";
export const private_type = "private";
export const pagination = {
  page: 1,
  limit: 9
};
export const DummyUserImage = require("../assets/images/dummyuser.png");
export const MONTH_NAME = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const JobStatus = {
  not_started: "Bid not started",
  expired: "Bid has been expired.",
  rejected: "Bid has been rejected",
  approved: "Bid has been approved",
  accepted: "Bid has been accepted",
  completed: "Bid has been completed",
  not_accepted: "Bid not accepted",
  in_progress: "Bid is in progress",
  completed: "Bid has been completed"
};
