import React, { Component } from "react";

class ResultList extends Component {
  handleGetWinner = result => {
    let highIndex = 0;
    let highScore = "";
    for (let i = 0; i < result.scores.length; i++) {
      if (result.scores[i] > highScore) {
        highIndex = i;
        highScore = result.scores[i];
      }
    }

    return this.props.participants[highIndex] + " with " + highScore;
  };

  render() {
    return (
      <div className="gencontainer resultlist">
        {this.props.isLoaded ? (
          <button
            className="flatbut floatright"
            style={{ marginTop: "20px" }}
            onClick={() =>
              this.props.handleShowModal("newresultform", {
                participants: this.props.participants
              })
            }
          >
            <i className="material-icons" style={{ fontSize: "12pt" }}>
              add
            </i>
            <span className="icolab">New</span>
          </button>
        ) : null}
        <h1>Results</h1>

        {this.props.results.length > 0 ? (
          this.props.results
            .slice(0)
            .reverse()
            .map((result, index) => (
              <h3 key={index}>Winner: {this.handleGetWinner(result)}</h3>
            ))
        ) : this.props.isLoaded ? (
          <center>
            <h3>None yet.</h3>
          </center>
        ) : (
          <center>
            <div className="loadingicon" />
          </center>
        )}
      </div>
    );
  }
}

export default ResultList;
