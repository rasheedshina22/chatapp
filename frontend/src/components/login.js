import React, { Component } from "react";
import "./login.css";
import {Spinner} from "../components/spinner"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  onChangeHandle(event) {
    this.props.clearErrorHandler()
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
    let button = <button type="submit" className="btn btn-primary btn-block btn-large" >
                    Let me in <i class="fa fa-key fa-1.8x" color="black"></i>
                  </button>
    if(this.props.loading){
      button = <Spinner />
    }
    return (
      <div className="login">
        <h1>ChatR</h1>
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
          {button}
          <span className="error">{this.props.error}</span>
        </form>
        <small>New accounts will be automatically created</small>
      </div>
    );
  }
}

export { Login };
