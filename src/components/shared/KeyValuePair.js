import React from "react";

const KeyValuePair = (props) => {
  return (
    <div className="key-value-container" {...props}>
      <p>{props.label}</p>
      <h4>{props.value}</h4>
    </div>
  );
};

export default KeyValuePair;
