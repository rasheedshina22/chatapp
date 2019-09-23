import React, { Component } from "react";
import axios from "axios";
import {
  RoomList,
  MessageList,
  NewRoomForm,
  SendMessageForm,
  Login
} from "./components";

import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      roomList: [],
      roomName: null,
      username: null
    };
    this.environmentPort =
      process.env.NODE_ENV !== "production" ? "http://localhost:3030" : "/"; //used to set port either to 3030 or /
    this.sendMessageHandle = this.sendMessage.bind(this);
    this.addRoomHandle = this.addRoom.bind(this);
    this.switchRoomHandle = this.switchRoom.bind(this);
  }

  componentDidMount() {
    //setting up socket
      this.socket = openSocket.connect(this.environmentPort); //when running locally connect to localhost:3030
      this.socket.on("new_message", data => {
        this.updateMessages(data);
      });
      this.socket.on("initialize", data => {
        // this.updateRooms(data.rooms);
        this.setState({
          roomList:data.rooms,
          roomName: data.currentRoom,
          messages: data.messages
        }); //setting initial room
      });
      this.socket.on("createRoom", data => {
        this.updateRooms(data.rooms);
      });

      this.socket.on("switchRoom", data => {
        this.setState({ roomName: data.roomName, messages: data.messages });
      });

  }

  componentDidUpdate(){
    if(!this.state.username){
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

  userLogin({ username, password }) {
    //used to authenticate the user
    axios
      .post(this.environmentPort, { password, username })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            username: response.data.username
          });
        } else {
          this.setState({
            error: "something went wrong"
          });
        }
      })
      .catch(error => {
        this.setState({
          username: null,
          error: "something went wrong"
        });
      });
  }

  render() {
    if (!this.state.username) {
      return <Login login={this.userLogin.bind(this)} />;
    }
    return (
      <div className="app">
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
    );
  }
}

export default App;
