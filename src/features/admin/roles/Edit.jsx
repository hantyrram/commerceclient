import React, { useContext,useEffect,useState} from 'react';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import StateContext from 'contexts/StateContext';
import useFetchRole from 'actions/useFetchRole';
import useFetchPermissions from 'actions/useFetchPermissions';
import useEditRole from 'actions/useEditRole';
import useDeleteRole from 'actions/useDeleteRole';


export default ({match,location})=>{
   
   //get the id from params
   //check if id is already on the store,
   let { getStore } = useContext(StateContext);
   let fetchRole = useFetchRole();
   let editRole = useEditRole();
   let deleteRole = useDeleteRole();
   let fetchAllPermissions = useFetchPermissions();

   // let {role} = (location.state || {})
   let [role,setRole] = useState((location.state || {}).role); //from location
   
   // let [role,setRole] = useState((roles || []).find(role=> role._id === match.params.id));
   
   function roleChangeHandler(e){
      let newRole = Object.assign({},role);
      newRole[e.target.name] = e.target.value;
      setRole(newRole);
   }

   function rolePermissionsChangeHandler(e){
      let resource = e.target.getAttribute("resource");
      let action = e.target.getAttribute("action");

      let index = role.permissions.findIndex(permission=>permission[resource]);//resource exist

      let foundPermission = role.permissions[index];
      if(foundPermission){
         let newRole = Object.assign({},role);
         foundPermission[resource][action] = e.target.checked? 1: 0;
         newRole.permissions.splice(index,1,foundPermission);
         setRole(newRole);
         return;
      }
      //resource doest not yet exist on the role's permissions, push
      let newRole = Object.assign({},role);
      let permission = {
         [resource]: {
            [action] : e.target.checked? 1: 0
         }
      } 
      newRole.permissions.push(permission);
      setRole(newRole);

   }

   const roleDeleteHandler = ()=>{
      deleteRole(role);
   }

   function roleSaveHandler(e){
      editRole(role);
   }

   //effects useEffect
   //fetch the role if it does not exist on the store
   function fetchRoleIfNotExist(){
      // if(!role){
      //    fetchRole(match.params.id);
      // }
      fetchRole(match.params.id);
   }

   function fetchPermissionsIfNotExist(){
      if(!getStore().permissions){
         fetchAllPermissions();
      }
   }

   useEffect(fetchRoleIfNotExist,[]);
   useEffect(fetchPermissionsIfNotExist,[]);
   return(
      <Feature group="Roles" featureShortcuts={[<FeatureShortcutLink to="/admin/roles/create">Create Role</FeatureShortcutLink>]}>
         <div>{getStore().lastAction === 'ROLE_EDIT_NOK'? JSON.stringify(getStore().lastActionPayload.text):null}</div>
         <div>{getStore().lastAction === 'ROLE_EDIT_OK'? 'Role Update Success!':null}</div>
         <div>{getStore().lastAction === 'ROLE_DELETE_OK'? 'Role Delete Success!':null}</div>
         {
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
                  <label htmlFor="permissions">Permissions</label>
                  {
                     role.permissions && role.permissions.length > 0 ?
                     <table>
                           <thead>
                              <th>Resource</th>
                              <th>Permissions</th>
                           </thead>
                           <tbody>
                              {
                                 (getStore().permissions || []).map(p=>{
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
                        : <i> Role Has No Permissions</i>
                  }
               </div>
               <button onClick={roleSaveHandler} type="button">Save</button>
               <button onClick={roleDeleteHandler} type="button">Delete</button>
            </form> : null
         }
        
          
       
      </Feature>
   )
   
}


