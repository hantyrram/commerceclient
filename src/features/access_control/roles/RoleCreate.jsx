import React, { Component, useEffect,useRef, useState } from 'react';
import PropTypes from 'prop-types';
import roleUiSchema from 'uischemas/role';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import { RoleCreateRequest } from 'requests';



function RoleCreate(props){

   const unsubscriberRef = useRef();

   const [message,setMessage] = useState();

   delete roleUiSchema['permissions'];
   
   const subscriber = (requestResponse)=>{
      if(requestResponse.type === 'artifact'){
         let {artifact} = requestResponse;
         console.log(artifact);
         if(artifact.status === 'ok'){
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
      let request = new RoleCreateRequest();
      unsubscriberRef.current = request.subscribe(subscriber);
      request.send(entity);
   } 
   
   useEffect(()=>{
      return unsubscriberRef.current;
   });

   useEffect(()=>{
      document.getElementById(roleUiSchema.name.attributes.id).focus();
   });


   return(
      <>
      {JSON.stringify(message)}
      <EForm title="Create Role" uischema={roleUiSchema} actions={
         entity => [
            <Button onClick={clickHandler(entity)} color="primary" variant="contained">Create</Button>
         ]
      }/>
      </>
   )
}

RoleCreate.propTypes = {};

export default RoleCreate;