import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import PermissionUISchema from '../uischemas/Permission';
import FeatureTitle from '../../comps/FeatureTitle';
import EBread from '../../comps/EBread';


//Graphical Components
import AddBox from '@material-ui/icons/AddBox';
import AddButton from '../../comps/EBread/AddButton';

import {
 permission_create as addPermission,
 permission_edit as updatePermission,
 permission_delete as removePermission,
 permission_browse as fetchPermissions,
} from '../requesters';
import Feature from '../../comps/Feature';



/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Permissions(props){

 const [permissions,setPermissions] = useState([]);

 useEffect(()=>{
  fetchPermissions().then( artifact => {
   
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
     <FeatureTitle>
      <span>Permissions</span>
      {/* <Link to="/add"><AddBox /><span>Add New User</span></Link> */}
      <AddButton adderPath={"/add"} text="Add New Permission"/>
     </FeatureTitle>
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