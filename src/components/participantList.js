import React, { Component } from "react";

class ParticipantList extends Component {
  render() {
    return (
      <div className="gencontainer participantlist">
        {this.props.isLoaded ? (
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

        {this.props.participants.length > 0 ? (
          this.props.participants.map((part, index) => (
            <h3 key={index}>{part}</h3>
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

export default ParticipantList;
