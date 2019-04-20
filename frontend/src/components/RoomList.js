import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props){
        super(props)
        console.log(this.props.roomList)
    }
    render () {
        return (
            <div className="rooms-list">
              <ul>
                <h3>Your Rooms</h3>
              {this.props.roomList.map((roomName, index)=>{
                  console.log(roomName)
                  return(
                     <li key={index} className="room">
                       <a href={`# ${roomName}`}> # {roomName}</a>
                     </li>
                     )
              })}
              </ul>
            </div>
        )
    }
}
 
export {RoomList};