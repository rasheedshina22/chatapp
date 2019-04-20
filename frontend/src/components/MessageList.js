import React, { Component } from 'react';
import {Message} from '../components'

class MessageList extends Component {
    constructor(props){
      super(props)
      this.messages = this.props.messageData
    }
    render() { 
        return (
          <div className="message-list">
            {this.messages.map((message,index)=>{
              return (
                <Message key={index} 
                    text={message.text}
                    username={message.username}
                 />
 )
            })}
          </div> );
    }
}
 
export { MessageList};