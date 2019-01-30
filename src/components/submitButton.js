import React from "react";

const SubmitButton = props => {
  return (
    <button className="raisedbut floatright" style={props.style} type="submit">
      {props.children}
    </button>
  );
};

export default SubmitButton;
