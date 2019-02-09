import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import {permission_add as addPermission} from './requesters';
class PermissionAdd extends Component{
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
      console.log('Add Permission Response');
      this.setState({permission: response.data.data.permission});
     }).catch(e=>console.log(e));
    }

    render(){
     const schema = this.state.permission;
     if(this.state.permission && this.state.permission._id){
      return <Redirect to={{pathname: `/permissions/${this.state.permission.name}`,state:{permission:this.state.permission}}} />
     }

     return(
      <Card>
        <EntityForm formType="add" schema={schema} onSubmit={this.onSubmit} onChange={this.onChange}/>
      </Card>
     )
    }
  }

  Object.defineProperty(PermissionAdd,'path',{get:()=>'/permissions/add'});
  Object.defineProperty(PermissionAdd,'requiredPermission',{get:()=>'permission_add'})

  export default PermissionAdd;

  
  