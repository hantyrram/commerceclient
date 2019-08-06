import React, { Component, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import Modal from 'components/Modal';
import EBrowser from 'components/EBrowser';
import RoleBrowser from 'features/access_control/roles/RoleBrowser';


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

   const addRoleSelectHandler = (selected)=>{
      console.log(selected);
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
                  {/* <Button href={`/employees/${employee.employeeId}/roles`} variant="outlined" color="primary" size="small">
                     Add Role
                  </Button> */}
                  {/* <Modal triggerLabel="Add Role" 
                     actions={ closer=> [
                           <Button variant="contained" color="primary" onClick={()=>closer()}>
                              Add Role to {employee.employeeId}
                           </Button>
                        ]}>

                     <RoleBrowser onSelect={addRoleSelectHandler} actions={[{type:'select'}] } />
                  </Modal> */}
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