<<<<<<< HEAD
import React, { useState, useEffect, useReducer} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import RoleUISchema from '../uischemas/Role';
import FeatureTitle from '../../comps/FeatureTitle';
import EBread from '../../comps/EBread';
import {subscribe} from '../../event';
//Graphical Components
import AddBox from '@material-ui/icons/AddBox';
import AddButton from '../../comps/EBread/AddButton';
import Message from '../../comps/Message';

import {
 role_browse as fetchRoles,
 // role_create as createRole,
 // role_delete as deleteRole
} from '../../apis';



/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Roles(props){

 const [roles,dispatch] = useReducer((state,action)=>{
  switch(action.type){
   case 'browse': return [...action.payload];
   default: return state;
  }
 },[]);

 let unsubscribeToEvent = subscribe((eventResult)=>{
  if(eventResult.source === 'role_create'){
   console.log(eventResult);
  }
  if(eventResult.source === 'role_browse'){
   console.log(eventResult);
   if(eventResult.type === 'artifact'){
    let artifact = eventResult.artifact;
    if(JSON.stringify(roles) !== JSON.stringify(artifact.entity) ){
     //update RoleUISchema.permissions.options
     if(artifact.entity.permissions && artifact.entity.permissions.length > 0){
      RoleUISchema.permissions.options = artifact.entity.permissions.map(
       (aPermission)=> ({value:aPermission.name,text:aPermission.label} ));
     }
     
     dispatch({type:'browse',payload: artifact.entity});
    }
   }
   
=======
import React, { useState,useEffect,useReducer } from 'react';
import {Route,Switch} from 'react-router-dom';
import featureGroups from '../featureGroups';
import EBrowser from '../../comps/EBread/EBrowser';
import EAdder from '../../comps/EBread/EAdder';
import EReader from '../../comps/EBread/EReader';
import EEditor from '../../comps/EBread/EEditor';
import RoleUISchema from '../uischemas/Role';
import PermissionUISchema from '../uischemas/Permission';
import FeatureTitle from '../../comps/FeatureTitle';
import AddButton from '../../comps/EBread/AddButton';


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
>>>>>>> dev
  }
 });

 useEffect(()=>{
<<<<<<< HEAD
  console.log('Roles Use Effect Fired'); 
  fetchRoles();
  return unsubscribeToEvent;
 },[]);

 const onSave = async role => {
  // createRole(role);
 };

 const onDelete = async role=>{
  // deleteRole(role);
 }

 return (
  <Router basename="/roles">
   <div className="feature">
     <FeatureTitle>
     
      <span>Roles</span>
      {/* <Link to="/add"><AddBox /><span>Add New User</span></Link> */}
      <AddButton adderPath={"/add"} text="Add New Role"/>
     </FeatureTitle>
     <Message />
     <Route render={mlh=>
      roles?
      <EBread 
       {...mlh}
       identifier={"name"}
       UISchema={RoleUISchema} 
       entities={roles}
       adderPath="/add" 
       readerPath="/:identifier" 
       editorPath="/:identifier/edit"
       browserPath="/"
       onSave={onSave} 
       onDelete={onDelete} 
       // onAdd={onAdd} 
      />:null
     }/>
    
   </div>
  </Router>
 );

}

//Minimum Required Role for the feature to be available
Object.defineProperty(Roles,'path',{ get: () => '/roles'});
Object.defineProperty(Roles,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Roles,'primaryLink',{ get: () => true});
=======
  fetchRoles();
  return unsubscribe;
 },[]);

 const ADDER_PATH = '/roles/add';
 const EDITOR_PATH = '/roles/:identifier/edit';
 const READER_PATH = '/roles/:identifier';

 const onRead = entity => {
  console.log(entity);
  console.log(EDITOR_PATH.replace(":identifier",entity["_id"]));
  if(user.hasPermission('role_edit')){
   history.push(`${EDITOR_PATH.replace(":identifier",entity['_id'])}`,{entity});
   return;
  }
  history.push(`${READER_PATH.replace(":identifier",entity['_id'])}`,{entity});
 }

 const reader = mlh => {
  console.log(mlh.location.state.entity.permissions);
  let role = mlh.location.state.entity;
  return(
    <React.Fragment>
    <EReader 
     identifier="_id"
     UISchema={RoleUISchema} 
     entity={mlh.location.state.entity} 
     editorPath={EDITOR_PATH} 
     onDelete={()=>{}} 
     permissions = {
       ()=><EBrowser UISchema={PermissionUISchema} entities={mlh.location.state.entity.permissions}/>
      }
    />
    
   </React.Fragment>
   )
  }

  
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
   <FeatureTitle>
    <span>Roles</span>
    <AddButton adderPath="/roles/add" text="Add New Role"/>
   </FeatureTitle>
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
>>>>>>> dev
Object.defineProperty(Roles,'requiredPermission',{ get: () => 'role_read' });

export default Roles;