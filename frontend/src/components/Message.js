import React from "react";

const Message = props => {
  const currentUser = props.currentUser === props.username ? "Me" : null;
  return (
    <div className="message" style={currentUser?{marginLeft:"30px"}:{}}>
      <div className="message-username" style={{fontWeight:"bold",fontSize:16}}>
        {currentUser || props.username}</div>
      <div className="message-text" >
        {props.text}
      </div>
    </div>
  );
};

export { Message };
