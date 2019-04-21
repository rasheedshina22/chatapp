import React, { Component } from 'react';

class SendMessageForm extends Component {
    constructor(props){
        super(props)

        this.state={
            message: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange=(input)=>{
      //handles the state for message input field
      this.setState({message:input.target.value})

    }

    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({message:''})
    }

    render() {
        return (
            <form className="send-message-form"
                  onSubmit={this.handleSubmit}
            >
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type message here and hit ENTER"
                    type="text" />
            </form>
        )
    }
}
 
export {SendMessageForm};