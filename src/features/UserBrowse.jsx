import React, { Component } from 'react';
import EntityBrowser from '../components/EntityBrowser';
import FEATUREGROUPS from './featureGroups';
import axios from 'axios';
class UserBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      permissions:null
     }
  }

  async componentDidMount(){
    // let permissions = await axios.get('/apiv1/permissions');
  }
  
  render() { 
    
    return ( 
      <EntityBrowser />
     );
  }
}
Object.defineProperty(UserBrowse,'name',{get:()=>'Users'});
Object.defineProperty(UserBrowse,'path',{get:()=>'/users'});
Object.defineProperty(UserBrowse,'featureGroup',{get:()=>FEATUREGROUPS.USER_MANAGEMENT});
Object.defineProperty(UserBrowse,'primaryLink',{get:()=>true});
Object.defineProperty(UserBrowse,'requiredPermission',{get:()=>'user_browse'});
 
export default UserBrowse;