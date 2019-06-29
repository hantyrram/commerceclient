import React, { useState,useEffect,useReducer } from 'react';
import featureGroups from '../featureGroups';
import EntityBrowser from '../../comps/EBread/EntityBrowser';
import RoleUISchema from '../uischemas/Role';


import {
 role_browse as fetchRoles
} from '../../apis';

import { subscribe } from '../../event';

function Roles({user}){

 const [roles,setRoles] = useState([]);

 let unsubscribe = subscribe((eventResult)=>{
  switch(eventResult.source){
   case 'role_browse': {
    if(eventResult.type === 'artifact'){
     console.log(eventResult.artifact);
     setRoles(eventResult.artifact.entity);
    }
   }
   break;
   default: return;
  }
 });

 useEffect(()=>{
  fetchRoles();
 },[]);

 return(
  <EntityBrowser entities={roles} UISchema={RoleUISchema}/>
 
 )
}

//Minimum Required Permission for the feature to be available
Object.defineProperty(Roles,'path',{ get: () => '/roles'});
Object.defineProperty(Roles,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Roles,'requiredPermission',{ get: () => 'role_read' });

export default Roles;