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
   
   const clickHandler = entity => event=> {
      (async ()=>{
         let request = new RoleCreateRequest();
         console.log(unsubscriberRef);
         let artifact = await request.send(entity);
         if(artifact.status === 'ok'){
            props.history.push(artifact.data.href,{entity : artifact.data.entity});
            return;
         }
         setMessage(artifact.error);
      })()
   } 
   
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