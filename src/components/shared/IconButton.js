import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const IconButton = (props) => {
  return (
    <button className="icon-button" {...props}>
      <FontAwesomeIcon icon={props.icon} size={props.iconsize} />
    </button>
  );
};

export default IconButton;
