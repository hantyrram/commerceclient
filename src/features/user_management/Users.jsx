import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import components from '../../comps';
import UserUISchema from '../uischemas/User';
import FeatureTitle from '../../comps/FeatureTitle';
import AddButton from '../../comps/EBread/AddButton';
import EBrowser from '../../comps/EBread/EBrowser';

//test only delete this line
import axios from '../../axios';


import {
 user_create as addUser,
 user_edit as updateUser,
 user_delete as removeUser,
 user_browse as fetchUsers,
} from '../requesters';

import{
   user_generate as generateUser,
} from '../../apis';



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

  (async function(){
   let response = await axios.get('/apiv1/features');
   console.log(response.data);
  })()
 });




 const onSave = user => console.log('Saving User');
 const onDelete = user => console.log('Deleting User');

 const generateUserOnClickHandler = ()=>{
   generateUser().then(artifact=>{
      console.log(artifact);
   })
 }
 return (
  <Router basename="/users">
   <div className="feature">
     <FeatureTitle>
      <span>Users</span>
      {/* <Link to="/add"><AddBox /><span>Add New User</span></Link> */}
      <AddButton adderPath={"/add"} text="Add New User"/>
     </FeatureTitle>
     <button onClick={generateUserOnClickHandler}>Generate User </button>
     <Route render={mlh=>
      users?
      <EBread 
       {...mlh}
       identifier={"_id"}
       UISchema={UserUISchema} 
       entities={users}
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
Object.defineProperty(Users,'path',{ get: () => '/users'});
Object.defineProperty(Users,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Users,'requiredPermission',{ get: () => 'user_read' });

export default Users;