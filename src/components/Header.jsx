import React, { Component } from 'react';
import Logout from '../features/Logout';

const styles = {
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between",
  // maxHeight: "7%",
  padding: "2px 20px 2px 20px",
  // backgroundColor:"rgb(34, 34, 34)",
  color: "#d7d7d7",
  alignItems: "baseline"
}
export default (props)=>{
  return (
   <div style={styles}> 
     <div className="image-container" style={{maxHeight:"100%"}}><img src="hantyr_icon.svg" alt="Logo" style={{maxHeight:"inherit",width:"auto",marginRight:"2em"}}/></div>
     <div>
      <div id="greetings" style={{display:"inline-block",color:"#4a4646",fontWeight:"bold",marginRight:"2em"}}>Hello, {props.user.credential.username} !</div>
      <Logout {...props}/>
     </div>
   </div>
 )
}