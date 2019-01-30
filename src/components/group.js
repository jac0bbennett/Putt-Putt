import React, { Component } from "react";
import { getRequest } from "../utils/requests";
import ParticipantList from "./participantList";
import ResultList from "./resultList";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { slug: props.match.params.slug, group: {}, isLoaded: false };
  }

  componentDidMount = async () => {
    const req = await getRequest(
      this.props.apiBaseUrl + "getgroup?slug=" + this.state.slug
    );
    if (req.error) {
      alert(req.error);
    } else {
      this.setState({ group: req[this.state.slug], isLoaded: true });
    }
  };

  render() {
    console.log(this.props.refreshView);
    return (
      <React.Fragment>
        {this.state.isLoaded ? (
          <div className="wrapper">
            <h2
              style={{ textAlign: "center", width: "100%", color: "#43a047" }}
            >
              {this.state.group.name}
            </h2>

            <ResultList
              handleCloseModal={this.props.handleCloseModal}
              handleShowModal={this.props.handleShowModal}
            />
            <ParticipantList
              handleCloseModal={this.props.handleCloseModal}
              handleShowModal={this.props.handleShowModal}
              apiBaseUrl={this.props.apiBaseUrl}
              slug={this.state.slug}
              refreshView={this.props.refreshView}
            />
          </div>
        ) : (
          <div style={{ marginTop: "10%" }} className="loadingicon" />
        )}
      </React.Fragment>
    );
  }
}

export default Group;
