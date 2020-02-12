import React from "react";
import constants from "../../../constants";
import Status from "./Status";
const getStatus = (status) => {
  let data = {
    not_started: {
      title: "Open",
      isComplete: false,
      isActive: false,
      isRejected: false
    },
    accepted: {
      title: "Bid Accepted",
      isComplete: false,
      isActive: false,
      isRejected: false
    },
    in_progress: {
      title: "In-Progress",
      isComplete: false,
      isActive: false,
      isRejected: false
    },
    completed: {
      title: "Completed",
      isComplete: false,
      isActive: false,
      isRejected: false
    },
    approved: {
      title: "Approved",
      isComplete: false,
      isActive: false,
      isRejected: false
    }
  };
  if (status === "rejected" || status == "expired") {
    data["accepted"] = {
      ...data["accepted"],
      title: constants.jobStatus[status],
      isRejected: true
    };
    status = "accepted";
  }
  data[status].isActive = true;
  switch (status) {
    case "not_accepted":
      data["not_started"].isActive = true;
      return data;
    case "not_started":
      data["not_started"].isActive = true;
      return data;
    case "accepted":
      data["not_started"].isComplete = true;
      return data;
    case "in_progress":
      data["not_started"].isComplete = true;
      data["accepted"].isComplete = true;
      return data;
    case "completed":
      data["not_started"].isComplete = true;
      data["accepted"].isComplete = true;
      data["in_progress"].isComplete = true;
      return data;
    case "approved":
      data["not_started"].isComplete = true;
      data["accepted"].isComplete = true;
      data["in_progress"].isComplete = true;
      data["completed"].isComplete = true;
      return data;
    case "rejected":
      return data;
    case "expired":
      return data;
    default:
      return data;
  }
};

const StatusBar = (props) => {
  if (props.visible)
    return (
      <>
        <div className="job-step-rw">
          <div class="job-status-mbl">
            Job Status:{" "}
            <span
              className={`${
                props.status === "accepted" ||
                props.status === "in_progress" ||
                props.status === "completed"
                  ? "text-success"
                  : props.status === "rejected" || props.status === "expired"
                  ? "text-danger"
                  : "text-primary"
              }`}
            >
              {constants.jobStatus[props.status]}
            </span>
          </div>
          <ul className="d-flex">
            {Object.keys(getStatus(props.status)).map((item, index) => (
              <Status {...getStatus(props.status)[item]} index={index} />
            ))}
          </ul>
        </div>
      </>
    );
  return null;
};

export default StatusBar;
