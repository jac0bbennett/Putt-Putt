import React, { Component } from "react";
import { getRequest } from "../utils/requests";

class ParticipantList extends Component {
  state = { participants: [], isLoaded: false };

  componentDidMount = async () => {
    this.updateList();
  };

  updateList = async () => {
    const req = await getRequest(
      this.props.apiBaseUrl + "getgroup?slug=" + this.props.slug
    );
    if (req.error) {
      alert(req.error);
    } else {
      let parts = [];
      if ("participants" in req[this.props.slug]) {
        parts = req[this.props.slug].participants;
      }
      this.setState({
        participants: parts,
        isLoaded: true
      });
    }
  };

  componentDidUpdate = () => {
    if (this.props.refreshView === "participants") {
      this.updateList();
      this.props.handleCloseModal(null);
    }
  };

  render() {
    return (
      <div className="gencontainer participantlist">
        {this.state.isLoaded ? (
          <button
            className="flatbut floatright"
            style={{ marginTop: "20px" }}
            onClick={() => this.props.handleShowModal("newparticipantform")}
          >
            <i className="material-icons" style={{ fontSize: "12pt" }}>
              add
            </i>
            <span className="icolab">New</span>
          </button>
        ) : null}
        <h1>Participants</h1>

        {this.state.participants.length > 0 ? (
          this.state.participants.map((part, index) => (
            <h3 key={index}>{part}</h3>
          ))
        ) : this.state.isLoaded ? (
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

export default ParticipantList;
