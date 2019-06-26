import React, { useState, useEffect } from 'react';
import { subscribe } from '../event';

export default (props)=>{

 const [text,setText] = useState(null);

 const [loc,setLoc] = useState(window.location.pathname);
 //if state location does ont e
 subscribe((payload)=>{
  if(payload.type === 'message' || payload.type === 'error'){
   setText(payload.message || payload.error);
   setLoc(window.location.pathname);
   return;
  }
 });

 useEffect(()=>{
  if(loc !== window.location.pathname){
   setText(null); // when location changes
  }
 });

 return(
  text  ?JSON.stringify(text): null
 )
}