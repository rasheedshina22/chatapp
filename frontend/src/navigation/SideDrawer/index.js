import React from 'react';
// import Logo from "../../components/Logo"
import NavigationItems from "../navigationItems"
import classes from "./SideDrawer.module.css"
import Backdrop from "../../Backdrop"

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(props.visible){
    attachedClasses =[classes.SideDrawer,classes.Open]
  }
  return (
    <React.Fragment>
      <Backdrop show={props.visible} click={props.toggleSideDrawer}/>
      <div className={attachedClasses.join(" ") }  onClick={props.toggleSideDrawer}>
        <div className={classes.Logo}>
          {/* <Logo /> */}
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} logout={props.logout}/>
        </nav>
      </div>
    </React.Fragment>

   );
}
 
export default sideDrawer;