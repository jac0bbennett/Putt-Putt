import React, { Component } from "react";
import TextInput from "../txtInput";
import { postRequest } from "../../utils/requests";
import SubmitButton from "../submitButton";

class NewResultForm extends Component {
  constructor(props) {
    super(props);
    let form = {};
    for (let i = 0; i < props.modalData.participants.length; i++) {
      form[i] = "";
    }

    this.state = {
      form: form,
      participants: props.modalData.participants,
      msg: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    let result = [];

    for (let i = 0; i < this.state.participants.length; i++) {
      result.push(this.state.form[i]);
    }

    result = JSON.stringify(result);

    this.setState({
      msg: <div style={{ marginLeft: "15px" }} className="loadingicon" />
    });

    const req = await postRequest(
      this.props.apiBaseUrl +
        "newresult?slug=" +
        this.props.slug +
        "&result=" +
        result
    );

    if (req.error) {
      const msg = req.error;
      this.setState({ msg });
    } else {
      let form = {};
      for (let i = 0; i < this.state.participants.length; i++) {
        form[i] = "";
      }
      this.setState({ msg: "", form: form });
      this.props.handleCloseModal("results");
      this.props.reloadGroup(true);
    }
  };

  handleChange = (event, index) => {
    let form = { ...this.state.form };
    if (event.target.value !== "") {
      form[index] = Number.parseFloat(event.target.value);
    } else {
      form[index] = "";
    }
    this.setState({ form, msg: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <h2>New Result</h2>
        <span style={{ fontSize: "10pt" }}>
          Leave blank if not participating!
        </span>

        {this.state.participants.map((part, index) => (
          <React.Fragment key={index}>
            <TextInput
              name="name"
              type="text"
              label={part}
              value={this.state.form[index]}
              onChange={e => this.handleChange(e, index)}
              required={false}
            />
            <br />
          </React.Fragment>
        ))}
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

export default NewResultForm;
