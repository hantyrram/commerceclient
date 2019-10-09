import React, { Component, useEffect,useRef, useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import employeeUiSchema from 'uischemas/employee';
import EBrowser from 'components/EBrowser';
import { EmployeeBrowseRequest } from 'requests';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import StateContext from 'contexts/StateContext';
import fetchEmployeesAction from 'action_creators/fetchEmployeesAction';

export default (props)=>{

   let store = useContext(StateContext);
   console.log(store.getState());
  
   const entitiesPromise = new Promise((res,rej)=>{
      (async function(){
         let request = new EmployeeBrowseRequest();
         let artifact = await request.send();
         if(artifact.status === 'ok'){
            res(artifact.data.entity);
         }
      })()
   });

   const ebrowserReadHandler = (employee)=>{
      props.history.push(`/employees/${employee._id}`, {entity: employee});
   }

   useEffect(()=>{
      (async function(){
         store.dispatch(await fetchEmployeesAction());
      })()          
   },[])
   
   return(
      <Feature group="Employees" featureShortcuts={[<FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>]}>
         <EBrowser uischema={employeeUiSchema} entities={store.getState().employees} onRead={ebrowserReadHandler}
         />
         {JSON.stringify(store.getState())}
      </Feature>
   )
}