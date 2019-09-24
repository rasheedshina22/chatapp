import React from "react";

const Message = props => {
  const currentUser = props.currentUser === props.username ? "Me" : null;
  return (
    <div className="message" style={currentUser ? {border:0,justifyItems:"center",color:"#FFC42D",background:"#FFC42D",borderRight: "5px solid #fffffa", marginRight:15} : {}}>
      <div className="message-username"
        style={currentUser?{fontSize:16, color:"#002343" }:{}}
      >
        {currentUser || props.username}</div>
      <div
        className="message-text"
        style={currentUser?{color:"#002343"}:{}}
        >
        {props.text}
      </div>
    </div>
  );
};

export { Message };
