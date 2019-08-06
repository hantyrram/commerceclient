import React, { useState, useEffect,useRef } from 'react';
import PropTypes from 'prop-types';
import EBrowser from 'components/EBrowser';
import Feature from 'components/Feature';
import employeeUiSchema from 'uischemas/employee';
import roleUiSchema from 'uischemas/role';
import EForm from 'components/EForm';
import rolesPromise from 'promises/rolesPromise';
import {EmployeeRolesAddRequest} from 'requests';
import RoleBrowser from 'features/access_control/roles/RoleBrowser';


export default function EmployeeRoles(props){
   let employee = props.location && props.location.state && props.location.state.entity ?
                           props.location.state.entity : null; 
   let roles = employee.roles;

   console.log(roles);
   let newEmployeeUiSchema  = {
      employeeId: Object.assign({},employeeUiSchema.employeeId),
      roles: employeeUiSchema.roles,
   }
   
   let selectedRolesCache = [];

   const selectHandler = selected => {
      selectedRolesCache = selected.map(s => s.entity);
      console.log(selectedRolesCache);
   }
  
   return(
      <Feature group="Roles" feature={`Employee Roles`} >
         <EForm 
            title="Add Role To Employee"
            entity={employee} 
            uischema={newEmployeeUiSchema} 
            // roles = {[employee.roles.join()]}
            type="reader" 
         />
         <RoleBrowser title="Select Roles To Add" actions={[{type:'select'}]}/>
         {/* <EBrowser 
            actions={[
               {type: 'add'}
            ]}
            uischema={roleUiSchema} entities={roles} 
            emptyEntitiesCaption={`${employee.employeeId} has no existing roles`}
            
            adderPromise={()=>new Promise((resolve,reject)=>{
               (async ()=>{
                  let request = new EmployeeRolesAddRequest(employee.employeeId);
                  let artifact = await request.send(selectedRolesCache);
                  console.log(artifact);
                  if(artifact.status === 'ok'){
                     resolve(artifact.data.entity);
                  }
               })()
            })}

            adderType="internal-modal"
            adderTriggerLabel={`Add Role to ${employee.employeeId}`}
            adderModalContent={
               ()=>{
                  return(
                     <EBrowser uischema={roleUiSchema} entities={rolesPromise} 
                        actions={[{type:'select'}]}
                        onSelect={selectHandler}
                     />
                  )
               }
            }
            adderModalActions={[
               {type: 'cancelAdd',ui:`Cancel`},
               {type: 'confirmAdd',ui:`Add Selected Roles To ${employee.employeeId}`}
            ]}
         /> */}
         
      </Feature>
   )
}

EmployeeRoles.propTypes = {};
