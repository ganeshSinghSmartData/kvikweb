import React from 'react';
import './paragraph.css';
const Paragraph = (props) => {
  return (
    <p>
      {props.children}
    </p>
  );
};

export default Paragraph;