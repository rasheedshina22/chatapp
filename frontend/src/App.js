import React, { Component } from "react";
import axios from "axios";
import {
  RoomList,
  MessageList,
  NewRoomForm,
  SendMessageForm,
  Login
} from "./components";

import Toolbar from "./navigation/toolbar";
import SideDrawer from "./navigation/SideDrawer";

import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      roomList: [],
      roomName: null,
      username: null,
      error: "",
      loading: false,
      showSideBar: false
    };
    this.serverUrl = process.env.NODE_ENV !== "production" ? "http://localhost:3030/" : "/"; //used to set port either to 3030 or /
    this.sendMessageHandle = this.sendMessage.bind(this);
    this.addRoomHandle = this.addRoom.bind(this);
    this.switchRoomHandle = this.switchRoom.bind(this);
  }

  componentDidMount() {
    //setting up socket
    this.socket = openSocket.connect(this.serverUrl); //when running locally connect to localhost:3030
    this.socket.on("new_message", data => {
      this.updateMessages(data);
    });
    this.socket.on("initialize", data => {
      // initializing the app state
      this.setState({
        roomList: data.rooms,
        roomName: data.currentRoom,
        messages: data.messages
      });
    });
    this.socket.on("createRoom", data => {
      this.updateRooms(data.rooms);
    });

    this.socket.on("switchRoom", data => {
      this.setState({ roomName: data.roomName, messages: data.messages });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.username && this.state.username !== prevState.username) {
      this.socket.emit("username", { username: this.state.username });
    }
  }

  updateMessages = data => {
    //called when new message received
    let msgData = [];
    msgData = this.state.messages;
    msgData.push(data);
    this.setState({ messages: msgData });
  };

  switchRoom(newRoom) {
    this.setState({ roomName: newRoom, messages: [] });
    this.socket.emit("switchRoom", { roomName: newRoom });
  }

  updateRooms(rooms) {
    this.setState({ roomList: rooms });
  }

  sendMessage(msg) {
    //handle to send message
    //message sent to server and then handled by updateMessages()
    this.socket.emit("new_message", { message: msg });
  }

  addRoom(newRoom) {
    //adds room through new room form
    const rooms = [...this.state.roomList];
    rooms.push(newRoom);
    this.setState({
      roomList: rooms
    });
    this.socket.emit("createRoom", { roomName: newRoom });
  }

  userLoginHandle = ({ username, password }) => {
    //used to login the user
    this.setState({ loading: true, error: "" });
    axios.post(this.serverUrl+"login", { password, username })
      .then(response => {
        if (response.status === 200) {
          // auth success
          this.setState({
            error: "",
            username: response.data.username
          });
        } else if(response.status === 201) {
          // auth fail=> incorrect password
          this.setState({ error: "Oops, not what we expected" });
        }else if(response.status === 202){
          this.setState({ error: "User not found" });
        }else{
          this.setState({error:"Something went wrong"})
        }
      })
      .catch(error => {
        this.setState({ username: null,
          error: "something went wrong"
        })
      }).finally(()=>this.setState({loading: false})
          // final block stops the spinner on promise rejection or fulfillment
      )
  }

  userSignupHandle=({username,password})=>{
    /***creates new user in db */
    this.setState({loading:true})
    axios.post(this.serverUrl + "signup",{username,password})
      .then(response=>{
        if (response.status === 200) {
          // auth success
          this.setState({
            error: "",
            username: response.data.username
          });
        } else if(response.status === 201) {
          // signup fail=> email exists
          this.setState({ error: "User already exists" });
        }else{
          this.setState({error:"Something went wrong"})
        }
      }).catch(error=>{
        this.setState({ username: null,
          error: "something went wrong"
        })
      }).finally(()=>{
        this.setState({loading: false})
      })
    
  }

  logout = () => {
    this.setState({
      messages: [],
      roomList: [],
      roomName: null,
      username: null,
      error: ""
    });
  };

  showSideBar = () => {
    this.setState({
      showSideBar: true
    });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideBar: !prevState.showSideBar };
    });
  };

  clearErrorHandler = () => {
    this.setState({ error: "", loading: false });
  };

  render() {
    if (this.state.username) {
      return (
        <Login loading={this.state.loading} signup={this.userSignupHandle}
           error={this.state.error} login={this.userLoginHandle} 
           clearErrorHandler={this.clearErrorHandler}
        />
      );
    }
    return (
      <div className="app">
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          logout={this.logout}
        />
        <SideDrawer
          visible={this.state.showSideBar}
          toggleSideDrawer={this.sideDrawerToggleHandler}
          logout={this.logout}
        />
        <div className="main-area">
          <section className="side-section">
            <RoomList
              switchRoom={this.switchRoomHandle}
              selectedRoom={this.state.roomName}
              roomList={this.state.roomList}
            />
            <NewRoomForm addRoom={this.addRoomHandle} />
          </section>
          <main className="main-section">
            <MessageList
              messageData={this.state.messages}
              currentUser={this.state.username}
            />
            <SendMessageForm sendMessage={this.sendMessageHandle} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
