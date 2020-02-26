import React, { useContext,useEffect } from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import feature from 'features/feature';
import {Link} from 'react-router-dom';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import useForm from 'hooks/useForm';

//effects


export function Read({match,location}){
   //Map params.id to store.roles [found] id
   //get the id from params
   //check if id is already on the store,
   let { getAppState,dispatch} = useAppState();
   let { roles } = getAppState();
   let fetchRole = useApiRequest('ROLE_READ',dispatch);
   // let { values: role, onChange, onSubmit, errors } = useForm();
   const onChange = ()=>{}
   
   // let fetchRolePermissions = useFetchRolePermissions();
   let role = (roles || []).find(role=> role._id === match.params.id);

   console.log(role);
   //handlers
  

   //fetch the role if it does not exist on the store
   function fetchRoleIfNotExist(){
      if(!role){
         fetchRole({params: {roleId: match.params.id}});
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
 
            role ? <form action="#">
            <div>
               <label htmlFor="role-_id">Id</label>
               <input id="_id" type="text" value={role._id}/>
            </div>
            <div>
               <label htmlFor="role-name">Name</label>
               <input name="name" id="role-name" type="text" value={role.name} onChange={onChange}/>
            </div>
            <div>
               <label htmlFor="role-label">Label</label>
               <input name="label" id="role-label" type="text" value={role.label} onChange={onChange}/>
            </div>
            <div>
               <label htmlFor="role-description">Description</label>
               <input name="description" id="role-description" type="text" value={role.description} onChange={onChange}/>
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
   )
   
}


export default feature(Read,{
   title: 'Role',
   shortcutLinks: [
      <FeatureShortcutLink to="/admin/useraccounts/create">Create New User Account</FeatureShortcutLink>
   ]
})