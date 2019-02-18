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
     return(
      <EntityForm title="Permission" formType="read" entity={this.props.entity} schema={schema} onSubmit={()=>{}} onChange={()=>{}}/>
     )
    }
  }

  Object.defineProperty(PermissionRead,'path',{get:()=>'/permissions/:name'});
  Object.defineProperty(PermissionRead,'requiredPermission',{get:()=>'permission_read'})

  export default PermissionRead;

  
  