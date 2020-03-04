import React, { useState, useEffect } from "react";
import datetimeDifference from "datetime-difference";

import { DaysBetween } from "./../../../utilities/common";
import { getTranslations } from "../../../utilities/translations";

const TimeCounterComponent = ({ start_date }) => {
  let [timeleft, setTimeleft] = useState(
    datetimeDifference(new Date(), new Date(DaysBetween(start_date)))
  );

  return (
    <p>
      <label>{`${timeleft && timeleft.days} ${getTranslations("days")}`}</label>
      <label>{`${timeleft && timeleft.hours} ${getTranslations(
        "hours"
      )}`}</label>
      <label>{`${timeleft && timeleft.minutes} ${getTranslations(
        "mins"
      )}`}</label>
      <label>{`${timeleft && timeleft.seconds} ${getTranslations(
        "secs"
      )}`}</label>
    </p>
  );
};

export default React.memo(TimeCounterComponent);
