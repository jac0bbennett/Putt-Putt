import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { postRequest } from "./utils/requests";
import Group from "./components/group";
import TextInput from "./components/txtInput";
import Modal from "./components/Modal/modal";
import Cloak from "./components/Modal/cloak";

class App extends Component {
  state = {
    name: "",
    msg: "",
    status: "idle",
    apiBaseUrl: "https://us-central1-putt-putt-1c908.cloudfunctions.net/",
    createdUrl: "",
    showModal: false,
    modalComp: null,
    modalData: {},
    reloadGroup: false
  };

  handleCreateGroup = async event => {
    event.preventDefault();

    if (this.state.status !== "active") {
      this.setState({ msg: <div className="loadingicon" />, status: "active" });
      const req = await postRequest(
        this.state.apiBaseUrl + "newgroup?name=" + this.state.name
      );
      if (req.error) {
        const msg = req.error;
        this.setState({ msg });
      } else {
        const url = "https://putt.jwb.cloud/" + req.slug;
        const msg = "Save this URL:";
        this.setState({ msg: msg, createdUrl: url });
      }
      this.setState({ status: "idle" });
    }
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleShowModal = (
    comp = this.state.modalComp,
    data = this.state.modalData,
    reset = false
  ) => {
    if (reset) {
      this.setState({ modalComp: "none" });
    }
    this.setState({ showModal: true, modalComp: comp, modalData: data });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleReloadGroup = (bool = false) => {
    this.setState({ reloadGroup: bool });
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
                marginTop: "13%"
              }}
            >
              <div className="gencontainer newgroupcont">
                <h1 style={{ textAlign: "center" }}>
                  Putt Putt Score Tracking
                </h1>
                <form
                  onSubmit={this.handleCreateGroup}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <TextInput
                    onChange={e => this.handleNameChange(e)}
                    type="text"
                    name="name"
                    label="Name"
                    autoComplete="off"
                    required={true}
                    value={this.state.name}
                  />
                  <br />
                  <button
                    type="submit"
                    className="raisedbut"
                    style={{ height: "40px" }}
                  >
                    Create Group
                  </button>
                </form>
                <br />
                <span>{this.state.msg}</span>
                <br />
                <a href={this.state.createdUrl}>{this.state.createdUrl}</a>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path="/:slug"
          render={props => (
            <React.Fragment>
              <div
                id="overlay"
                className={this.state.showModal ? "is-show" : ""}
              >
                <Cloak
                  isShow={this.state.showModal}
                  handleCloseModal={this.handleCloseModal}
                />
                <Modal
                  slug={props.match.params.slug}
                  isShow={this.state.showModal}
                  modalComp={this.state.modalComp}
                  modalData={this.state.modalData}
                  handleCloseModal={this.handleCloseModal}
                  apiBaseUrl={this.state.apiBaseUrl}
                  inner={this.state.modalComp}
                  reloadGroup={this.handleReloadGroup}
                />
              </div>
              <Group
                {...props}
                apiBaseUrl={this.state.apiBaseUrl}
                handleCloseModal={this.handleCloseModal}
                handleShowModal={this.handleShowModal}
                shouldReloadGroup={this.state.reloadGroup}
                reloadGroup={this.handleReloadGroup}
              />
            </React.Fragment>
          )}
        />
      </Switch>
    );
  }
}

export default App;
