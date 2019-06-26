import React, { useState, useEffect, useReducer} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import PermissionUISchema from '../uischemas/Permission';
import FeatureTitle from '../../comps/FeatureTitle';
import EBread from '../../comps/EBread';
import {subscribe} from '../../event';
//Graphical Components
import AddBox from '@material-ui/icons/AddBox';
import AddButton from '../../comps/EBread/AddButton';
import Message from '../../comps/Message';

import {
 permission_create as createPermission,
 permission_browse as fetchPermissions,
 permission_delete as deletePermission
} from '../requesters';

import {
 permission_create as cp
} from '../../apiCallers';



/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Permissions(props){

 const [permissions,dispatch] = useReducer((state,action)=>{
  switch(action.type){
   case 'browse': return [...action.payload];
   default: return state;
  }
 },[]);

 let unsubscribeToEvent = subscribe((payload)=>{
  if(payload.source === 'permission_create'){
   console.log(payload);
  }
 });

 useEffect(()=>{
  console.log('Permissions Use Effect Fired'); 
  fetchPermissions().then( response => {
  
   if(JSON.stringify(permissions) !== JSON.stringify(response.data.data.entity)){
    // setPermissions(artifact.data.data.entity);
    dispatch({type:'browse',payload:response.data.data.entity});
   }
  }
   
  ).catch(e=>console.log(e));

  return unsubscribeToEvent;

 },[permissions]);

 const onSave = async permission => {
  console.log(permission);
  // let artifact = await cp(permission);
  cp(permission);
  // console.log(artifact);
 };

 const onDelete = async permission=>{
  console.log('On Delete',permission);
  
  // try {
  //  let response = await deletePermission(permission); 
  //  let successArtifact = response.data;
  //  setMessage({text: successArtifact.message.text,type:successArtifact.message.type});
  // } catch (error) {
  //  let errArtifact = error.response.data;
  //  console.log(error.response);
  //  setMessage({text: errArtifact.error.message, type: errArtifact.error.type});
  // }
  
 }

 return (
  <Router basename="/permissions">
   <div className="feature">
     <FeatureTitle>
     
      <span>Permissions</span>
      {/* <Link to="/add"><AddBox /><span>Add New User</span></Link> */}
      <AddButton adderPath={"/add"} text="Add New Permission"/>
     </FeatureTitle>
     <Message />
     <Route render={mlh=>
      permissions?
      <EBread 
       {...mlh}
       identifier={"name"}
       UISchema={PermissionUISchema} 
       entities={permissions}
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

//Minimum Required Permission for the feature to be available
Object.defineProperty(Permissions,'path',{ get: () => '/permissions'});
Object.defineProperty(Permissions,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Permissions,'requiredPermission',{ get: () => 'permission_read' });

export default Permissions;