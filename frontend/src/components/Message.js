import React from "react";

const Message = props => {
  const currentUser = props.currentUser === props.username ? "Me" : null;
  return (
    <div className="message" style={currentUser ? { paddingLeft: 35 } : {}}>
      <div className="message-username">{currentUser || props.username}</div>
      <div
        className="message-text"
        style={currentUser ? { backgroundColor: "#e1e6e8" } : {}}
      >
        {props.text}
      </div>
    </div>
  );
};

export { Message };
