import React, { Component } from "react";
import TextInput from "../txtInput";
import { postRequest } from "../../utils/requests";
import SubmitButton from "../submitButton";

class NewParticipantForm extends Component {
  state = {
    form: { name: "" },
    msg: ""
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      msg: <div style={{ marginLeft: "15px" }} className="loadingicon" />
    });

    const name = this.state.form.name;

    const req = await postRequest(
      this.props.apiBaseUrl +
        "newparticipant?slug=" +
        this.props.slug +
        "&name=" +
        name
    );

    if (req.error) {
      const msg = req.error;
      this.setState({ msg });
    } else {
      this.setState({ msg: "", form: { name: "" } });
      this.props.handleCloseModal();
      this.props.reloadGroup(true);
    }
  };

  handleChange = event => {
    let form = { ...this.state.form };
    form.name = event.target.value;
    this.setState({ form, msg: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <h2>New Participant</h2>
        <TextInput
          name="name"
          type="text"
          label="Name"
          value={this.state.form.name}
          onChange={this.handleChange}
          required={true}
        />
        <br />
        <br />
        <SubmitButton>Submit</SubmitButton>
        <br />
        <span>{this.state.msg}</span>
        <br />
        <br />
      </form>
    );
  }
}

export default NewParticipantForm;
