import React from "react";
import NewParticipantForm from "../Forms/newparticipantform";
import NewResultForm from "../Forms/newresultform";

const Content = props => {
  switch (props.modalComp) {
    case "newparticipantform":
      return <NewParticipantForm {...props} />;
    case "newresultform":
      return <NewResultForm {...props} />;
    default:
      return <h2>Form</h2>;
  }
};

const Modal = props => {
  const showStyle = {
    opacity: 100,
    top: "50px"
  };
  const style = props.isShow ? showStyle : {};

  return (
    <div id="modal" style={style}>
      <i
        onClick={props.handleCloseModal}
        id="hidformexit"
        className="material-icons"
      >
        clear
      </i>
      <br />
      <Content {...props} />
    </div>
  );
};

export default Modal;
