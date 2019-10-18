import React from "react";
import { Message } from "../components";

class MessageList extends React.Component{
  constructor(props){
    super(props)
    this.element = React.createRef()
  }
  componentDidMount(){
    this.scrollToBottom()
  }

  componentDidUpdate(){
      this.scrollToBottom()
  }
  scrollToBottom=()=>{
    this.element.scrollIntoView({behavior: "smooth", block:"end"})
  }
  render(){
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
        <div ref={el=>{this.element = el}}></div>
      </div>
    )
  }
}

export { MessageList };
