import React from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import feature from '../feature';
import { ProductForm } from './forms';
import { Link } from 'react-router-dom';
import Feature from 'components/Feature';
import {ViewProducts} from './featureaction';
function Add(props){

   let { getAppState,dispatch } = useAppState();
   let { productCategories } = getAppState();
   const addProduct = useApiRequest('PRODUCT_CREATE',dispatch);
   const formSubmitHandler = (product)=>{
      
      // (async ()=>{
      //    let p = await createProduct(product);
      //    if(p){
      //       props.history.push({pathname: p.name.replace(/\s/g,'-'),state: { product:p }}); // create slug using product name
      //    }
      // })()      

      addProduct({payload: product});
   }

   return(
      //if ok,save on product,cancel don;t save
      <Feature 
         title ="Add New Product"
         actions = {[ViewProducts]}
      >
         <ProductForm onSubmit={formSubmitHandler} productCategories={productCategories}/>
      </Feature>
   )
}


export default Add;


