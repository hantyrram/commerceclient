import React, { useEffect,useState } from 'react';
import useAppState from 'appstore/useAppState';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from 'features/feature';
import useApiRequest from 'api/useApiRequest';


function RolePermissionEditor(){

}

function Edit({match,location}){
   
   //get the id from params
   //check if id is already on the store,
   let { getAppState,dispatch } = useAppState();

   let fetchRole = useApiRequest('ROLE_READ',dispatch);
   let editRole = useApiRequest('ROLE_EDIT',dispatch);
   let deleteRole = useApiRequest('ROLE_DELETE',dispatch,({requestPayload})=>{
      return requestPayload; // the original role
   });
   
   // let fetchRolePermissions = useApiRequest('ROLE$PERMISSIONS_LIST',dispatch, ({requestParams,responseData})=>{
   //    console.log(requestParams);
   //    return {_id: requestParams.roleId, permissions:responseData.resource}
   // });

   let fetchAllPermissions = useApiRequest('PERMISSION_LIST',dispatch);

   let [role,setRole] = useState((location.state || {}).role); //from location
   
   function roleChangeHandler(e){
      let newRole = Object.assign({},role);
      newRole[e.target.name] = e.target.value;
      setRole(newRole);
   }

   function rolePermissionsChangeHandler(e){
      let resource = e.target.getAttribute("resource");
      let action = e.target.getAttribute("action");

      console.log(resource);
      console.log(action);
      
      let index = role.permissions.findIndex(permission=>permission[resource]);//resource exist

      let foundPermission = role.permissions[index];
      if(foundPermission){
         let newRole = Object.assign({},role);
         foundPermission[resource][action] = e.target.checked? 1: 0;
         newRole.permissions.splice(index,1,foundPermission);
         setRole(newRole);
         return;
      }
      //resource does not yet exist on the role's permissions, push
      let newRole = Object.assign({},role);
      let permission = {
         [resource]: {
            [action] : e.target.checked? 1: 0
         }
      } 
      newRole.permissions.push(permission);
      console.log(newRole);
      setRole(newRole);

   }

   const roleDeleteHandler = ()=>{
      deleteRole({params: {roleId:match.params.id},payload: role});
   }

   function roleSaveHandler(e){
      console.log(role);
      console.log(match.params);
      editRole({params: {roleId:match.params.id},payload: role});
   }

   //effects useEffect
   //fetch the role if it does not exist on the store
   function fetchRoleIfNotExist(){
      // if(!role){
      //    fetchRole(match.params.id);
      // }
      fetchRole({params: {roleId:match.params.id}});
   }

   // function fetchRolePermissionsIfNotExist(){
   //    if(!getAppState().permissions){
   //       fetchAllPermissions({params: {roleId:match.params.id}});
   //    }
   // }

   // useEffect(fetchRolePermissionsIfNotExist,[]);

   useEffect(fetchRoleIfNotExist,[]);

   useEffect(()=>{
      fetchAllPermissions();
   },[]);
   

   return(
      // <Feature group="Roles" featureShortcuts={[<FeatureShortcutLink to="/admin/roles/create">Create Role</FeatureShortcutLink>]}>
      //    <div>{getAppState().lastAction === 'ROLE_EDIT_NOK'? JSON.stringify(getAppState().lastActionPayload.text):null}</div>
      //    <div>{getAppState().lastAction === 'ROLE_EDIT_OK'? 'Role Update Success!':null}</div>
      //    <div>{getAppState().lastAction === 'ROLE_DELETE_OK'? 'Role Delete Success!':null}</div>
      //    {
            role ? 
            <form action="#" onSubmit={(e)=>e.preventDefault()}>
               <div>
                  <label htmlFor="role-_id">Id</label>
                  <input id="_id" type="text" defaultValue={role._id} onChange={roleChangeHandler}/>
               </div>
               <div>
                  <label htmlFor="role-name">Name</label>
                  <input name="name" id="role-name" type="text" defaultValue={role.name} onChange={roleChangeHandler}/>
               </div>
               <div>
                  <label htmlFor="role-label">Label</label>
                  <input name="label" id="role-label" type="text" defaultValue={role.label} onChange={roleChangeHandler}/>
               </div>
               <div>
                  <label htmlFor="role-description">Description</label>
                  <input name="description" id="role-description" type="text" defaultValue={role.description} onChange={roleChangeHandler}/>
               </div>
               <div>                  
                  <label htmlFor="permissions">
                     Permissions {!role.permissions? '(No Permissions)': null}
                  </label>
                  {
                     <table>
                           <thead>
                              <th>Resource</th>
                              <th>Permissions</th>
                           </thead>
                           <tbody>
                              {
                                 (getAppState().permissions).map(p=>{
                                    let permission = Object.assign({},p);
                                    let resource  = Object.getOwnPropertyNames(permission)[0];
                                    let actions = Object.getOwnPropertyNames(permission[resource]);
                                    
                                    //permission that has the same resource name
                                    let foundRolePermission = (role.permissions || []).find(rolePermission=>rolePermission[resource]);
                                    
                                    if(foundRolePermission){
                                       permission = Object.assign({},foundRolePermission);
                                    }
                                    
                                    let row = <tr>
                                       <td>{resource}</td>
                                       <td>
                                          {
                                             // actions.join(', ')
                                             actions.map(action=>{
                                                let checkbox = React.createElement('input',{
                                                   resource,
                                                   action,
                                                   type: 'checkbox',
                                                   value: permission[resource][action],
                                                   checked: permission[resource][action] === 1? 'checked':null,
                                                   onChange: rolePermissionsChangeHandler
                                                });

                                                let label = React.createElement('label',{},[checkbox,action]);
                                                return label;
                                             })
                                          }
                                       </td>
                                    </tr>

                                    return row;
                                 })
                              }
                           </tbody>
                        </table>  
                  }
               </div>
               <button onClick={roleSaveHandler} type="button">Save</button>
               <button onClick={roleDeleteHandler} type="button">Delete</button>
            </form> : null
      //    }
        
          
       
      // </Feature>
   )
   
}


export default feature(Edit,{
   title: 'Role',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/useraccounts/create">Create New User Account</FeatureShortcutLink>
   ]
})