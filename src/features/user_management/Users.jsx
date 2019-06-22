import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import components from '../../comps';
import UserUISchema from '../uischemas/User';
import FeatureTitle from '../../comps/FeatureTitle';


import {
 user_create as addUser,
 user_edit as updateUser,
 user_delete as removeUser,
 user_browse as fetchUsers,
} from '../requesters';


const { EBread } = components; 

/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Users(props){

 const [users,setUsers] = useState([]);

 useEffect(()=>{
  fetchUsers().then( artifact => {
   console.log(artifact.data.data.entity);
   if(JSON.stringify(users) !== JSON.stringify(artifact.data.data.entity)){
    setUsers(artifact.data.data.entity);
   }
  }
   
  ).catch(e=>console.log(e));
 });




 const onSave = user => console.log('Saving User');
 const onDelete = user => console.log('Deleting User');

 return (
  <Router basename="/users">
   <div className="feature">
     <FeatureTitle>Permissions</FeatureTitle>
    <Route render={mlh=>
     <EBread 
      {...mlh}
      identifier={"_id"}
      UISchema={UserUISchema} 
      entities={users}
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
Object.defineProperty(Users,'path',{ get: () => '/users'});
Object.defineProperty(Users,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Users,'requiredPermission',{ get: () => 'user_read' });

export default Users;