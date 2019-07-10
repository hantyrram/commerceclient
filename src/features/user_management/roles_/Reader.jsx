import React from 'react';
import EBrowser from '../../../comps/EBread/EBrowser';
import EAdder from '../../../comps/EBread/EAdder';
import EReader from '../../../comps/EBread/EReader';
import EEditor from '../../../comps/EBread/EEditor';
import RoleUISchema from '../../uischemas/Role';
import PermissionUISchema from '../../uischemas/Permission';
import FeatureTitle from '../../../comps/FeatureTitle';
import AddButton from '../../../comps/EBread/AddButton';

import {
 role_permissions_delete as removePermissionFromRole
} from '../../../apis';

export default mlh => {

   let role = mlh.location.state.entity;
   
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

   const innerEBrowserOnSelect = (selectedEntities)=>{
      console.log(selectedEntities);
   }
   return(
     <React.Fragment>
     <EReader 
      identifier="_id"
      UISchema={RoleUISchema} 
      entity={mlh.location.state.entity} 
      onDelete={()=>{}} 
      permissions = {
        ()=>
         <EBrowser 
          onDelete={removePermissionFromRoleAction}
          actions={[{type:'delete',ui:`Remove from ${role.name}`},{type:'add'}]}
          adderType="modal"
          adderModalTitle={`Choose the permissions to add to ${role.name}`}
          adderModalContent={()=>{
             //note we need to fetch all the permissions here
            return <EBrowser actions={[{type:'select'}]} entities={role.permissions} uischema={PermissionUISchema} onSelect={innerEBrowserOnSelect}/>
            }
          }
          adderModalActions={
            [<button>Add Permission To {role.name}</button>]
          }
          uischema={PermissionUISchema} 
          entities={role.permissions}
          // onRead={()=>{}} //MUST pass empty function otherwise seem to retain the old onRead,
         />
       }
     />
     
    </React.Fragment>
    
    )
}