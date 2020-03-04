import React from "react";
import { getTranslations } from "../../../utilities/translations";

const Completionist = () => <span>{getTranslations("good_to_go")}</span>;

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
