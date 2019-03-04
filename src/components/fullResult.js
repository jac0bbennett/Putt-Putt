import React from "react";
import { handleGetWinner } from "./resultItem";

const FullResult = props => {
  const result = props.modalData.result;
  const participants = props.modalData.participants;
  return (
    <div style={{ width: "700px" }}>
      <h3>{handleGetWinner(result, participants).name}</h3>
    </div>
  );
};

export default FullResult;
