import React from 'react';
import classes from "./NavigationItems.module.css"
import NavigationItem  from "./navigationItem"

const navigationItems = props => {
  const authenticatedRoutes = (          
    <React.Fragment>
      {/* <NavigationItem link="/">Orders</NavigationItem> */}
      <NavigationItem link="/"><button onClick={props.logout}>Logout</button></NavigationItem>
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