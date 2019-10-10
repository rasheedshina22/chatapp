import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem  from "./navigationItem"

const navigationItems = props => {
  const authenticatedRoutes = (          
    <React.Fragment>
      <NavigationItem link="#"><button >Switch Room</button></NavigationItem>
      <NavigationItem link="/"><button onClick={props.logout}>Logout &nbsp;&nbsp;<i className="fa fa-lock"></i></button></NavigationItem>
    </React.Fragment>
  )
  return (
    <ul className={classes.NavigationItems}>
      {/* <NavigationItem link="/"><a href="/">Home</a></NavigationItem> */}
      {
          // props.isAuthenticated? <NavigationItem link="/auth">Login</NavigationItem> : authenticatedRoutes
          authenticatedRoutes
      }
    </ul>
  )
}

export default navigationItems