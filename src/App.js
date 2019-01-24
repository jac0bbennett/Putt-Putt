import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { postRequest } from "./utils/requests";
import Group from "./components/group";

class App extends Component {
  state = {
    msg: "",
    status: "idle",
    apiBaseUrl: "https://us-central1-putt-putt-1c908.cloudfunctions.net/",
    createdUrl: ""
  };

  handleCreateGroup = async () => {
    if (this.state.status !== "active") {
      this.setState({ msg: "creating...", status: "active" });
      const req = await postRequest(this.state.apiBaseUrl + "newgroup");
      if (req.error) {
        const msg = req.error;
        this.setState({ msg });
      } else {
        const url = "http://localhost:3000/" + req.slug;
        const msg = "Save this URL:";
        this.setState({ msg: msg, createdUrl: url });
      }
      this.setState({ status: "idle" });
    }
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "15%"
              }}
            >
              <h1>Putt Putt Score Tracking</h1>
              <br />
              <button onClick={this.handleCreateGroup}>Create Group</button>
              <br />
              <span>{this.state.msg}</span>
              <br />
              <a href={this.state.createdUrl}>{this.state.createdUrl}</a>
            </div>
          )}
        />
        <Route
          exact
          path="/:slug"
          render={props => (
            <Group {...props} apiBaseUrl={this.state.apiBaseUrl} />
          )}
        />
      </Switch>
    );
  }
}

export default App;
