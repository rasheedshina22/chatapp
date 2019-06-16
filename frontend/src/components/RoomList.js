import React, { Component } from "react";

class RoomList extends Component {
  switchRoom(roomName) {
  this.props.switchRoom(roomName);
  }

  componentDidMount(){

  }

  renderElement(roomName, index){
    const active = roomName === this.props.selectedRoom ? { color: "#FFA011", fontSize:"1.2rem"} : {}
  return(
    <li key={index} className={"room "}>
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
    <ul>
      <h3 style={styles.headerStyle}>Available Rooms</h3>
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

const styles = {
  headerStyle: {
  fontSize: 22,
  color:"#cfddf4"
  }
};
