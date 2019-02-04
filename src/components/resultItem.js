import React from "react";
import ago from "s-ago";

const ResultItem = props => {
  const winner = handleGetWinner(props.result, props.participants);
  return (
    <div className="item">
      <h3 style={{ width: "175px" }}>
        {winner.name} with {winner.score}
      </h3>
      <h3 style={{ width: "20px" }}>{props.participants.length}</h3>
      <span className="timestamp">{ago(new Date(props.result.createdAt))}</span>
    </div>
  );
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

export default ResultItem;
export { handleGetWinner };