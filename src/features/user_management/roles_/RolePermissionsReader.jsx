import React from 'react';
import PropTypes from 'prop-types';
import PermissionUISchema from '../../uischemas/Permission';
import EBrowser from '../../../comps/EBread/EBrowser';
import {
   role_permissions_delete as removePermissionFromRole,
   role_permissions_add as addPermissionToRole,
   permission_browse as fetchAllPermissions,
} from '../../../apis';

/**
 * Ui for the Role's permissions field.
 */
function RolePermissionsReader(props){
  
      let selectedPermissionsCache = [];

      const onSelect = (selected)=>{
         selectedPermissionsCache = selected;
         console.log(selectedPermissionsCache);
      }
   
     return(<EBrowser 
            onDelete={removePermissionFromRole}
            actions={[{type:'delete',ui:`Remove from ${props.role.name}`},{type:'add'}]}
            adderPromise={()=>new Promise((resolve,reject)=>{
               let permissionsToAdd = selectedPermissionsCache.map(s=>s.entity);
               console.log(permissionsToAdd);
               addPermissionToRole(props.role._id,permissionsToAdd).then(artifact=>{
                  console.log(artifact);
                  if(artifact.status === 'ok'){
                     resolve(permissionsToAdd);
                  }
               });
            })}
            adderType="internal-modal"
            adderModalTitle={`Choose the permissions to add to ${props.role.name}`}
            adderModalContent={()=>
                                 <EBrowser 
                                    actions={[{type:'select', ui:'Add Permissions To Role'}]} 
                                    uischema={PermissionUISchema} 
                                    onSelect={onSelect}
                                    entities={
                                       new Promise((res,rej)=>{
                                          fetchAllPermissions().then(artifact=>{ // The permissions
                                             if(artifact.status === 'ok'){
                                                res(artifact.data.entity);
                                             }
                                          }).catch(e=>{
                                             console.log(e);
                                             rej();
                                          });
                                       })
                                    }   
                                 />
                              }
      
            adderModalActions = {[
               {type:'cancelAdd', ui: 'Cancel'},
               {type:'confirmAdd', ui: `Add Permissions to ${props.role.name}`}
            ]}
            uischema={PermissionUISchema} 
            entities={props.role.permissions}
            // onRead={()=>{}} //MUST pass empty function otherwise seem to retain the old onRead,
            />)
}



RolePermissionsReader.propTypes = {
   /**
    * The Role
    */
   role: PropTypes.object
}

export default RolePermissionsReader;