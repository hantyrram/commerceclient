import React, { Component, useEffect,useRef, useState } from 'react';
import PropTypes from 'prop-types';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import { EmployeeAddRequest } from 'requests';
import Feature from 'components/Feature';


function EmployeeAdd(props){
   const type = props.type || 'auto';

   if(type === 'auto'){
      employeeUiSchema.employeeId.attributes.readOnly = true;
   }else{
      delete employeeUiSchema.employeeId.attributes.readOnly;
   }

   const unsubscriberRef = useRef();

   const [message,setMessage] = useState();

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
      
   }

   const clickHandler = entity => event=> {
      let request = new EmployeeAddRequest(type);
      unsubscriberRef.current = request.subscribe(subscriber);
      request.send(entity);
   } 
   
   useEffect(()=>{
      return unsubscriberRef.current;
   });

   
   useEffect(()=>{
      document.getElementById(employeeUiSchema.employeeId.attributes.id).focus();
   });

   return(
      <Feature group="Employees" feature="Add Employee">
         {JSON.stringify(message)}
         <EForm title="Enter Employee Details" uischema={employeeUiSchema} actions={
            entity => [
               <Button onClick={clickHandler(entity)} color="primary" variant="contained">Save</Button>
            ]
         }/>
      </Feature>
   )
}

EmployeeAdd.propTypes = {};

export default EmployeeAdd;