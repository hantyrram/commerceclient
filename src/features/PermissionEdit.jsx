import React, { Component } from 'react';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import {permission_edit as updatePermission} from './requesters';
import {emit} from '../actionEvent';
class PermissionEdit extends Component{
    
  constructor(props){
    super(props);
    this.state = {entity:{}}
  }
    componentDidMount(){
     emit('permission_edit_navigate');
    }
    
    onChange(e){
      let entity = Object.assign({},this.state.entity)
      switch(e.target.name){
        case 'name':entity.name = e.target.value;entity.label = this.state.entity.label;break;
        case 'label':entity.label = e.target.value;entity.name = this.state.entity.name;break;
        default:return;
      }
      this.setState({entity:entity});
      console.log(this.state);
    }

    onSubmit(){}

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
      <EntityForm title="Permission" formType="update" entity={entity} schema={schema} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)}/>
     )
    }
  }

  Object.defineProperty(PermissionEdit,'path',{get:()=>'/permissions/:name/edit'});
  Object.defineProperty(PermissionEdit,'requiredPermission',{get:()=>'permission_edit'});


  export default PermissionEdit;

  
  