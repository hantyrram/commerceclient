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
   
  }
 });

 useEffect(()=>{
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
Object.defineProperty(Roles,'requiredPermission',{ get: () => 'role_read' });

export default Roles;