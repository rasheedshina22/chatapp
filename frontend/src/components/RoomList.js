import React, { Component } from "react";

class RoomList extends Component {
  switchRoom(roomName) {
  this.props.switchRoom(roomName);
  }

  componentDidMount(){

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
    <h3>Rooms</h3>
    <ul>
      {this.props.roomList.map((roomName, index) => {
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
