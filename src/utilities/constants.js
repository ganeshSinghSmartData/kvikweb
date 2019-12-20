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
  not_accepted: "Bid not accepted yet",
  in_progress: "Bid is in progress"
};

export const CategoryItems = [
  { name: "Gardening", value: "gardening" },
  { name: "Painting", value: "painting" },
  { name: "Help Moving", value: "help moving" },
  { name: "Home Design", value: "home design" },
  { name: "Laundry Service", value: "laundry service" }
];

export const FrequencyItem = [
  { label: "One-time", value: "one-time" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" }
];
