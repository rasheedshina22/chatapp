import React from 'react';

const Message =(props)=>{
      const currentUser = props.currentUser === props.username ? "Me" : null;
         return (
            <div className="message" style={[{paddingBottom:20},currentUser ? {paddingLeft: 25}: {}]}>
              <div className="message-username">
                 {currentUser || props.username}
              </div>
              <div className="message-text" style={currentUser ? {backgroundColor:"#B4B7BA"}: {}}>
                 {props.text}
              </div>
             </div>
           )
       
}
 
export {Message};