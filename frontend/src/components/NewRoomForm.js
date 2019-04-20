import React, { Component } from 'react';

class NewRoomForm extends Component {
   constructor(){
     super()
     this.submitHandle = this.submitHandle.bind(this);
     this.changeHandle = this.changeHandle.bind(this)
   } 
   state = {
     roomName:""
   }

    submitHandle=(event)=>{
      //handles the form submit action
      event.preventDefault()
      this.props.addRoom(this.state.roomName)
      this.setState({roomName:''})
    }

    changeHandle=(input)=>{
      //updates the state when text enter in form
      this.setState({
        roomName: input.target.value
      })
      // console.log(this.state.roomName)
    }

    render() { 
        return (
          <div className="new-room-form">
            <form onSubmit={this.submitHandle}>
              <input
                  onChange={this.changeHandle}
                  value={this.state.roomName}
                  type="text" 
                  placeholder="NewRoomForm" 
                  required />
              <button id="create-room-btn" type="submit">+</button>
            </form>
          </div>
          );
    }
}
 
export {NewRoomForm};