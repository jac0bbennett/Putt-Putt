import React, { Component } from "react";
import ago from "s-ago";
import { handleGetWinner } from "./resultItem";
import { deleteRequest } from "../utils/requests";

class FullResult extends Component {
  state = {
    msg: ""
  };

  handleDeleteResult = async () => {
    this.setState({ msg: "deleting... " });
    const req = await deleteRequest(
      this.props.apiBaseUrl +
        "deleteresult?slug=" +
        this.props.slug +
        "&timestamp=" +
        this.props.modalData.result.createdAt
    );
    if (req.error) {
      alert(req.error);
      this.setState({ msg: "Error!" });
    } else {
      this.props.handleCloseModal();
      this.props.reloadGroup(true);
      this.setState({ msg: "Deleted!" });
    }
  };

  render() {
    const modalData = this.props.modalData;
    return (
      <div style={{ width: "700px" }}>
        <span className="timestamp">
          {ago(new Date(modalData.result.createdAt))}
        </span>
        <h2 style={{ width: "100%", textAlign: "center" }}>Full Result</h2>
        <h3>
          Winner:{" "}
          {handleGetWinner(modalData.result, modalData.participants).name}
        </h3>
        <h3>
          <b>Scores</b>
        </h3>
        <hr />
        {modalData.result.scores.map((result, index) =>
          result !== "" ? (
            <h3 key={index}>
              {modalData.participants[index]}: {result}
            </h3>
          ) : (
            ""
          )
        )}
        <br />
        <span className="floatright">
          <span className="msg">{this.state.msg}</span>
          <button className="flatbut" onClick={this.handleDeleteResult}>
            Delete
          </button>
        </span>
      </div>
    );
  }
}

export default FullResult;
