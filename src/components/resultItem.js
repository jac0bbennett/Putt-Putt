import React from "react";
import ago from "s-ago";

const ResultItem = props => {
  if (props.result !== null) {
    const winner = handleGetWinner(props.result, props.participants);
    return (
      <div className="item" onClick={props.expand}>
        <h3 style={{ width: "175px" }}>
          {winner.name} with {winner.score}
        </h3>
        <h3 style={{ width: "20px" }}>
          {getActualParticipantCount(props.result)}
        </h3>
        <span className="timestamp" title={new Date(props.result.createdAt)}>
          {ago(new Date(props.result.createdAt))}
        </span>
      </div>
    );
  } else {
    return null;
  }
};

const handleGetWinner = (result, participants) => {
  let highIndex = 0;
  let highScore = "";

  for (let i = 0; i < result.scores.length; i++) {
    if (result.scores[i] > highScore) {
      highIndex = i;
      highScore = result.scores[i];
    }
  }

  return { name: participants[highIndex], score: highScore, index: highIndex };
};

const getActualParticipantCount = result => {
  let count = 0;

  for (let i = 0; i < result.scores.length; i++) {
    if (result.scores[i] !== "") {
      count += 1;
    }
  }

  return count;
};

export default ResultItem;
export { handleGetWinner };
