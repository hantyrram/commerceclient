import React, { Component } from 'react';
import EntityBrowser from '../components/EntityBrowser';
import Card from '../components/styled_elements/Card';
import FEATUREGROUPS from './featureGroups';
import axios from 'axios';
class OrderBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      permissions:null
     }
  }

  async componentDidMount(){
    // let permissions = await axios.get('/apiv1/permissions');
  }
  
  render() { 
    return ( 
      <Card>
       <EntityBrowser />
      </Card>
     );
  }
}
Object.defineProperty(OrderBrowse,'name',{get:()=>'Orders'});
Object.defineProperty(OrderBrowse,'path',{get:()=>'/orders'});
Object.defineProperty(OrderBrowse,'featureGroup',{get:()=>FEATUREGROUPS.CUSTOMER});
Object.defineProperty(OrderBrowse,'primaryLink',{get:()=>true});
Object.defineProperty(OrderBrowse,'requiredPermission',{get:()=>'order_browse'});
 
export default OrderBrowse;