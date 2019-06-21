import React, { Component } from "react";
import { Message } from "../components";

class MessageList extends Component {
  constructor(props) {
    super(props);
    console.log("message List");
  }

  render() {
    return (
      <div className="message-list">
        {this.props.messageData.map((message, index) => {
          return (
            <Message
              key={index}
              text={message.chat}
              username={message.name}
              currentUser={this.props.currentUser}
            />
          );
        })}
      </div>
    );
  }
}

export { MessageList };
