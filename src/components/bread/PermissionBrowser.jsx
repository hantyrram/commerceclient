import React, { Component } from 'react';
import Permission from '../entities/Permission';
import Bread from '../components/Bread';
import EntityForm from '../components/EntityForm';

class PermissionAdder{

  onChange(){}
  
  onSubmit(){}

  render(){
    return <EntityForm type="add" schema={{name:1,label:1}} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)}/>
  }
} 
class PermissionReader{} 
class PermissionDeleter{} 
class PermissionEditor{} 
class PermissionBrowser{}

class PermissionFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <React.Fragment>
        <Bread />
      </React.Fragment>
     );
  }
}
 
export default PermissionFeature;