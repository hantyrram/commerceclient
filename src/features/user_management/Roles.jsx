import React, { useState,useEffect,useReducer } from 'react';
import {Route,Switch} from 'react-router-dom';
import featureGroups from '../featureGroups';
import EBrowser from '../../comps/EBread/EBrowser';
import EAdder from '../../comps/EBread/EAdder';
import EReader from '../../comps/EBread/EReader';
import EEditor from '../../comps/EBread/EEditor';
import RoleUISchema from '../uischemas/Role';


import {
 role_browse as fetchRoles
} from '../../apis';

import { subscribe } from '../../event';

function Roles({user,history}){

 const [roles,setRoles] = useState([]);

 let unsubscribe = subscribe((eventResult)=>{
  switch(eventResult.source){
   case 'role_browse': {
    if(eventResult.type === 'artifact'){
     console.log(eventResult.artifact.entity);
     setRoles(eventResult.artifact.entity);
    }
   }
   break;
   default: return;
  }
 });

 useEffect(()=>{
  fetchRoles();
  return unsubscribe;
 },[]);

 const ADDER_PATH = '/roles/add';
 const EDITOR_PATH = '/roles/:identifier/edit';
 const READER_PATH = '/roles/:identitier';

 const onRead = entity => {
  console.log(EDITOR_PATH.replace(":identifier",entity["_id"]));
  if(user.hasPermission('role_edit')){
   history.push(`${EDITOR_PATH.replace(":identifier",entity['_id'])}`,{entity});
   return;
  }
  history.push(`${READER_PATH.replace(":identifier",entity['_id'])}`,{entity});
 }

 const reader = mlh => 
  <EReader 
   identifier="_id"
   UISchema={RoleUISchema} 
   entity={mlh.location.state.entity} 
   editorPath={EDITOR_PATH} 
   onDelete={()=>{}} 
  />

  const editor = mlh => 
  <EEditor 
   identifier="_id"
   UISchema={RoleUISchema} 
   entity={mlh.location.state.entity} 
   onSave={()=>{}} onDelete={()=>{}} 
  /> 

 const adder = mlh => <EAdder UISchema={RoleUISchema} onSave={()=>{}} /> 

 return(
  <React.Fragment>
   <Switch>
     <Route path={ADDER_PATH} exact render={ adder }/> 
     <Route path={EDITOR_PATH} exact render={ editor }/> 
     <Route path={READER_PATH} exact render={ reader }/>    
   </Switch>
   <EBrowser 
    UISchema={RoleUISchema}
    entities={roles}
    onDelete={(entity)=>console.log('Deleting ',entity)}
    onRead = {onRead}
   />
  </React.Fragment>
 )
}

//Minimum Required Permission for the feature to be available
Object.defineProperty(Roles,'path',{ get: () => '/roles'});
Object.defineProperty(Roles,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Roles,'requiredPermission',{ get: () => 'role_read' });

export default Roles;