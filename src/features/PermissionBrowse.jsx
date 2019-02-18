import React, { Component } from 'react';
import {permission_browse as getPermissions} from './requesters';
import {permission_delete as deletePermission} from './requesters';
import EntityBrowser from '../components/EntityBrowser';
import PermissionAdd from './PermissionAdd';
import PermissionRead from './PermissionRead';
import PermissionEdit from './PermissionEdit';
import FEATUREGROUPS from './featureGroups';
import Card from '../components/styled_elements/Card';
import {Link,Route} from 'react-router-dom';
import axios from 'axios';
import { isRegExp } from 'util';
import { Switch } from '../../node_modules/react-router-dom';
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
    let response = await getPermissions();
    this.setState({permissions:response.data.data.permissions});
  }
  
  onAdd(){
   this.setState({currentAction:'add',currentActionableEntity:null});
  }

  onAddResult(artifact){
   console.log(artifact);
   if(artifact.status === 'ok'){
    this.setState({currentAction:'edit',currentActionableEntity:artifact.data.permission});
   }
  }

  onRead(entity){
    this.setState({currentAction:'read',currentActionableEntity:entity});
  }

  onEdit(entity){
   this.setState({currentAction:'edit',currentActionableEntity:entity});
  }

  onDelete(entity){
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
    let onAdd = this.props.user.hasPermission(PermissionAdd.requiredPermission)?this.onAdd.bind(this):null;
    let onRead = this.props.user.hasPermission(PermissionRead.requiredPermission)?this.onRead.bind(this):null;
    let onEdit = this.props.user.hasPermission(PermissionEdit.requiredPermission)?this.onEdit.bind(this):null;
    return ( 
      <React.Fragment>
        {this.state.currentAction? 
        <Card closable onClose={this.onClose.bind(this)}>
          {this.state.currentAction === 'add'?<PermissionAdd onAddResult={this.onAddResult.bind(this)}/>:null}
          {this.state.currentAction === 'read'?<PermissionRead  entity={this.state.currentActionableEntity}/>:null}
          {this.state.currentAction === 'edit'?<PermissionEdit  entity={this.state.currentActionableEntity}/>:null}
          {
            // <Switch>
            // {this.state.currentAction === 'read'?
            //   <Route path={{pathname:PermissionAdd.path,state:this.state.currentActionableEntity}} render={(props)=>{return <PermissionRead entity={this.state.currentActionableEntity} /> }} />
            // :null
            // }
            // </Switch>
          }
        </Card>
        :null}
        <Card>
          {/* <EntityBrowser onEdit={onEdit} onAdd={onAdd} title={PermissionBrowse.name} entities={this.state.permissions} follow={{pathname:PermissionRead.path,column:'name',entityName:'permission'}}/> */}
          <EntityBrowser onEdit={onEdit} onRead={onRead} onDelete={this.onDelete.bind(this)} onAdd={onAdd} title={PermissionBrowse.name} entities={this.state.permissions} />
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