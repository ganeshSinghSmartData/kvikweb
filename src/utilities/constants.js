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
  not_started: "Job not started",
  expired: "Job has been expired.",
  rejected: "Job has been rejected",
  approved: "Job has been approved",
  accepted: "Job has been accepted",
  completed: "Job has been completed",
  not_accepted: "Job not accepted yet",
  in_progress: "Job is in progress",

  // Mobile Messages
  noCardsFound: "No card added yet",
  noCardsFoundProfile:
    "Unable to fetch your cards details at this moment. Please go to your profile and add a new card",
  startThisJob: "Start this job",
  markAsComplete: "Mark as complete",
  sure: "Sure",
  startJob: "Start Job",
  completeJob: "Complete job",
  completeThisJob: "Complete this job",
  confirmStartJob: "Are you want to start this job",
  confirmMarkAsComplete: "Are you sure want to mark this as completed",
  approveThisJob: "Approve this job",
  approveJobWork: "Approve job work",
  confirmMarkAsApprove: "Are you sure want to approve this job as complete?",
  jobAcceptedByMessage: "The job request has been accepted by",
  remondMeLater: "Remind me Later",
  notStarted: "Not Started",
  inProgree: "In progress",
  accepted: "Accepted",
  notAccepted: "Not accepted",
  completed: "Completed",
  expired: "Expired",
  hasCompletedAJob: "Has been completed the job",
  tabAStarRating: "Tap a star to rate him",
  acceptJob: "Accept job",
  rejectJob: "Reject job",
  accpetJobMessage: "Are you sure want to accept this job?",
  rejectJobMessage: "Are you sure want to reject this job?",
  rejected: "rejected",
  bidAccepted: "bid accepted",
  bidNotAccepted: "bid not accepted yet",
  jobCompleted: "job completed",
  jobApproved: "job approved",
  jobExpired: "job expired",
  bidExpired: "bid expired",
  paymnetDebited: "Payment debited successfully",
  paidAmout: "Paid amount",
  clickToAddCards: "Click here to add cards",
  inProgress: "in progress",
  jobAccepted: "job accepted",
  approved: "approved",
  debitCard: "Debit Card",
  creditCard: "Credit Card",
  noCardTokenFound: "No card token found",
  checkCardError: "Card was declined, Please check your details and try again"
};

export const BidStatus = {
  not_started: "Bid not started",
  expired: "Bid has been expired.",
  rejected: "Bid has been rejected",
  approved: "Bid has been approved",
  accepted: "Bid has been accepted",
  completed: "Bid has been completed",
  not_accepted: "Bid not accepted yet",
  in_progress: "Bid is in progress",

  // Mobile Messages
  noCardsFound: "No card added yet",
  noCardsFoundProfile:
    "Unable to fetch your cards details at this moment. Please go to your profile and add a new card",
  startThisJob: "Start this job",
  markAsComplete: "Mark as complete",
  sure: "Sure",
  startJob: "Start Job",
  completeJob: "Complete job",
  completeThisJob: "Complete this job",
  confirmStartJob: "Are you want to start this job",
  confirmMarkAsComplete: "Are you sure want to mark this as completed",
  approveThisJob: "Approve this job",
  approveJobWork: "Approve job work",
  confirmMarkAsApprove: "Are you sure want to approve this job as complete?",
  jobAcceptedByMessage: "The job request has been accepted by",
  remondMeLater: "Remind me Later",
  notStarted: "Not Started",
  inProgree: "In progress",
  accepted: "Accepted",
  notAccepted: "Not accepted",
  completed: "Completed",
  expired: "Expired",
  hasCompletedAJob: "Has been completed the job",
  tabAStarRating: "Tap a star to rate him",
  acceptJob: "Accept job",
  rejectJob: "Reject job",
  accpetJobMessage: "Are you sure want to accept this job?",
  rejectJobMessage: "Are you sure want to reject this job?",
  rejected: "rejected",
  bidAccepted: "bid accepted",
  bidNotAccepted: "bid not accepted yet",
  jobCompleted: "job completed",
  jobApproved: "job approved",
  jobExpired: "job expired",
  bidExpired: "bid expired",
  paymnetDebited: "Payment debited successfully",
  paidAmout: "Paid amount",
  clickToAddCards: "Click here to add cards",
  inProgress: "in progress",
  jobAccepted: "job accepted",
  approved: "approved",
  debitCard: "Debit Card",
  creditCard: "Credit Card",
  noCardTokenFound: "No card token found",
  checkCardError: "Card was declined, Please check your details and try again"
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
