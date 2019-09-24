import React from "react";

const Message = props => {
  const currentUser = props.currentUser === props.username ? "Me" : null;
  return (
    <div className="message" style={currentUser?{marginLeft:"70px"}:{}}>
      <div className="message-username"
        style={currentUser ? { background:"#ccc", borderRight:"2px solid #FFC42D"}:{}}
        >
        {currentUser || props.username}</div>
      <div
        className="message-text">
        {props.text}
      </div>
    </div>
  );
};

export { Message };
