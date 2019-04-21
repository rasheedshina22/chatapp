import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props){
        super(props)
        console.log(this.props.roomList)
    }

    switchRoom(roomName){
      this.props.switchRoom(roomName)
    }

    render () {
      const selectedRoom = this.props.selectedRoom
        return (
            <div className="rooms-list">
              <ul>
                <h3>Available Rooms</h3>
                
              {this.props.roomList.map((roomName, index)=>{
                  const active = roomName === selectedRoom ? "active" : ""
                  //selected room 
                  return(
                     <li key={index} className= {"room" + active}>
                       <a href={`# ${roomName}`}
                          onClick={()=>this.switchRoom(roomName)} > # {roomName}</a>
                     </li>
                     )
              })}
              </ul>
            </div>
        )
    }
}
 
export {RoomList};