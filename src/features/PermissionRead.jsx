import React, { Component } from 'react';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import {permission_add as addPermission} from './requesters';
class PermissionRead extends Component{
    render(){
     const schema = {
       'name':1,
       'label': 1
     }
     let entity = this.props.location && this.props.location.state && this.props.location.state.entity? this.props.location.state.entity:{}; //else fetch using paramname
     return(
      <EntityForm title="Permission" formType="read" entity={entity} schema={schema} onSubmit={()=>{}} onChange={()=>{}}/>
     )
    }
  }

  Object.defineProperty(PermissionRead,'path',{get:()=>'/permissions/:name'});
  Object.defineProperty(PermissionRead,'requiredPermission',{get:()=>'permission_read'})

  export default PermissionRead;

  
  