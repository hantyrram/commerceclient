import React, { Component } from 'react';
import {permission_browse as getPermissions} from './requesters';
import {permission_delete as deletePermission} from './requesters';
import EntityBrowser from '../components/EntityBrowser';
import PermissionCreate from './PermissionCreate';
import PermissionRead from './PermissionRead';
import PermissionEdit from './PermissionEdit';
import FEATUREGROUPS from './featureGroups';
import Card from '../components/styled_elements/Card';
import {Link,Route,Router} from 'react-router-dom';
import axios from 'axios';
import { isRegExp } from 'util';
import { Switch, withRouter } from 'react-router-dom';
/**
 * 
 */
class PermissionBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      permissions:null,
      currentAction:null,
      currentActionableEntity:null
     }
  }

  async componentDidMount(){
    console.log(this.props);
    let response = await getPermissions();
    this.setState({permissions:response.data.data.entity});
  }
  
  onAdd(){
   this.setState({currentAction:'add',currentActionableEntity:null});
  }

  onAddResult(artifact){
   if(artifact.status === 'ok'){
    let permissions = Object.assign(this.state.permissions);
    permissions.unshift(artifact.data.permission);
    this.setState({currentAction:'read',currentActionableEntity:artifact.data.permission,permissions:permissions});
   }
  }

  onRead(entity){
    this.setState({currentAction:'read',currentActionableEntity:entity});
  }

  onEdit(entity){
   this.setState({currentAction:'edit',currentActionableEntity:entity});
    this.props.history.push(PermissionEdit.path.replace(":name",entity.name),{entity:entity});
  }

  onDelete(entity){
   console.log('On Delete Called');
   let _self = this;
   if(this.state.permissions && Object.getOwnPropertyNames(this.state.permissions).length > 0){
     (async ()=>{
       let deleteResponse = await deletePermission(entity);
       console.log(deleteResponse);
       if(deleteResponse.status === 'ok'){
        console.log(deleteResponse.data);  
       }
       let {data} = await getPermissions();
       console.log(data.data.permissions);
       _self.setState({permissions:data.data.permissions});
     })()
     
     
   }
  }

  onClose(){
   this.setState({currentAction:null});
  }
   
  

  render() { 
    let onAdd = this.props.user.hasPermission(PermissionCreate.requiredPermission)?this.onAdd.bind(this):null;
    let onRead = this.props.user.hasPermission(PermissionRead.requiredPermission)?this.onRead.bind(this):null;
    let onEdit = this.props.user.hasPermission(PermissionEdit.requiredPermission)?this.onEdit.bind(this):null;
    return ( 
      <React.Fragment>
         <Switch>
          <Route exact path={PermissionRead.path} render={(props)=>{return <PermissionRead {... props} entity={{}} /> }} />
          <Route  exact path={PermissionEdit.path} render={(props)=>{return <PermissionEdit {... props}  entity={{}} /> }} />
          <Route  exact path={PermissionCreate.path} render={(props)=>{return <PermissionCreate {... props}  /> }} />
         </Switch>
        <Card>
          {/* <EntityBrowser onEdit={onEdit} onAdd={onAdd} title={PermissionBrowse.name} entities={this.state.permissions} follow={{pathname:PermissionRead.path,column:'name',entityName:'permission'}}/> */}
          <EntityBrowser Reader={PermissionRead} Editor={PermissionEdit} Adder={PermissionCreate} onDelete={this.onDelete.bind(this)}  title={PermissionBrowse.name} entities={this.state.permissions} />
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