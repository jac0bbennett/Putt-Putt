import React, { Component } from "react";
import { getRequest } from "../utils/requests";
import ParticipantList from "./participantList";
import ResultList from "./resultList";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: props.match.params.slug,
      group: { results: [], participants: [] },
      isLoaded: false
    };
  }

  componentDidMount = async () => {
    this.handleUpdateGroup();
  };

  componentDidUpdate = () => {
    if (this.props.shouldReloadGroup) {
      this.handleUpdateGroup();
      this.props.reloadGroup(false);
    }
  };

  handleUpdateGroup = async () => {
    const req = await getRequest(
      this.props.apiBaseUrl + "getgroup?slug=" + this.state.slug
    );
    if (req.error) {
      alert(req.error);
    } else {
      let group = { ...req[this.state.slug] };
      if (!group.participants) {
        group.participants = [];
      }
      if (!group.results) {
        group.results = [];
      }
      this.setState({ group: group, isLoaded: true });

      document.title = this.state.group.name + " | Putt Putt";
    }
  };

  render() {
    return (
      <div className="wrapper">
        <h2 style={{ textAlign: "center", width: "100%", color: "#43a047" }}>
          {this.state.group.name}
        </h2>

        <ResultList
          handleCloseModal={this.props.handleCloseModal}
          handleShowModal={this.props.handleShowModal}
          participants={this.state.group.participants}
          results={this.state.group.results}
          isLoaded={this.state.isLoaded}
        />
        <ParticipantList
          handleCloseModal={this.props.handleCloseModal}
          handleShowModal={this.props.handleShowModal}
          participants={this.state.group.participants}
          results={this.state.group.results}
          isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default Group;
