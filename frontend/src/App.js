import React, { Component } from "react";

import {
  RoomList,
  MessageList,
  NewRoomForm,
  SendMessageForm
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
      process.env.NODE_ENV !== "production" ? "localhost:3030" : "/"; //used to set port either to 3030 or /
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
      this.updateRooms(data.rooms);
      this.setState({ 
        roomName: data.rooms[0],
        username: data.username,
        messages: data.messages
       }); //setting initial room
    });
    this.socket.on("createRoom", data => {
      this.updateRooms(data.rooms);
    });

    this.socket.on("switchRoom", data => {
      console.log("socket method", data.roomName);
      this.setState({ roomName: data.roomName });
    });
  }

  updateMessages = data => {
    //called when new message received
    let msgData = [];
    msgData = this.state.messages;
    msgData.push(data);
    this.setState({ messages: msgData });
  };

  switchRoom(newRoom) {
    console.log(`joining ${newRoom}`);
    this.setState({ roomName: newRoom, messageData: [] });
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

  render() {
    return (
      <div className="app">
        <RoomList
          switchRoom={this.switchRoomHandle}
          selectedRoom={this.state.roomName}
          roomList={this.state.roomList}
        />
        <MessageList
          messageData={this.state.messages}
          currentUser={this.state.username}
        />
        <SendMessageForm sendMessage={this.sendMessageHandle} />
        <NewRoomForm addRoom={this.addRoomHandle} />
      </div>
    );
  }
}

export default App;
