import React, { useContext,useEffect } from 'react';
import PropTypes from 'prop-types';
import EBrowser from 'components/EBrowser';
import Feature from 'components/Feature';
import employeeUiSchema from 'uischemas/employee';
import roleUiSchema from 'uischemas/role';
import EForm from 'components/EForm';
import rolesPromise from 'promises/rolesPromise';
import {EmployeeRolesAddRequest,EmployeeRolesDeleteRequest} from 'requests';
import RoleBrowser from 'features/access_control/roles/RoleBrowser';
import queryString from 'query-string';
import EFormExpandableField from 'components/EFormExpandableField';
import StateContext from 'contexts/StateContext';


export default function EmployeeRoles(props){

   let store = useContext(StateContext);


   console.log(store);


   let employee = props.location && props.location.state && props.location.state.entity ?
                           props.location.state.entity : null; 
   
   let query = {
         name : {$in: employee.roles}
   };

   let newEmployeeUiSchema  = {
      employeeId: Object.assign({},employeeUiSchema.employeeId),
   }
   
 
  
   return(
      <Feature group="Roles" feature={`Employee Roles`} >
         <EForm 
            title={`${employee.employeeId}'s Roles`} 
            entity={employee} 
            uischema={newEmployeeUiSchema}          
            type="reader" 
         />
        
         <RoleBrowser 
               actions={[
                  {type:'delete',ui:`Remove From ${employee.employeeId}`},
                  {type:'add',ui:`Add Role To ${employee.employeeId}`}
               ]} 
               onDelete={(role)=>{
                  return new Promise((resolve,reject)=>{
                     (async ()=>{
                           let request = new EmployeeRolesDeleteRequest(employee.employeeId,role.name);
                           let artifact = await request.send();
                           if(artifact.status === 'ok'){
                              resolve(true);
                           }
                           reject();
                        }
                     )()
                  }); 
               }}
               search={query}
         />
         
      </Feature>
   )
}

EmployeeRoles.propTypes = {};
