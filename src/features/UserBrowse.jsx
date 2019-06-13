import React, { Component } from 'react';
import EntityBrowser from '../components/EntityBrowser';
import FEATUREGROUPS from './featureGroups';
import { user_browse as get_users} from './requesters';
import axios from 'axios';
class UserBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users:null
     }
  }

  async componentDidMount(){
    try {
     let response = await get_users(); 
     this.setState({users: response.data.data.entity});
     console.log(response);
    } catch (error) {
     
    }
  }
  
  render() { 
    
    return ( 
      <EntityBrowser entities={this.state.users}/>
     );
  }
}
Object.defineProperty(UserBrowse,'name',{get:()=>'Users'});
Object.defineProperty(UserBrowse,'path',{get:()=>'/users'});
Object.defineProperty(UserBrowse,'featureGroup',{get:()=>FEATUREGROUPS.USER_MANAGEMENT});
Object.defineProperty(UserBrowse,'primaryLink',{get:()=>true});
Object.defineProperty(UserBrowse,'requiredPermission',{get:()=>'user_browse'});
 
export default UserBrowse;