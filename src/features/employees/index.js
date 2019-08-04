import React, { Component, useEffect,useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import employeeUiSchema from 'uischemas/employee';
import EBrowser from 'components/EBrowser';
import { EmployeeBrowseRequest } from 'requests';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';


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
      <Feature group="Employees" featureShortcuts={[<FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>]}>
         <EBrowser uischema={employeeUiSchema} entities={entitiesPromise} onRead={ebrowserReadHandler}
         />
      </Feature>
   )
}