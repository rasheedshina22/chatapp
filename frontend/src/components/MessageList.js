import React from "react";
import { Message } from "../components";

const MessageList =(props)=> {
    return (
      <div className="message-list">
        {props.messageData.map((message, index) => {
          return (
            <Message
              key={index}
              text={message.chat}
              username={message.name}
              currentUser={props.currentUser}
            />
          );
        })}
      </div>
    )
}

export { MessageList };
