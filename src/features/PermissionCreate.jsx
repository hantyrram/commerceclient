import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import PermissionRead from './PermissionRead';
import {permission_create as addPermission} from './requesters';
import {emit} from '../actionEvent';
class PermissionCreate extends Component{
    constructor(props){
     super(props);
     this.state = {
      permission: {
        name:'',
        label:''
      }
     }
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
    
    }
    
    onChange(e){
      let permission = this.state.permission;
      switch(e.target.name){
        case 'name':permission.name = e.target.value;break;
        case 'label':permission.label = e.target.value;break;
        default:break;
      }
      this.setState({permission:permission});
    }

    onSubmit(e){
     e.preventDefault();
     addPermission(this.state.permission)
     .then(response=>{
      let artifact = response.data;
      emit('permission_create',artifact);
      if(artifact.status === 'ok'){
        this.setState({permission: artifact.data.entity})
      }
     }).catch(e=>{
      console.log(e);
     });
    }

    render(){
     
     return(
      <React.Fragment>
        {
         this.state.permission._id? <Redirect to={{pathname:PermissionRead.path.replace(":name",this.state.permission.name),state:{entity:this.state.permission}}}/>:
         <EntityForm title="New Permission" formType="add" schema={this.state.permission} onSubmit={this.onSubmit} onChange={this.onChange}/>
        }
      </React.Fragment>
      
     )
    }
  }

  Object.defineProperty(PermissionCreate,'path',{get:()=>'/permissions/add'});
  Object.defineProperty(PermissionCreate,'requiredPermission',{get:()=>'permission_create'})

  export default PermissionCreate;

  
  