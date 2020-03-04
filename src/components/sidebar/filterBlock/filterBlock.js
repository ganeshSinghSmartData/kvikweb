import React, { useState } from "react";
import InputRange from "react-input-range";
import "../filterBlock/filterBlock";
import "./filterBlock.scss";
const FilterBlock = ({
  title,
  maxValue,
  minValue,
  handleRange,
  containerClass,
  inputClass,
  multiValue,
  unit,
  placeUnitInRight
}) => {
  const [range, setRange] = useState(
    multiValue ? { min: 5, max: maxValue / 2 } : 10
  );

  return (
    <div className={`filter-row filter-bar-rw ${containerClass}`}>
      <h5 className="d-flex">
        <label className="flex-fill m-0">{title}</label>
        <span>
          {multiValue
            ? `${!placeUnitInRight ? unit : ""}${range.min}${
                placeUnitInRight ? unit : ""
              }-${!placeUnitInRight ? unit : ""}${range.max}${
                placeUnitInRight ? unit : ""
              }`
            : `${!placeUnitInRight ? unit : ""} ${range}${
                placeUnitInRight ? unit : ""
              }`}
        </span>
      </h5>
      <div className={`filter-bar-blc position-relative ${inputClass}`}>
        <div className="filter-bar-outer">
          <InputRange
            allowSameValues={true}
            maxValue={maxValue}
            minValue={minValue || 0}
            value={range}
            onChange={(value) => setRange(value)}
            onChangeComplete={(value) => handleRange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBlock;
