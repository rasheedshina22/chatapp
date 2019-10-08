import React, { Component } from "react";
import "./login.css";
import { Spinner } from "../components/spinner"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password_confirm:"",
      registrationLinkActive: false
    };
  }

  onChangeHandle(event){
    this.props.clearErrorHandler()
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitHandle(event) {
    event.preventDefault();
    // references App.js Function
    const { username, password } = this.state
    this.props.login({username , password})
  }

  toggleLogin=()=>{
    this.setState({
      registrationLinkActive: !this.state.registrationLinkActive
    })
  }

  render() {
    let button = <button type="submit" className="btn btn-primary btn-block btn-large" >
                    {this.state.registrationLinkActive ? "Create Account" :"Let me in"} <i class="fa fa-key fa-1.8x" color="black"></i>
                  </button>

    let registrationLink = this.state.registrationLinkActive ? ( <input className="input"
        type="password" value={this.state.password_confirm}
        onChange={this.onChangeHandle.bind(this)} name="confirm password"
        placeholder="Confirm Password" required
      />) : null

    if(this.props.loading){
      button = <Spinner />
    }
    return (
      <div className="login">
        <h1>Chat•R</h1>
        <form method="get" onSubmit={this.submitHandle.bind(this)}>
          <input
            className="input"
            type="email" value={this.state.username}
            onChange={this.onChangeHandle.bind(this)}  name="username"
            placeholder="Username"  required
          />
          <input
            className="input" type="password"
            value={this.state.password} onChange={this.onChangeHandle.bind(this)}
            name="password" placeholder="Password"
            required
          />
          {registrationLink}
          {button}
          <span className="error">{this.props.error}</span>
        </form>
        <small onClick={this.toggleLogin} >{this.state.registrationLinkActive ? "Returning User": "Create New Account ?"}</small>
      </div>
    );
  }
}

const styles ={
  createAccBtn:{
    color: "#FFC42D"
  }
}
export { Login };
