import React, { Component } from 'react';
import {BrowserRouter, Link} from 'react-router-dom'
import {Route, Switch} from 'react-router'

import {Contact, About, Error} from './components'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          {/*<div>*/}
            {/*<ul>*/}
                {/*<li><Link to={'/'}>Home</Link></li>*/}
                {/*<li><Link to={'/other'}>Other</Link></li>*/}
                {/*<li><Link to={'/about'}>About</Link></li>*/}
                {/*<li><Link to={'/contact'}>Contact us</Link></li>*/}

            {/*</ul>*/}
          {/*</div>*/}
        {/*<Route>*/}
            {/*<Route path={"/"} component={Home}/>*/}
            {/*<Route path={"/other"} component={newRoute}/>*/}
            {/*<Route path={"/about"} component={About}/>*/}
            {/*<Route path={"/contact"} component={Contact}/>*/}


        {/*</Route>*/}

          <Switch>
            <Route path={"/"} component={Home}/>
            <Route path={"/about"} component={About}/>
            <Route path={"/contact"} component={Contact}/>

          </Switch>
          <ul>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/about"}>About</Link></li>
              <li><Link to={"/contact"}>Contact Us</Link></li>

          </ul>
      </BrowserRouter>
    );
  }
}

const newRoute =()=>{
    return(
      <div>
        <p>New Route</p>
      </div>
    )
};

class Home extends Component{
    render(){
        return(
            <p>Home</p>
        )
    }
}

export default App;
