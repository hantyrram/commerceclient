import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import {
   useProduct_Create
} from 'actions/Product';

import useAppStore from 'hooks/useAppStore';
import feature from '../../feature';

import ProductForm from './components/ProductForm';


function Add(props){

   let { getAppState } = useAppStore();
   let {productCategories} = getAppState();
   let createProduct = useProduct_Create();

   const formSubmitHandler = (product)=>{
      
      (async ()=>{
         let p = await createProduct(product);
         if(p){
            props.history.push({pathname: p.name.replace(/\s/g,'-'),state: { product:p }}); // create slug using product name
         }
      })()      
   }

   return(
      //if ok,save on product,cancel don;t save
      <div id="product-form-container">
         <h4>New Product</h4>
         <hr/>
         <ProductForm onSubmit={formSubmitHandler} productCategories={productCategories}/>
      </div>
   )
}


export default feature(Add,{
   title: 'Product / Create New',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/products">View Products</FeatureShortcutLink>
   ]
})



