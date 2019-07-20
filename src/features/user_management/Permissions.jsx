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
import EBrowser from '../../comps/EBread/EBrowser';
import AddButton from '../../comps/EBread/AddButton';
import Message from '../../comps/Message';
import Reader from './permissions_/Reader';

import {
 permission_create as createPermission,
 permission_delete as deletePermission,
 permission_browse as fetchPermissions,
} from '../../apis';



/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Permissions({user,history}){
   const ADDER_PATH = '/permissions/add';
   const EDITOR_PATH = '/permissions/:identifier/edit';
   const READER_PATH = '/permissions/:identifier';
 

 const onSave = async permission => {
  createPermission(permission);
 };

 const onDelete = async permission=>{
   try {
      let artifact = await deletePermission(permission);
      if(artifact.status === 'ok'){
         return true;
      }   
      return false;
   } catch (error) {
      console.log(error);
   }
 }

 const onRead = entity => {
   console.log(entity);
   console.log(EDITOR_PATH.replace(":identifier",entity["name"]));
   if(user.hasPermission('role_edit')){
    history.push(`${EDITOR_PATH.replace(":identifier",entity['name'])}`,{entity});
    return;
   }
   history.push(`${READER_PATH.replace(":identifier",entity['name'])}`,{entity});
  }

  const adder = ()=>{}
  const editor = ()=>{}

 return (
   <React.Fragment>
     <FeatureTitle>
      <span>Permissions</span>
      <AddButton adderPath={"/add"} text="Add New Permission"/>
     </FeatureTitle>
     <Message />
     <Switch>
     <Route path={ADDER_PATH} exact render={ adder }/> 
     <Route path={EDITOR_PATH} exact render={ editor }/> 
     <Route path={READER_PATH} exact render={ Reader }/>    
     <EBrowser 
         uischema={PermissionUISchema}
         searchable
         searchableFields={['name','label']}
         entities={
            new Promise((res,rej)=>{
               fetchPermissions().then(artifact=>{
                  if(artifact.status === 'ok'){
                     console.log(artifact);
                     
                     res(artifact.data.entity);
                  }
               }).catch(e=>{
                  console.log(e);
                  rej();
               });
            })
         }
         
         onDelete={onDelete}
         onRead = {onRead}
         actions = {[
         { type :'delete' }
         ]}
      />
   </Switch>
    
   </React.Fragment>
 );

}

//Minimum Required Permission for the feature to be available
Object.defineProperty(Permissions,'path',{ get: () => '/permissions'});
Object.defineProperty(Permissions,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Permissions,'requiredPermission',{ get: () => 'permission_read' });

export default Permissions;