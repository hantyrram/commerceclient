import React, { Component } from 'react';
import featureGroups from '../featureGroups';
import Form from '../components/styled_elements/Form';
import Bread from '../../components/bread/Bread';
import Adder from '../../components/bread/Adder';
import Editor from '../../components/bread/Editor';
import Reader from '../../components/bread/Reader';
import {getRoute} from '../routes';

class Adder extends Component{
 return(
  <form action=""></form>
 )
}

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){}
  
  render() { 
    return ( 
      <Bread  Entity={Permission} />
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

Object.defineProperty(Permission,'actions',{value: actions, writable:false, configurable:false});
Object.defineProperty(Permission,'path',{value: '/permissions', writable:false, configurable:false});
Object.defineProperty(Permission,'primaryLink',{get:()=>true});
Object.defineProperty(Permission,'featureGroup',{get:()=>featureGroups.USER_MANAGEMENT});

export default Permission;