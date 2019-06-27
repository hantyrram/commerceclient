import React, { Component } from 'react';
import Logout from '../features/Logout';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';

const styles = {
  // display:"flex",
  // flexDirection:"row",
  // justifyContent:"space-between",
  // maxHeight: "7%",
  padding: "2px 20px 2px 20px",
  // backgroundColor:"rgb(34, 34, 34)",
  color: "#d7d7d7",
  alignItems: "baseline",
  display: "flex",
  justifyContent:"space-between"

}
export default (props)=>{
  return (
   <div style={styles}> 
     <div className="image-container" style={{maxHeight:"100%",display:"inline-block"}}><img src="hantyr_icon.svg" alt="Logo" style={{maxHeight:"inherit",width:"auto",marginRight:"2em"}}/></div>
     <div style={{display:"inline-block"}}> 
      {/* <div id="greetings" style={{display:"inline-block",color:"#4a4646",fontWeight:"bold",marginRight:"2em"}}>Hello, {props.user.credential.username} !</div> */}
      <Chip 
       avatar={
         <Avatar> <FaceIcon /> </Avatar>
       }
       label={'Hello, ' + props.user.credential.username}
      />
      <Logout {...props}/>
     </div>
   </div>
 )
}