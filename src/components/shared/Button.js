import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = (props) => {
  return (
    <button className="button" {...props}>
      <FontAwesomeIcon icon={props.icon} size="lg" />
      {props.label}
    </button>
  );
};

export default Button;
