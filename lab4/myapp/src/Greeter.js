import PropTypes from 'prop-types';
import React,{Component} from 'react'

class Greeting extends Component{
    constructor(props){
        super(props)
        this.state = {
            date: new Date()
        };
        this.updateDate()

    }
    updateDate(){
        setInterval(()=>{
            this.setState((state,props)=>({date:new Date()}))
        },1000)
    }

    render(){
       return(
           <div>
             <p>Hello, {this.props.name}</p>
             <p>It  is {this.state.date.toLocaleTimeString()}</p>
           </div>
       )
   }
}

Greeting.propTypes = {
  name: PropTypes.string
};

export {Greeting}