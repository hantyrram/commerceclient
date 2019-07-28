import React from 'react';
import PropTypes from 'prop-types';
import PermissionUISchema from 'uischemas/permission';
import EBrowser from 'components/EBrowser';
import {
   RolePermissionsDeleteRequest,
   RolePermissionsAddRequest,
   PermissionBrowseRequest
} from 'requests';


/**
 * Ui for the Role's permissions field.
 */
function RolePermissionsReader(props){
  
      let selectedPermissionsCache = [];

      const onSelect = (selected)=>{
         selectedPermissionsCache = selected;
         console.log(selectedPermissionsCache);
      }
   
      const deletePromise = async (permission)=>{
         let deleteRequest = new RolePermissionsDeleteRequest(permission);
         let artifact = await deleteRequest.send(permission);
         if(artifact.status === 'ok'){
            return true;
         }
         return false;
      };
     return(<EBrowser 
            onDelete={deletePromise}
            actions={[{type:'delete',ui:`Remove from ${props.role.name}`},{type:'add', ui: 'Add Permission'}]}
            adderPromise={()=>new Promise((resolve,reject)=>{
               let permissionsToAdd = selectedPermissionsCache.map(s=>s.entity);
               (async ()=>{
                  let request = RolePermissionsAddRequest();
                  let artifact = await request.send(permissionsToAdd);
                  if(artifact.status === 'ok'){
                     resolve(permissionsToAdd);
                     return;
                  }
                  reject();
               })()
               
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
                                          (async ()=>{
                                             let request = new PermissionBrowseRequest();
                                             let artifact = await request.send();   
                                             if(artifact.status === 'ok'){
                                                res(artifact.data.entity);
                                                return;
                                             }
                                             rej();
                                          })()
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