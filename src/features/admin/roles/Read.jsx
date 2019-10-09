import React, { useContext,useEffect } from 'react';
import uischema from 'uischemas/role';
import Feature from 'components/Feature';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import EForm from 'components/EForm';
import StateContext from 'contexts/StateContext';
import useFetchRole from 'actions/useFetchRole';

import useFetchRolePermissions from 'actions/useFetchRolePermissions';
import RolePermissionsListComponent from './permissions/List';
import RoleForm from './components/RoleForm';
import {Link} from 'react-router-dom';

//effects



export default ({match,location})=>{
   
   //get the id from params
   //check if id is already on the store,
   let { getStore } = useContext(StateContext);
   let { roles } = getStore();
   let fetchRole = useFetchRole();
   
   let fetchRolePermissions = useFetchRolePermissions();
   let role = (roles || []).find(role=> role._id === match.params.id);


   //handlers
  

   //fetch the role if it does not exist on the store
   function fetchRoleIfNotExist(){
      if(!role){
         fetchRole(match.params.id);
      }
   }

   useEffect(fetchRoleIfNotExist,[]);

   

   // useEffect(()=>{
   //    console.log(role);
   //    if(role && role.permissions === undefined){ // hasPermission to fetch role.permissions
   //       console.log('role perissions');
   //       fetchRolePermissions(role._id);
   //    }
   // })

   
   return(
      <Feature group="Roles" featureShortcuts={[<FeatureShortcutLink to="/admin/roles/create">Create Role</FeatureShortcutLink>]}>
         {
            role ? <form action="#">
            <div>
               <label htmlFor="role-_id">Id</label>
               <input id="_id" type="text" value={role._id}/>
            </div>
            <div>
               <label htmlFor="role-name">Name</label>
               <input name="name" id="role-name" type="text" value={role.name}/>
            </div>
            <div>
               <label htmlFor="role-label">Label</label>
               <input name="label" id="role-label" type="text" value={role.label}/>
            </div>
            <div>
               <label htmlFor="role-description">Description</label>
               <input name="description" id="role-description" type="text" value={role.description} />
            </div>
            <div>
               <label htmlFor="permissions">Permissions</label>
               <table>
               <thead>
                  <th>Resource</th>
                  <th>Permissions</th>
               </thead>
               <tbody>
                  {
                     (role.permissions || []).map(permission=>{
                        let resource  = Object.getOwnPropertyNames(permission)[0];
                        let actions = Object.getOwnPropertyNames(permission[resource]);
                        let row = <tr>
                           <td>{resource}</td>
                           <td>
                              {
                                 actions.join(', ')
                              }
                           </td>
                        </tr>

                        return row;
                     })
                  }
               </tbody>
            </table>  
            </div>
            <Link to={{
               pathname: `/admin/roles/${role._id}/edit`,
               state: {
                  role
               }
            }}>Modify</Link>
         </form> : null
         }
        
          
       
      </Feature>
   )
   
}


