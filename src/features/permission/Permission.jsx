import React, { Component } from 'react';
import Bread from '../../components/bread/Bread';
import Adder from '../../components/bread/Adder';
import Editor from '../../components/bread/Editor';
import Reader from '../../components/bread/Reader';
import {getRoute} from '../routes';



class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    let PermissionAdder = this.props.user.hasPermission('permission_add')? Adder: null;
    PermissionAdder.path = getRoute('permission_add');
    let PermissionEditor = this.props.user.hasPermission('permission_edit')? Adder: null;
    PermissionEditor.path = getRoute('permission_edit');
    let PermissionRead = this.props.user.hasPermission('permission_read')? Adder: null;
    PermissionRead.path = getRoute('permission_read');
    let PermissionBrowse = this.props.user.hasPermission('permission_browse')? Adder: null;//use default browser
    PermissionBrowse.path = getRoute('permission_browse');

    return ( 
      <Bread Adder={PermissionAdder} Editor={PermissionEditor} Reader={PermissionRead} Entity={Permission} />
     );
  }
}
 
export default Permission;