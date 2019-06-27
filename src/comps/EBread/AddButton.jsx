import React from 'react';
import PlusGlyphicon from '@material-ui/icons/AddBox';
import {Link} from 'react-router-dom';

export default ({adderPath,text})=>{
 return(
  <div style={{display:"inline",textAlign:"center",fontSize:".7em"}}>
   <Link to={adderPath} style={{color:"white",display:"inline",verticalAlign:"center",textDecoration:"none"}}>
    <PlusGlyphicon style={{color:"white"}}/>
    <div>{text}</div>
   </Link>
  </div>
 )
}