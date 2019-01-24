import React, { Component } from "react";
import { getRequest } from "../utils/requests";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { slug: props.match.params.slug, id: "" };
  }

  componentDidMount = async () => {
    const req = await getRequest(
      this.props.apiBaseUrl + "getgroup?slug=" + this.state.slug
    );
    if (req.error) {
      alert(req.error);
    } else {
      this.setState({ id: Object.keys(req)[0] });
    }
  };

  render() {
    return <div>{this.state.id}</div>;
  }
}

export default Group;
