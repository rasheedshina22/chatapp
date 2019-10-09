import React from 'react';

const Button =(props)=>(
  <button type="submit" className="btn btn-primary btn-block btn-large" disabled={props.disabled}>
    {props.children}
  </button>
)

export {Button}