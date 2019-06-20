import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import components from '../../comps';
import PermissionUISchema from '../uischemas/Permission';

import {
 permission_create as addPermission,
 permission_edit as updatePermission,
 permission_delete as removePermission,
 permission_browse as fetchPermissions,
} from '../requesters';


const { EBread } = components; 

/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Permissions(props){

 const [permissions,setPermissions] = useState([]);

 useEffect(()=>{
  fetchPermissions().then( artifact => {
   console.log(artifact.data.data.entity);
   if(JSON.stringify(permissions) !== JSON.stringify(artifact.data.data.entity)){
    setPermissions(artifact.data.data.entity);
   }
  }
   
  ).catch(e=>console.log(e));
 });




 const onSave = permission => console.log('Saving Permission');
 const onDelete = permission => console.log('Deleting Permission');

 return (
  <Router basename="/permissions">
   <div className="feature">
    <Route render={mlh=>
     <EBread 
      {...mlh}
      identifier={"name"}
      UISchema={PermissionUISchema} 
      entities={permissions}
      addPath="/add" 
      readerPath="/:identifier" 
      editorPath="/:identifier/edit" 
      onSave={onSave} 
      onDelete={onDelete} 
      // onAdd={onAdd} 
     />
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