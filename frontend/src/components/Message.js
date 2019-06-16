import React from 'react';

const Message =(props)=>{
      const currentUser = props.currentUser;
         return (
            <div className="message" style={currentUser === props.username ? {paddingLeft: 20}: {}}>
              <div className="message-username">
                 {props.username}
              </div>
              <div className="message-text" style={currentUser === props.username ? {backgroundColor:"#B4B7BA"}: {}}>
                 {props.text}
              </div>
             </div>
           )
       
}
 
export {Message};