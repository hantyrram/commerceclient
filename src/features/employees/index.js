import React, { Component, useEffect,useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import employeeUiSchema from 'uischemas/employee';
import EBrowser from 'components/EBrowser';
import { EmployeeBrowseRequest } from 'requests';


export default (props)=>{
   const entitiesPromise = new Promise((res,rej)=>{
      (async function(){
         let request = new EmployeeBrowseRequest();
         let artifact = await request.send();
         console.log(artifact);
         if(artifact.status === 'ok'){
            res(artifact.data.entity);
         }
      })()
   });

   const ebrowserReadHandler = (employee)=>{
      props.history.push(`/employees/${employee._id}`, {entity: employee});
   }

   
   return(
      <div>
         Employees 
         <Link to="/employees/add">Add Employee</Link>
         <EBrowser uischema={employeeUiSchema} entities={entitiesPromise} onRead={ebrowserReadHandler}
         />
      </div>
   )
}