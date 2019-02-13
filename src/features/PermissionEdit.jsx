import React, { Component } from 'react';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import {permission_edit as updatePermission} from './requesters';
class PermissionEdit extends Component{
    
    constructor(props){
     super(props);
    //  console.log('Permission Read Mounted',this.props.location.state.permission);
    }
    
    componentDidMount(){
     
    }
    
    render(){
     const schema = {
       'name':1,
       'label': 1
     }
     return(
      // <Card>
      //   {/* <EntityForm title="Permission" formType="read" entity={this.props.location.state.permission} schema={schema} onSubmit={()=>{}} onChange={()=>{}}/> */}
        
      // </Card>
      <EntityForm title="Permission" formType="update" entity={this.props.entity} schema={schema} onSubmit={()=>{}} onChange={()=>{}}/>
     )
    }
  }

  // Object.defineProperty(PermissionRead,'path',{get:()=>'/permissions/:name'});
  Object.defineProperty(PermissionEdit,'requiredPermission',{get:()=>'permission_edit'})

  export default PermissionEdit;

  
  