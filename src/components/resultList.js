import React, { Component } from "react";

class ResultList extends Component {
  state = {};
  render() {
    return (
      <div className="gencontainer resultlist">
        <h1>Results</h1>
        <center>
          <div className="loadingicon" />
        </center>
      </div>
    );
  }
}

export default ResultList;
