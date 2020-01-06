import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';
import {
   useProduct_FetchAll
} from 'actions/useProduct';

import ActiveTable from 'components/ActiveTable';

function Products({history}){
   
   
   let { getStore } = useContext(StateContext);
   let {products} = getStore();
   let getProducts = useProduct_FetchAll();

   useEffect(()=>{
      getProducts();
   },[]);


   const columnHeaders = [
      { name: 'Product Name' },
      { type: 'Product Type' },
      { inStock: 'In Stock' },
      { netCost: 'Net Cost' },
   ]

   const activeTableSelectHandler = (rowData)=>{
      history.push({pathname: `/catalog/products/${rowData.name.replace(/\s/g,'-')}`, state:{ product:rowData} });
   }

   return(
      !products || products.length === 0? 'No Products' : 
      <div style={{minWidth: "100%"}}>
         <ActiveTable 
         key={'e1'}
         data={ products
               // products.reduce(function(acc,element){
               //    // let {_id, name, type, inStock, netCost,price} = element;
               //    // acc.push({_id,name, type, inStock, netCost,price});
               //    acc.push(element);
               //    return acc;
               // },[])
         } 
         columnHeaders={columnHeaders}
         hidden={['_id']}
         onRowClick={activeTableSelectHandler}
      />   
         
      </div>
   )
   
}

export default feature(Products,{
   title: 'Products',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/products/add">New Product</FeatureShortcutLink>
   ]
})




