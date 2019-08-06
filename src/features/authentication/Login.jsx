import React, { useState, useEffect } from 'react';
import Spinner from 'components/Spinner';
import EForm from 'components/EForm';
import credentialUiSchema from 'uischemas/credential';
import Button from '@material-ui/core/Button';
import Message from 'components/Message';
import {
   authenticate as authentication,
   login
} from 'apis';

export default (props)=>{

   let U_SID;
    if(document.cookie){
      U_SID = document.cookie.split(';').find(c=>{
        return c.trim().split('=')[0] === 'U_SID';
      });
    }

   delete credentialUiSchema['createdBy'];
   delete credentialUiSchema['createdOn'];
   delete credentialUiSchema['_id'];
   const [credential,setCredential] = useState(null);
   const [sessionCookie,setSessionCookie] = useState(U_SID);

   const loginClickHandler = entity => event => {
      (async ()=>{
         try {
            let artifact = await login(credential);
            if(artifact.status === 'ok'){
               setCredential(artifact.data.entity);
               return;
            }
            setSessionCookie(null);
         } catch (error) {
            setSessionCookie(null);
         }
      })()
   }

   const authenticate = ()=>{
      if(sessionCookie){
         (async ()=>{
            try {
               let artifact = await authentication();
               if(artifact.status === 'ok'){
                  setCredential(artifact.data.entity);
                  return;
               }
               setSessionCookie(null);
            } catch (error) {
               console.log(error);
               setSessionCookie(null);
            }
         })()
      }
   }
   useEffect(authenticate,[]);
   useEffect(()=>{
      if(credential){
         props.onCredential(credential);
      }
   });


   return(
      <React.Fragment>
         <Message />
         {
            sessionCookie ? 
            <Spinner /> : 
               <EForm 
                  uischema={credentialUiSchema} 
                  actions={(entity)=>[<Button onClick={loginClickHandler(entity)}>Login</Button>]}
               />
         }
         
      </React.Fragment>
   )

}
