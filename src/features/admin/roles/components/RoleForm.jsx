import React, { useState, useEffect } from 'react';

const MODES = ['creator','editor','reader'];

export default (props)=>{
   
   //default is creator
   let initialMode = props.mode && MODES.includes(props.mode) ? props.mode : 'creator';

   let [mode,setMode] = useState(initialMode);

   let [role,setRole] = useState(props.role);

   let [roleInputAttributes,setRoleInputAttributes] = useState({});
   let [rolePermissionsInputAttributes,setRolePermissionsInputAttributes] = useState({});

   const roleChangeHandler = (e)=>{
      console.log(e.target);
   }

   const rolePermissionsChangeHandler = (e)=>{
      console.log(e.target);
   }


   const setReaderAttribute = () => {
      let attributesForRole = {};
      let attributesForRolePermissions = {};
      for(let p of Object.getOwnPropertyNames(role)){
         attributesForRole[p] = {
            readOnly: true,
            value: role[p]               
         }
      }

      for(let permission of role.permissions){
         let resource = Object.getOwnPropertyNames(permission)[0];
         let actions = Object.getOwnPropertyNames(permission[resource]);
         attributesForRolePermissions[resource] = {};
         for(let action of actions){
            attributesForRolePermissions[resource][action] = {
               checked: permission[resource][action] === 1? 'checked': '',
               value: permission[resource][action] === 1? true: false,
            };
         }
      }
      
      setRolePermissionsInputAttributes(attributesForRolePermissions);
      setRoleInputAttributes(attributesForRole);
      
   }

   const setWriterAttribute = ()=>{
      let attributesForRole = {};
      let attributesForRolePermissions = {};
      for(let p of Object.getOwnPropertyNames(role)){
         attributesForRole[p] = {
            defaultValue: (role || {})[p] || '', //if creator role will be undefined hence {}
            onChange: roleChangeHandler              
         }
      }
      for(let permission of role.permissions){
         let resource = Object.getOwnPropertyNames(permission)[0];
         let actions = Object.getOwnPropertyNames(permission[resource]);
         attributesForRolePermissions[resource] = {};
         for(let action of actions){
            attributesForRolePermissions[resource][action] = {
               defaultChecked: permission[resource][action] === 1? 'checked': '',
               defaultValue: permission[resource][action] === 1? true: false,
               onChange: rolePermissionsChangeHandler
            };
         }
      }
      setRoleInputAttributes(attributesForRole);
      setRolePermissionsInputAttributes(attributesForRolePermissions)
   }

 
   if(mode !== 'creator' && !role){
      return null;
   }


   useEffect(()=>{
      if(mode !== 'reader' && MODES.includes(mode)){
         setWriterAttribute();
      }

      if(mode === 'reader' && role){
         setReaderAttribute();
      }
   },[]);
   
  
   return(
      
      <form action="#">
         {JSON.stringify(roleInputAttributes)}
         <div>
            <label htmlFor="role-_id">Id</label>
            <input id="_id" type="text" {...roleInputAttributes['_id']}/>
         </div>
         <div>
            <label htmlFor="role-name">Name</label>
            <input name="name" id="role-name" type="text" {...roleInputAttributes['name']}/>
         </div>
         <div>
            <label htmlFor="role-label">Label</label>
            <input name="label" id="role-label" type="text" {...roleInputAttributes['label']}/>
         </div>
         <div>
            <label htmlFor="role-description">Description</label>
            <input name="description" id="role-description" type="text" {...roleInputAttributes['description']} />
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
                              actions.map(action=>{
                                 console.log(action);
                                 let r = rolePermissionsInputAttributes[resource];

                                 console.log(r);
                                 let checkboxAttributes = {
                                    resource: resource,
                                    action: action,
                                    type: 'checkbox',
                                    // ...rolePermissionsInputAttributes[resource][action]
                                    // checked: permission[action] === 1? 'checked': false
                                 }
                                 let checkbox = React.createElement('input',checkboxAttributes)
                                 let span = React.createElement('span',{},checkbox);
                                 return span;
                              })
                                 // `${action} ,`.replace(/(,)$/,''))
                           }
                        </td>
                     </tr>

                     return row;
                  })
               }
            </tbody>
         </table>  
         </div>
      </form>
   )
}