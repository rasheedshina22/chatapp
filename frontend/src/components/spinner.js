import React from 'react';
const spinnerImage = require("../assets/imgs/spinner.gif")

const Spinner=()=>(
   <span style={{display: "flex", width:"100%", justifyContent:"center"}}><img src={spinnerImage} className="spinner" alt="spinner"/></span>
)

export { Spinner }