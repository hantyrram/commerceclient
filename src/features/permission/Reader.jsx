import React, { Component } from 'react';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import {permission_add as addPermission} from './requesters';
import PermissionEdit from './PermissionEdit';
class PermissionRead extends Component{
    render(){
     let entity = this.props.location && this.props.location.state && this.props.location.state.entity? this.props.location.state.entity:{}; //else fetch using paramname

     let onEdit = ()=>{
       this.props.history.push(this.props.location.pathname + '/edit',{entity:entity});
     }
     const schema = {
       'name':1,
       'label': 1,
       'createdBy':{editable:false},
       'createdOn':{editable:false},
       'modifiedOn':{editable:false}
     }
     
     return(
      <EntityForm title="Permission" formType="read" entity={entity} schema={schema} onEdit={onEdit} onChange={()=>{}}/>
     )
    }
  }

  Object.defineProperty(PermissionRead,'path',{get:()=>'/permissions/:name'});
  Object.defineProperty(PermissionRead,'requiredPermission',{get:()=>'permission_read'})

  export default PermissionRead;

  
  