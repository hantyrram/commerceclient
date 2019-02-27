import React, { Component } from 'react';
import featureGroups from '../featureGroups';
import Form from '../components/styled_elements/Form';
import Input from '../components/styled_elements/Input';
import Button from '../components/styled_elements/Button';
import Bread from '../../components/bread/Bread';
import {Permission} from '../entities';

class Adder extends Component{
 constructor(){
   super();
   this.state = {};
   this.onSubmit = this.onSubmit.bind(this);
   this.onChange = this.onChange.bind(this);
 }
 componentDidMount(){

 }
 onChange(e){
   let state = Object.assign({},this.state);
   state[e.target.name] = e.target.value;
   this.setState(state);
 }

 onSubmit(e){
   e.preventDefault();
   let permission = new Permission(this.state);
   permission.save();
 }

 render(){
  return(
    <Form onSubmit={this.onSubmit.bind(this)}>
      <label htmlFor="name">PermissionFeature Name</label>
      <Input id="permission-name" name="permission_name" value={this.state.name} onChange={this.onChange}/>
      <label htmlFor="label">PermissionFeature Label</label>
      <Input id="permission-label" name="permission_label" value = {this.state.label} onChange={this.onChange}/>
      <Button primary>Save</Button>
    </Form>
   )
 }
}

class PermissionFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){}
  
  render() { 
    let Adder = this.props.user && this.props.user.hasPermission('permission_add')?Adder:null;
    let Editor = this.props.user && this.props.user.hasPermission('permission_edit')?Editor:null;
    let browser = this.props.user && this.props.user.hasPermission('permission_browse')?true:false;
    return ( 
      <Bread adder={Adder} editor={Editor} browser={browser} Entity={Permission} />
     );
  }
}
 
let actions = [
 'permission_browse',
 'permission_read',
 'permission_edit',
 'permission_add',
 'permission_delete'
];

Object.defineProperty(PermissionFeature,'actions',{value: actions, writable:false, configurable:false});
Object.defineProperty(PermissionFeature,'path',{value: '/permissions', writable:false, configurable:false});
Object.defineProperty(PermissionFeature,'primaryLink',{get:()=>true});
Object.defineProperty(PermissionFeature,'featureGroup',{get:()=>featureGroups.USER_MANAGEMENT});

export default PermissionFeature;