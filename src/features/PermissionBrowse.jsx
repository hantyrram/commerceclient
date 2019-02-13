import React, { Component } from 'react';
import {permission_browse as getPermissions} from './requesters';
import EntityBrowser from '../components/EntityBrowser';
import PermissionAdd from './PermissionAdd';
import PermissionRead from './PermissionRead';
import FEATUREGROUPS from './featureGroups';
import Card from '../components/styled_elements/Card';
import {Link} from 'react-router-dom';
import axios from 'axios';
class PermissionBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      permissions:null,
      read:false,
      readEntity:null
     }

  }

  async componentDidMount(){
    let response = await getPermissions();
    this.setState({permissions:response.data.data.permissions});
  }
  
  onAdd(e){
   console.log('Adding New Record');
  }

  onRead(entity){
    console.log('Editing',entity);
    this.setState({})
  }

  render() { 
    let onAdd = this.props.user.hasPermission(PermissionAdd.requiredPermission)?this.onAdd.bind(this):null;
    let onRead = this.props.user.hasPermission(PermissionAdd.requiredPermission)?this.onEdit.bind(this):null;
    return ( 
      <React.Fragment>
        <Card display={this.state.read?'block':'none'} >
          <PermissionRead  entity={this.state.readEntity}/>
        </Card>
        <Card>
          {this.props.user.hasPermission(PermissionAdd.requiredPermission)?<Link to={PermissionAdd.path} >Add New Permission</Link>:null}
          {/* <EntityBrowser onEdit={onEdit} onAdd={onAdd} title={PermissionBrowse.name} entities={this.state.permissions} follow={{pathname:PermissionRead.path,column:'name',entityName:'permission'}}/> */}
          <EntityBrowser onRead={onRead} onAdd={onAdd} title={PermissionBrowse.name} entities={this.state.permissions} />
        </Card>
      </React.Fragment>
      
     );
  }
}
Object.defineProperty(PermissionBrowse,'name',{get:()=>'Permissions'});
Object.defineProperty(PermissionBrowse,'path',{get:()=>'/permissions'});
Object.defineProperty(PermissionBrowse,'featureGroup',{get:()=>FEATUREGROUPS.USER_MANAGEMENT});
Object.defineProperty(PermissionBrowse,'primaryLink',{get:()=>true});
Object.defineProperty(PermissionBrowse,'requiredPermission',{get:()=>'permission_browse'});
 
export default PermissionBrowse;