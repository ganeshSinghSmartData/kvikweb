import React from 'react';
const Heading = (props) => {
  return (
    <h2 className={props.className}>
      {props.children}
    </h2>
  );
};

export default Heading;