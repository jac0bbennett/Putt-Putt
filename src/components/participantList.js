import React from "react";
import { handleGetWinner } from "./resultItem";

const ParticipantList = props => {
  return (
    <div
      className="gencontainer participantlist"
      style={{ paddingBottom: "0" }}
    >
      {props.isLoaded ? (
        <button
          className="flatbut floatright"
          style={{ marginTop: "20px" }}
          onClick={() => props.handleShowModal("newparticipantform")}
        >
          <i className="material-icons" style={{ fontSize: "12pt" }}>
            add
          </i>
          <span className="icolab">New</span>
        </button>
      ) : null}
      <h1>Participants</h1>

      {props.participants.length > 0 ? (
        props.participants.map((part, index) => (
          <h3 key={index}>
            <b>{getWinCount(props.results, props.participants, index)}</b>{" "}
            {part}
          </h3>
        ))
      ) : props.isLoaded ? (
        <center>
          <h3>None yet.</h3>
        </center>
      ) : (
        <center>
          <div className="loadingicon" style={{ marginBottom: "20px" }} />
        </center>
      )}
    </div>
  );
};

const getWinCount = (results, participants, index) => {
  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    const winner = handleGetWinner(results[i], participants);
    if (winner.index === index) {
      winCount++;
    }
  }

  return winCount;
};

export default ParticipantList;
