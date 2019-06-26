import React, {useState,useEffect} from 'react';
import {PermissionCreate} from './apiCallers';
import {subscribe} from './event';

export function AppTest(props){

 const [message,setMessage] = useState(null);

 subscribe((event)=>{
  if(event.type === 'message'){
   setMessage(event.message);
  }
 });

 const handleClick = (e)=>{
  PermissionCreate({test:1});
 }

 return(
  <div>
   {message}
   <button onClick={handleClick}>Create Permission</button>
  </div>
 )
}



























