import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Login from '../features/auth/Login';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import './Login.css';
export default (props)=>{
   //ok where at /auth/login
   //let's check if there is a U_SID cookie
   const {getAppState, dispatch} = useAppState();
   const { identity,lastAction } = getAppState();
   const authenticate = useApiRequest("AUTH$AUTHENTICATE_EXEC",dispatch);   

   let U_SID;

   if(document.cookie){
      U_SID = document.cookie.split(';').find(c=>{
         return c.trim().split('=')[0] === 'U_SID';
      });
   }

   useEffect(()=>{//has session id try to authenticate
      if(!identity && U_SID && !lastAction.type.includes('AUTH$AUTHENTICATE')){
         authenticate();
      }
   },[]);

   if(identity){
      return <Redirect to="/" />
   }

   return(
      <div id="page-login">
         <Login {...props} />
      </div>
   )
}
