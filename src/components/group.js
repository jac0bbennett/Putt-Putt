import React, { Component } from "react";
import { getRequest } from "../utils/requests";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { slug: props.match.params.slug, group: {} };
  }

  componentDidMount = async () => {
    const req = await getRequest(
      this.props.apiBaseUrl + "getgroup?slug=" + this.state.slug
    );
    if (req.error) {
      alert(req.error);
    } else {
      this.setState({ group: req[this.state.slug] });
    }
  };

  render() {
    return <div>{this.state.group.name}</div>;
  }
}

export default Group;
