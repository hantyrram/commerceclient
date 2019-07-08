import React from 'react';
import EBrowser from '../../comps/EBread/EBrowser';
import EAdder from '../../comps/EBread/EAdder';
import EReader from '../../comps/EBread/EReader';
import EEditor from '../../comps/EBread/EEditor';
import RoleUISchema from '../uischemas/Role';
import PermissionUISchema from '../uischemas/Permission';
import FeatureTitle from '../../comps/FeatureTitle';
import AddButton from '../../comps/EBread/AddButton';

import {
 role_permissions_delete as removePermissionFromRole
} from '../../apis';

export default mlh => {
 let role = mlh.location.state.entity;
 return(
   <React.Fragment>
   <EReader 
    identifier="_id"
    UISchema={RoleUISchema} 
    entity={mlh.location.state.entity} 
    editorPath={EDITOR_PATH} 
    onDelete={()=>{}} 
    permissions = {
      ()=>
       <EBrowser 
        actions={
         [
          {
           icon:'',label:'Remove from Role',onClick:(permission,event)=>{
            removePermissionFromRole(permission);
           }
          }
         ]
        } 
        UISchema={PermissionUISchema} 
        entities={mlh.location.state.entity.permissions}
       />
     }
   />
   
  </React.Fragment>
  )
}