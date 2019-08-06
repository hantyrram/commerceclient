import React, { Component, useEffect,useRef, useState } from 'react';
import PropTypes from 'prop-types';
import credentialUiSchema from 'uischemas/credential';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import { CredentialCreateRequest } from 'requests';



function CredentialCreate(props){

   const unsubscriberRef = useRef();

   const [message,setMessage] = useState();

   const [employeeIdVerified,setEmployeeIdVerified] = useState(false);

   const uischema = {
      employeeId: employeeUiSchema.employeeId,
      ...credentialUiSchema
   }

   const subscriber = (requestResponse)=>{
      if(requestResponse.type === 'artifact'){
         let {artifact} = requestResponse;
         if(artifact.status === 'ok'){
            console.log(props);
            console.log(artifact);
            props.history.push(artifact.data.href,{entity : artifact.data.entity});
            return;
         }
         setMessage(artifact.error);
      }
      if(requestResponse.type === 'error'){
         setMessage(requestResponse.error);
      }

   }

   const clickHandler = entity => event=> {
      let request = new CredentialCreateRequest();
      unsubscriberRef.current = request.subscribe(subscriber);
      request.send(entity);
   } 
   
   useEffect(()=>{
      return unsubscriberRef.current;
   });

   useEffect(()=>{
      document.getElementById(employeeUiSchema.employeeId.attributes.id).focus();
      document.getElementById(employeeUiSchema.employeeId.attributes.id).addEventListener('blur',function(){
         console.info('%c??? Verify Employee then enable create button',"background-color: orange;");
      });
   });


   return(
      <>
      {JSON.stringify(message)}
      <EForm title="Create Credential" uischema={uischema} actions={
         entity => [
            <Button onClick={clickHandler(entity)} color="primary" variant="contained">Create</Button>
         ]
      }/>
      </>
   )
}

CredentialCreate.propTypes = {};

export default CredentialCreate;