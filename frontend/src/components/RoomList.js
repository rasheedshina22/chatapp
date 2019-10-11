import React, { Component } from "react";

class RoomList extends Component {
  state ={
    roomList:[]
  }
  switchRoom(roomName) {
    this.props.switchRoom(roomName);
  }
  componentDidMount(){
    this.setState({
      roomList: this.props.roomList
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.roomList !== prevProps.roomList){
      this.setState({
        roomList: this.props.roomList
      })
    }
  }

  renderElement(roomName, index){
    const active = roomName === this.props.selectedRoom ? {color:"#FFC42D", fontWeight: 'bold',} : {}
  return(
    <li key={index} className={"room"}>
        <a
          style={active}
          href={`#${roomName}`}
          onClick={() => this.switchRoom(roomName)}
        >
          {" "}
           {` ${roomName}`}
        </a>
    </li>
  )
  }

  render() {
  return (
    <div className="rooms-list">
    <h3>Available Rooms</h3>
    <ul>
      {this.state.roomList.map((roomName, index) => {
      //selected room
      return (
        this.renderElement(roomName,index)
      );
      })}
    </ul>
    </div>
  );
  }
}

export { RoomList };
