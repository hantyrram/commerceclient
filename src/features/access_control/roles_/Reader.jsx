import React,{useState,forwardRef} from 'react';
import EBrowser from '../../../comps/EBread/EBrowser';
import EAdder from '../../../comps/EBread/EAdder';
import EReader from '../../../comps/EBread/EReader';
import EEditor from '../../../comps/EBread/EEditor';
import RoleUISchema from './UISchema';
import PermissionUISchema from '../../uischemas/Permission';
import FeatureTitle from '../../../comps/FeatureTitle';
import AddButton from '../../../comps/EBread/AddButton';
import RolePermissionsReader from './RolePermissionsReader';

import {
 permission_browse as fetchPermissions,
 role_permissions_add as addPermissionsToRole,
 role_permissions_delete as removePermissionFromRole
} from '../../../apis';


/**
 * The component used to read and present a Role entity.
 * @typedef {Function} Roles.Reader
 * 
 */
export default mlh => {

   let role;

   if(mlh.location.state.entity){
      role = mlh.location.state.entity;
   }
   
   //holds the cache of the selected permissions to be added to Role.
   let selectedPermissionsCache = [];
  

  
   
    /**Action Handler*/
    const removePermissionFromRoleAction = async (permission)=>{
      console.log('Called');
      try {
         let artifact = await removePermissionFromRole(role._id,permission.name);
         if(artifact.status === 'ok'){
            return true;
         }
         return false;
      } catch (error) {
         return false;
      }
   } 

       //onAdd must wait for the button click handler 
   return(
     <React.Fragment>
     <EReader 
      identifier="_id"
      uischema={RoleUISchema} 
      entity={role} 
      onDelete={()=>{}} 
      permissions = {()=><RolePermissionsReader role={role} />}
     />
     
    </React.Fragment>
    
    )
}