import React from "react";

const Message = props => {
  const currentUser = props.currentUser === props.username ? "Me" : null;
  return (
    <div className="message" style={currentUser?{marginLeft:"50px"}:{}}>
      <div className="message-username"
        // style={currentUser ? {borderRight:"2px solid #FFC42D"}:{}}
        >
        {currentUser || props.username}</div>
      <div className="message-text" >
        {props.text}
      </div>
    </div>
  );
};

export { Message };
