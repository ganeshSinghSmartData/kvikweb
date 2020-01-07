import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";

/* import datetimeDifference from "datetime-difference";

import { DaysBetween } from "./../../../utilities/common";

const TimeCounterComponent = ({ start_date }) => {
  let [timeleft, setTimeleft] = useState(
    datetimeDifference(new Date(), new Date(DaysBetween(start_date)))
  ); */

/*   useEffect(() => {
    if (!timeleft) {
      let date = datetimeDifference(
        new Date(),
        new Date(DaysBetween(start_date))
      );
      setTimeleft(date);
    }
  }); */

/*   setInterval(() => {
    const time = datetimeDifference(
      new Date(),
      new Date(DaysBetween(start_date))
    );
    setTimeleft(time);
  }, 1000); */

/*   return (
    <p>
      <label>{`${timeleft && timeleft.days} Days`}</label>
      <label>{`${timeleft && timeleft.hours} Hours`}</label>
      <label>{`${timeleft && timeleft.minutes} Mins`}</label>
      <label>{`${timeleft && timeleft.seconds} Secs`}</label>
    </p>
  );
};

export default React.memo(TimeCounterComponent);
 */

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
export const Renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};
