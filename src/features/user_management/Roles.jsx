import React, { useState,useEffect,useReducer } from 'react';
import {Route,Switch} from 'react-router-dom';
import featureGroups from '../featureGroups';
import EBrowser from '../../comps/EBread/EBrowser';
import EAdder from '../../comps/EBread/EAdder';
import EEditor from '../../comps/EBread/EEditor';
import FeatureTitle from '../../comps/FeatureTitle';
import AddButton from '../../comps/EBread/AddButton';
import Message from '../../comps/Message';
import Reader from './roles_/Reader';
import RoleUISchema from './roles_/UISchema';
import Adder from './roles_/Adder';
//ok
import {
 role_browse as fetchRoles,
 role_delete as deleteRole,
 role_permissions_delete as removePermissionFromRole
} from '../../apis';

import { subscribe } from '../../event';

function Roles({user,history}){

 const ADDER_PATH = '/roles/add';
 const EDITOR_PATH = '/roles/:identifier/edit';
 const READER_PATH = '/roles/:identifier';
 const [roles,setRoles] = useState([]);

 delete RoleUISchema['_id'];
 delete RoleUISchema['permissions'];

//  let unsubscribe = subscribe((eventResult)=>{
//   switch(eventResult.source){
//    case 'role_browse': {
//     if(eventResult.type === 'artifact'){
//      console.log(eventResult.artifact.entity);
//      setRoles(eventResult.artifact.entity);
//     }
//    }
//    break;
//    default: return;
//   }
//  });

//  useEffect(()=>{
// //   fetchRoles();
//   return unsubscribe;
//  },[]);



 const onRoleRead = entity => {
  console.log(entity);
  console.log(EDITOR_PATH.replace(":identifier",entity["_id"]));
  if(user.hasPermission('role_edit')){
   history.push(`${EDITOR_PATH.replace(":identifier",entity['_id'])}`,{entity});
   return;
  }
  history.push(`${READER_PATH.replace(":identifier",entity['_id'])}`,{entity});
 }

 const onRoleDelete = async role => {
   try {
      let artifact = await deleteRole(role);
      if(artifact.status === 'ok'){
         return true;
      }   
      return false;
   } catch (error) {
      console.log(error);
   }
 }

//  const reader = mlh => {
//   let role = mlh.location.state.entity;
//   console.log(role);
  
//   return(
//     <React.Fragment>
//     <EReader 
//      identifier="_id"
//      UISchema={RoleUISchema} 
//      entity={mlh.location.state.entity} 
//      editorPath={EDITOR_PATH} 
//      onDelete={()=>{}} 
//      permissions = {
//        ()=>
//         <EBrowser 
//          actions={[{type:'delete',ui:`Remove from ${role.name}`}]}
//          uischema={PermissionUISchema} 
//          entities={mlh.location.state.entity.permissions}
//          // onRead={()=>{}} //MUST pass empty function otherwise seem to retain the old onRead,
//         />
//       }
//     />
    
//    </React.Fragment>
   
//    )
//  }

  
 const editor = mlh => 
  <EEditor 
   identifier="_id"
   uischema={RoleUISchema} 
   entity={mlh.location.state.entity} 
   onSave={()=>{}} onDelete={()=>{}} 
  /> 

 return(
  <React.Fragment>
   <FeatureTitle>
    <span>Roles</span>
    <AddButton adderPath="/roles/add" text="Create New Role"/>
   </FeatureTitle>
   <Message />
   <Switch>
     <Route path={ADDER_PATH} exact component={ Adder }/> 
     <Route path={EDITOR_PATH} exact render={ editor }/> 
     <Route path={READER_PATH} exact component={ Reader }/>    
     <EBrowser 
         uischema={RoleUISchema}
         searchable
         searchableFields={['name','label']}
         entities={
            new Promise((res,rej)=>{
               fetchRoles().then(artifact=>{
                  if(artifact.status === 'ok'){
                     console.log(artifact);
                     console.log(artifact);
                     res(artifact.data.entity);
                  }
               }).catch(e=>{
                  console.log(e);
                  rej();
               });
            })
         }
         
         onDelete={onRoleDelete}
         onRead = {onRoleRead}
         actions = {[
         { type :'delete' }
         ]}
      />
   </Switch>
   
  </React.Fragment>
 )
}

//Minimum Required Permission for the feature to be available
Object.defineProperty(Roles,'path',{ get: () => '/roles'});
Object.defineProperty(Roles,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Roles,'requiredPermission',{ get: () => 'role_read' });

export default Roles;