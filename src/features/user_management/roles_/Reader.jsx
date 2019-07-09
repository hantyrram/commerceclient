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
          actions={[{type:'delete',ui:`Remove from ${role.name}`}]}
          uischema={PermissionUISchema} 
          entities={mlh.location.state.entity.permissions}
          // onRead={()=>{}} //MUST pass empty function otherwise seem to retain the old onRead,
         />
       }
     />
     
    </React.Fragment>
    
    )
}