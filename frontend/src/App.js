import React, { Component } from 'react';

import {RoomList,MessageList,NewRoomForm,SendMessageForm} from './components'
import openSocket from 'socket.io-client';

class App extends Component {
    state ={
        messages:[],
        roomList:["main room"]
    }
    constructor(props){
        super(props)
        this.sendMessageHandle = this.sendMessage.bind(this)
        this.addRoomHandle = this.addRoom.bind(this)
    }

    componentDidMount(){
        //setting up socket
        this.socket = openSocket.connect("localhost:3030")
        this.socket.on("connect",()=>console.log("connected"))
        this.socket.on("new_message",(data)=>{
            this.updateMessages(data)
        })      
    }

    updateMessages=(data)=>{
        //called when new message received
        let msgData = [];
         msgData = this.state.messages
         msgData.push({username:data.username,
            text:data.message
        })
        this.setState({messages:msgData})
    }

    sendMessage(msg){
        //handle to send message
        this.socket.emit("new_message",{message:msg})
    }

    addRoom(newRoom){
        //adds room through new room form
        const rooms = [...this.state.roomList]
        rooms.push(newRoom)
        this.setState({
            roomList:rooms
        })
    }

    render() {
    return (
        <div className="app">
            <RoomList roomList={this.state.roomList}/>
            <MessageList messageData={this.state.messages}/>
            <SendMessageForm sendMessage={this.sendMessageHandle}/>
            <NewRoomForm addRoom={this.addRoomHandle}/>
        </div>
    );
}
}

export default App;
