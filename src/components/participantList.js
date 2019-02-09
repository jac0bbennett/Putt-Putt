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
            {part}
            <b style={{ float: "right" }}>
              {getWinRate(props.results, props.participants, index).formatted}
            </b>
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

const getWinRate = (results, participants, index) => {
  let gameCount = 0;
  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    const winner = handleGetWinner(results[i], participants);
    if (winner.index === index) {
      winCount++;
    }

    if (
      results[i].scores[index] !== undefined &&
      results[i].scores[index] !== ""
    ) {
      gameCount++;
    }
  }

  const winRate = Math.round((winCount / gameCount) * 100) || 0;

  const formatted = winCount + "/" + gameCount + " (" + winRate + "%)";

  return { winCount: winCount, totalGames: gameCount, formatted: formatted };
};

export default ParticipantList;
