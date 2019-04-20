import React, {Component} from 'react';
import {Greeting} from './Greeter'
import {Example} from './Hooks';

import {BrowserRouter,Router} from 'react-router-dom';

class App extends Component{
    render(){
        return(<React.Fragment>
            <Greeting name={"hie"}/>
            <Example />
            </React.Fragment>
        )
    }
}

export {App}
