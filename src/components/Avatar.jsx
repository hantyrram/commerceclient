

import React, { useContext, useState, useEffect, useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   card: {
     maxWidth: 200,
   },
   media: {
     height: 200,
   },
 });

/**
 * @param {String} src The url of the image.
 * @param {String} inputName The name that will be used on the file input element.
 * @param {function} onPhotoChange The change handler of the file input element.
 */
export default ({src,inputName,photoChangeHandler})=>{

   let employeeAvatarOverlayRef = useRef({});
   let classes = useStyles();

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

   const changeHandler = (e)=>{

   }
   return(
      <div id="htcomp-employee-avatar"style={{position:"relative"}}>
        <label id="employee-avatar">
            <img src={src} alt="avatar" height="150" width="150" 
            style={{cursor:"pointer",position:"absolute",left:0,top:0,opacity:1}}/>
            <img src={src} alt="avatar" height="150" width="150" 
            style={{cursor:"pointer"}}/>
         </label>
         <label ref={employeeAvatarOverlayRef} id="employee-avatar-overlay" style={{
            justifyContent: "center",
            display:"flex",
            alignItems: "center",
            height: "150px",
            width: "150px",
            cursor: "pointer",
            position: "absolute",
            left:0,
            top:0,
            opacity: 0,
            // zIndex: 3,
            backgroundColor: "rgba(210,205,205,.53)"

         }} >
            <input type="file" name="employeeAvatar" hidden={true} onChange={photoChangeHandler}/>
            <b>Change Photo</b>
         </label>
           
      </div> 
   )
}