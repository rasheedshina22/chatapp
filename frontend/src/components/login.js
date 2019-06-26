import React, { Component } from "react";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChangeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitHandle(event) {
    event.preventDefault();
    // references App.js Function
    const { username, password } = this.state
    this.props.login({username , password});
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form method="get" onSubmit={this.submitHandle.bind(this)}>
          <input
            className="input"
            type="text"
            value={this.state.username}
            onChange={this.onChangeHandle.bind(this)}
            name="username"
            placeholder="Username"
            required="required"
          />
          <input
            className="input"
            type="password"
            value={this.state.password}
            onChange={this.onChangeHandle.bind(this)}
            name="password"
            placeholder="Password"
            required="required"
          />
          <button type="submit" className="btn btn-primary btn-block btn-large" >
            Let me in.
          </button>
        </form>
        <small>New accounts will be automatically created</small>
      </div>
    );
  }
}

export { Login };
