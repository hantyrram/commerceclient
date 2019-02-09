import React, { Component } from 'react';
import Login from '../features/Login';

const styles = {
  display:"flex",
  flexDirection: "column",
  justifyContent:"flex-start",
  alignItems:"center",
  height:"100vh",
  backgroundColor:"#f7f4fb"
}
export default (props)=>{
  return(
    <div id="page-login" className="page" style={styles}>
      <img src="hantyr_logo.png" alt="Logo" />
      <Login {...props}/>
    </div>
  )
}