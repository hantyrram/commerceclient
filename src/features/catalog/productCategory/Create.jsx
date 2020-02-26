import React, { useState,useEffect, useRef } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import {useProductCategory_Create} from 'actions/ProductCategory';
import feature from '../../feature';

function Create(props){
   
   let createProductCategory = useProductCategory_Create();

   let [productCategory,setProductCategory] = useState({});
   
   const formChangeHandler = (e)=>{
      setProductCategory({...productCategory, [e.target.name]:e.target.value});
   }

   const formSubmitHandler = (e)=>{
      e.preventDefault();
      if(productCategory.parent === "" || productCategory.parent.length === 0){
         console.log(productCategory.parent.length);
         delete productCategory.parent;
      }
      
      createProductCategory(productCategory);
   }
   return(
      
      <React.Fragment>
         <form id="employeeIdVerify" action="#" onSubmit={formSubmitHandler}>
            <h3>Product Category</h3>
               <div>
                  <label htmlFor="name">Category Name</label>
                  <input type="text" name="name" value={productCategory.name} onChange={formChangeHandler} minLength="6"/>
               </div>
               <div>
                  <label htmlFor="parent">Parent Category Name</label>
                  <input type="text" name="parent" value={productCategory.parent} onChange={formChangeHandler} minLength="6"/>
               </div>
               <button type="submit" >Create Category</button>
         </form>
        
      </React.Fragment>
   )
   
}


export default feature(Create,{
   title: 'Product Categories / Create New',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/productcategories">View Product Categories</FeatureShortcutLink>
   ]
})



