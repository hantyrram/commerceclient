import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import components from '../../comps';


import {
 permission_create as addPermission,
 permission_edit as updatePermission,
 permission_delete as removePermission,
 permission_browse as fetchPermissions,
} from '../requesters';

import samples from '../../comps/sample_entities/Products.json';
import productSchema from '../../comps/schemas/ProductUISchema';

const { EBread } = components; 
function Permissions(props){

 const [permissions,setPermissions] = useState([]);

 useEffect(()=>{
  fetchPermissions().then(artifact=> console.log(artifact)).catch(e=>console.log(e));
 });

 const onAdd = async (permission)=>{
  try {
   let artifact = await addPermission(permission);   
   permissions.splice(0,0,permission);
   setPermissions(permissions);
   
   console.log(artifact);
  } catch (error) {
   
  }
 }


 const onSave = permission => console.log('Saving Permission');
 const onDelete = permission => console.log('Deleting Permission');

 return (
  <Router basename="/permissions">
   <div className="feature">
    <Route render={mlh=>
     <EBread 
      {...mlh}
      UISchema={productSchema} 
      entities={samples}
      addPath="/add" 
      readPath="/:id" 
      editPath="/:id/edit" 
      onSave={onSave} 
      onDelete={onDelete} 
      onAdd={onAdd} 
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