import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Login from '../features/auth/Login';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';

export default (props)=>{

   const {getAppState, dispatch} = useAppState();

   const authenticate = useApiRequest("AUTH$AUTHENTICATE_EXEC",dispatch);   

   let U_SID;

   if(document.cookie){
      U_SID = document.cookie.split(';').find(c=>{
         return c.trim().split('=')[0] === 'U_SID';
      });
   }

   useEffect(()=>{//has session id try to authenticate
      if(!getAppState().identity && U_SID){
         authenticate();
      }
   },[]);
   
   if(getAppState().identity){
      return <Redirect to={"/"} />
   }

   return(
      <div id="page-login">
         <Login />
      </div>
   )
}
