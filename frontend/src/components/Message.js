import React from "react";

const Message = props => {
  const currentUser = props.currentUser === props.username ? "Me" : null;
  return (
    <div className="message" style={currentUser ? {border:0,justifyItems:"center",color:"#FFC42D",boxShadow:"0.5px 0.8px 5px rgba(255, 196, 45, 0.4)"} : {}}>
      <div className="message-username"
        style={currentUser?{fontSize:16, color:"#FFC42D" }:{}}
      >
        {currentUser || props.username}</div>
      <div
        className="message-text"
        >
        {props.text}
      </div>
    </div>
  );
};

export { Message };
