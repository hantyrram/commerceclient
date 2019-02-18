import React, { Component } from 'react';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import {permission_edit as updatePermission} from './requesters';
class PermissionEdit extends Component{
    
   
    componentDidMount(){
     
    }
    
    render(){
     const schema = {
       'name':1,
       'label': 1
     }
     let entity = this.props.location && this.props.location.state && this.props.location.state.entity? this.props.location.state.entity:{}; //else fetch using paramname
     return(
      // <Card>
      //   {/* <EntityForm title="Permission" formType="read" entity={this.props.location.state.permission} schema={schema} onSubmit={()=>{}} onChange={()=>{}}/> */}
        
      // </Card>
      <EntityForm title="Permission" formType="update" entity={entity} schema={schema} onSubmit={()=>{}} onChange={()=>{}}/>
     )
    }
  }

  Object.defineProperty(PermissionEdit,'path',{get:()=>'/permissions/:name/edit'});
  Object.defineProperty(PermissionEdit,'requiredPermission',{get:()=>'permission_edit'});


  export default PermissionEdit;

  
  