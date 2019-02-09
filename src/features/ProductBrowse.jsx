import React, { Component } from 'react';
import EntityBrowser from '../components/EntityBrowser';
import FEATUREGROUPS from './featureGroups';
import axios from 'axios';
class ProductBrowse extends Component {
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
      <EntityBrowser />
     );
  }
}
Object.defineProperty(ProductBrowse,'name',{get:()=>'Products'});
Object.defineProperty(ProductBrowse,'path',{get:()=>'/products'});
Object.defineProperty(ProductBrowse,'featureGroup',{get:()=>FEATUREGROUPS.CATALOG});
Object.defineProperty(ProductBrowse,'primaryLink',{get:()=>true});
Object.defineProperty(ProductBrowse,'requiredPermission',{get:()=>'product_browse'});
 
export default ProductBrowse;