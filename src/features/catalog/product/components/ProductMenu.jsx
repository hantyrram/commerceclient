import React, { useEffect } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

export default (props)=>{
   
   let generalPath = '';   
   let pricingPath = '';
   let inventoryPath = '';

   if(props.product && props.product.name){
      let slug = props.product.name.replace(/\s/g,'-');
      generalPath = `/catalog/products/${slug}/`;
      pricingPath =`/catalog/products/${slug}/pricing`;
      inventoryPath = `/catalog/products/${slug}/inventory`;
   }
   
   return(
      <MenuList>
         <MenuItem>
            <Link to={generalPath}> General</Link>
         </MenuItem>
         <MenuItem>
            <Link to={pricingPath}>Pricing</Link>
         </MenuItem>
         <MenuItem>
         <Link to={inventoryPath}>Inventory</Link>
         </MenuItem>
         <MenuItem>Shipping</MenuItem>
         <MenuItem>Attributes</MenuItem>
         <MenuItem>Variants</MenuItem>
         <MenuItem>Images</MenuItem>
      </MenuList>    
   )
}

