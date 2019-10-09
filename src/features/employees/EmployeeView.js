import React, {  useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import employeeUiSchema from 'uischemas/employee';
import EForm from 'components/EForm';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';


function EmployeeView(props){
   
   //params {id: jdflajfldjsaf}
   //request for the entity with this id

   let initialState = (props.location && props.location.state && props.location.state.entity) || null;
   let employee;
   // const [employee,setEmployee] = useState(initialState);
   console.log(props.match);
   if(props.location && props.location.state && props.location.state.entity){
      employee = props.location.state.entity;
   }

   // useEffect(()=>{
   //    if(!employee){
   //       let request = new EmployeeGetRequest();
   //    }
   // });

   if(!employee){
      //??? retreive using matched employee id,
      return null;
   }

   const addRoleSelectHandler = (selected)=>{
      console.log(selected);
   }

   return(
      <Feature group="Employees" featureShortcuts={[<FeatureShortcutLink to="/employees/add">Add New Employee</FeatureShortcutLink>]}>
      
         <EForm 
         title="Employee Details" 
         type="reader" 
         entity={props.location.state.entity}          
         uischema={employeeUiSchema} 
         roles={
            ()=>
               <>
                  {/* <span>[ {employee.roles.join()} ] </span> */}
                  <Link to={{pathname: `/employees/${employee.employeeId}/roles`,state:{entity:employee}}}>
                        {`View Roles`}
                  </Link>
                  &nbsp;&nbsp;
                  <Badge color="secondary" badgeContent={employee.roles.length} max={999}>
                     &nbsp;
                  </Badge>
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
      </Feature>
      
   )
}

   EmployeeView.propTypes = {};

export default EmployeeView;