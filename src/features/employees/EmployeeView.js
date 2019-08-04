import React, { Component, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';


function EmployeeView(props){
   console.log(props.match);
   //params {id: jdflajfldjsaf}
   //request for the entity with this id
   let employee;

   if(props.location && props.location.state && props.location.state.entity){
      employee = props.location.state.entity;
   }

   if(!employee){
      //??? retreive using matched employee id,
      return null;
   }

   return(
      <EForm 
         title="Employee" 
         type="reader" 
         entity={props.location.state.entity}          
         uischema={employeeUiSchema} 
         roles={
            ()=>
               <>
                  <span>[ {employee.roles.join()} ] </span>
                  <Link to={{pathname: `/employees/${employee.employeeId}/roles`,state:{entity:employee}}}>
                     {`Add Role`}
                  </Link>
               </>
               
         }
         actions={
         entity => [
            <Button color="primary" variant="contained">Modify</Button>,
            <Button color="primary" variant="contained">Back</Button>
         ]
      }/>
   )
}

   EmployeeView.propTypes = {};

export default EmployeeView;