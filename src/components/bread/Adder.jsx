import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import EntityForm from '../components/EntityForm';
import Card from '../components/styled_elements/Card';
import PermissionRead from './PermissionRead';
import {permission_add as addPermission} from './requesters';
import {emit} from '../actionEvent';
/**
 * The default Entity Adder to use when the adder.component prop of Bread is null or undefined.
 */
class Adder extends Component{
    constructor(props){
     super(props);
     this.state = {
      entity:null,
     }
     this.onChange = this.onChange.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
    
    }
    
    onChange(e){
      let entity = Object.create(this.state.entity);
      entity[e.target.name] = e.target.value;
      this.setState({entity:entity});
    }

    onSubmit(e){
     e.preventDefault();
     entity.save().then()
    }

    render(){
     let schema = this.state.entity;
     return(
      <React.Fragment>
        {
         this.state.permission._id? <Redirect to={{pathname:PermissionRead.path.replace(":name",this.state.permission.name),state:{entity:this.state.permission}}}/>:
         <EntityForm title="Add Permission" formType="add" schema={this.state.entity} onSubmit={this.onSubmit} onChange={this.onChange}/>
        }
      </React.Fragment>
      
     )
    }
  }

  Object.defineProperty(PermissionAdd,'path',{get:()=>'/permissions/add'});
  Object.defineProperty(PermissionAdd,'requiredPermission',{get:()=>'permission_add'})

  export default PermissionAdd;

  
  