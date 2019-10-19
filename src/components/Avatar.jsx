

import React, { useContext, useState, useEffect, useRef } from 'react';

export default ({imgURL,photoChangeHandler})=>{

   let employeeAvatarOverlayRef = useRef({});

   useEffect(()=>{
      if(employeeAvatarOverlayRef 
            && employeeAvatarOverlayRef.current && employeeAvatarOverlayRef.current.addEventListener){
         employeeAvatarOverlayRef.current.addEventListener('mouseover',function(e){
            e.currentTarget.style.opacity = 1;
         });
         employeeAvatarOverlayRef.current.addEventListener('mouseout',function(e){
            e.currentTarget.style.opacity = 0;
         });
      }
   }); 

   return(
      <div id="htcomp-employee-avatar" style={{position:"relative"}}>
         <label id="employee-avatar">
            <img src={imgURL} alt="avatar" height="200" width="200" 
            style={{cursor:"pointer",position:"absolute",left:0,top:0,opacity:1}}/>
         </label>
         <label ref={employeeAvatarOverlayRef} id="employee-avatar-overlay" style={{
            justifyContent: "center",
            display:"flex",
            alignItems: "center",
            height: "200px",
            width: "200px",
            cursor: "pointer",
            position: "absolute",
            left:0,
            top:0,
            opacity: 0,
            zIndex: 3,
            backgroundColor: "rgba(210,205,205,.53)"

         }} >
            <input type="file" name="employeeAvatar" hidden={true} onChange={photoChangeHandler}/>
            <b>Change Photo</b>
         </label>
      </div> 
   )
}