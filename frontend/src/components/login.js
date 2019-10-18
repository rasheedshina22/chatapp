import React, { Component } from "react";
import "./login.css";
import { Spinner,Button } from "../components"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",   //email
      password: "",
      error:"",
      password_confirmation_error:"",   //used for password match error
      confirm_password:"",
      registrationLinkActive: false,
      buttonDisabled: true
    };
  }

  componentDidUpdate(prevProps,prevState){
    if(this.props.error && this.props.error !== prevProps.error){
      /** checking the an error exists and  clearing the password field*/ 
      this.setState({ password:"" })
    }
    if(this.state.registrationLinkActive !== prevState.registrationLinkActive){
      /** handling toggle between pages*/ 
      this.setState({ password:"", confirm_password:"",password_confirmation_error:"" })
      this.props.clearErrorHandler()
    }
    const {password, confirm_password, username} = this.state
    if(this.state.registrationLinkActive){
      // handling password confirmation for signup
      if(username !== prevState.username || 
        confirm_password !== prevState.confirm_password ||
         password !== prevState.password ){
        /** checking state has changed*/
        if(username.length >5 && password === confirm_password && password.length >4){
          // values valid
          this.setState({buttonDisabled: false, password_confirmation_error:""})
        }else{
          if(password.length<4 && password !==""){
            this.setState({password_confirmation_error:"Password too short"})
          }else{
            this.setState({password_confirmation_error:""})
          }
          if(password !== confirm_password && password !== "" && confirm_password !== ""){
            this.setState({password_confirmation_error:"Passwords dont match"})
            }
          this.setState({buttonDisabled: true})
        }
      }
    }else{
      /** first confirming if state has changed*/ 
      if(password !== prevState.password || username !== prevState.username){
        if(password.length > 5 && username !== ""){
          this.setState({buttonDisabled:false})
        }else{
            // if fields not valid values button stays in disabled state
            this.setState({buttonDisabled:true})
          }
      }

    }
  }

  onChangeHandle(event){
    this.props.clearErrorHandler()
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitHandle(event) {
    event.preventDefault();
    const { username, password } = this.state
    if(this.state.registrationLinkActive){
      this.props.signup({username , password})
    }else{
      this.props.login({username , password})
    }
  }

  toggleLogin=()=>{
    this.setState({
      registrationLinkActive: !this.state.registrationLinkActive
    })
  }

  render() {
    let button = <Button disabled={this.state.buttonDisabled}>
                    Let me in &nbsp;&nbsp;
                    <i className="fa fa-key fa-1.8x" color="black"></i>
                  </Button>

    if(this.state.registrationLinkActive){
      button = (
        <React.Fragment>
          <input className="input"
            type="password" value={this.state.password_confirm}
            onChange={this.onChangeHandle.bind(this)} name="confirm_password"
            placeholder="Confirm Password" required
            />
          <Button disabled={this.state.buttonDisabled}>
            Create Account &nbsp;&nbsp;
            <i className="fa fa-user fa-1.8x" color="black"></i>
          </Button>
        </React.Fragment>
      )
    }
    if(this.props.loading){
      button = <Spinner />
    }
    return (
      <div className="login">
        <h1>Jibba•Jabba</h1>
        <form method="get" onSubmit={this.submitHandle.bind(this)}>
          <input
            className="input"
            type="email" value={this.state.username}
            onChange={this.onChangeHandle.bind(this)}  name="username"
            placeholder="Email"  required
          />
          <input
            className="input" type="password"
            value={this.state.password} onChange={this.onChangeHandle.bind(this)}
            name="password" placeholder="Password"
            required
          />
          {button}
          <span className="error">{this.state.password_confirmation_error}</span>
          <span className="error">{this.props.error}</span>
        </form>
        <small onClick={this.toggleLogin} >{this.state.registrationLinkActive ? "Returning User": "Create New Account ?"}</small>
      </div>
    );
  }
}


export { Login };
