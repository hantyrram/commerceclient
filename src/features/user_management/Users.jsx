import React, { useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import featureGroups from '../featureGroups';
import Message from '../../comps/Message';
import components from '../../comps';
import UserUISchema from '../uischemas/User';
import FeatureTitle from '../../comps/FeatureTitle';
import AddButton from '../../comps/EBread/AddButton';
import EBrowser from '../../comps/EBread/EBrowser';
import UIBrowserSchema from './users_/UIBrowserSchema';
import Reader from './users_/Reader';

import Adder from './users_/Adder';

//test only delete this line
import axios from '../../axios';




import{
   user_generate as generateUser,
   user_browse as fetchUsers,
} from '../../apis';
import { ReadStream } from 'tty';




/**
 * 
 * @param {Object} props.parentContainerRef - The parent container ref object. This will be used in calculating the
 */
function Users(props){

 const ADDER_PATH = '/users/add';
 const EDITOR_PATH = '/users/:identifier/edit';
 const READER_PATH = '/users/:identifier';
 const adder = ()=>{}
 const editor = ()=>{}

 const usersPromise = new Promise((res,rej)=>{
   fetchUsers().then(artifact=>{
      if(artifact.status === 'ok'){
         res(artifact.data.entity);
      }
   }).catch(e=>{
      console.log(e);
      rej();
   });
})

 
 return (
   <React.Fragment>
   <FeatureTitle>
    <span>Users</span>
    <AddButton adderPath="/users/add" text="Add New User"/>
   </FeatureTitle>
   <Message />
   <Switch>
     <Route path={ADDER_PATH} exact component={ Adder }/> 
     <Route path={EDITOR_PATH} exact render={ editor }/> 
     <Route path={READER_PATH} exact component={ Reader }/>    
     <EBrowser 
         uischema={UIBrowserSchema}
         // searchable
         // searchableFields={['name','label']}
         entities={usersPromise}
         onDelete={()=>{}}
         onRead = {()=>{}}
         actions = {[
         { type :'delete' }
         ]}
      />
   </Switch>
   
  </React.Fragment>
 );

}

//Minimum Required Permission for the feature to be available
Object.defineProperty(Users,'path',{ get: () => '/users'});
Object.defineProperty(Users,'featureGroup',{ get: () => featureGroups.USER_MANAGEMENT});
// Object.defineProperty(Permissions,'primaryLink',{ get: () => true});
Object.defineProperty(Users,'requiredPermission',{ get: () => 'user_read' });

export default Users;