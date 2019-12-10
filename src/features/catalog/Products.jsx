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
      { price: 'Selling Price' },
   ]

   const activeTableSelectHandler = (rowData)=>{
      history.replace(`/catalog/products/${rowData._id}/edit`, {state: rowData});
   }

   return(
      !products || products.length === 0? 'No Products' : 
      <div style={{minWidth: "100%",border:"1px solid grey"}}>
         <ActiveTable 
         key={'e1'}
         data={
               products.reduce(function(acc,element){
                  let {_id, name, type, inStock, netCost, price } = element;
                  acc.push({_id,name, type, inStock, netCost, price});
                  return acc;
               },[])
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
      <FeatureShortcutLink to="/catalog/products/create">New Product</FeatureShortcutLink>
   ]
})




