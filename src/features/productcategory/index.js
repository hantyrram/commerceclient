import React, { useEffect, useState } from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import feature from '../feature';
import { CategoryTree } from './components';
import Feature from 'components/Feature';
// import {
//    useProductCategory_Create,
//    useProductCategory_Delete,
//    useProductCategory_Fetch
// } from 'actions/ProductCategory';


function ProductCategories({history}){
   
   
   let { getAppState, dispatch} = useAppState();
   let {productCategories} = getAppState();
   let [selected,setSelected] = useState({_id: 'root'});

   let getCategories = useApiRequest('PRODUCTCATEGORY_LIST',dispatch, ({responseData})=>{
      return responseData.resource;
   });

   let createCategory = useApiRequest('PRODUCTCATEGORY_CREATE',dispatch,({responseData})=>{
      return responseData.resource;
   });
   
   let deleteCategory = useApiRequest('PRODUCTCATEGORY_DELETE',dispatch);



   useEffect(()=>{
      getCategories();
   },[]);


   function onSelect(s){
      console.log('Selected: ',s);
      setSelected(s);
   }

   function onDelete(category){
      console.log('Deleting',category);
      (async function(){
         await deleteCategory( 
               {params: {productcategoryId: category._id}}
               );
         getCategories();
      })()
   }

   function onAdd(newCategory,parent){
      let category = {
         name: newCategory
      }
      
      if(parent){
         category.parent = parent._id;
      }
      
      createCategory({payload: category});
   }

   return(
      // !productCategories || productCategories.length === 0 ? 'No Product Categories' : 
      <Feature 
         title="Product Categories"
         // actions={<Link to="/catalog/productcategories/create">Add New Category</Link>}
      >
         {/* <SingleDepthDataTreeDiv data={productCategories} rootName="Categories" onSelect={onSelect} onAdd={onAdd}/> */}
         
         <div style={{width:"100%",border:"1px solid #cbc7c7"}}>
            <CategoryTree category={{name: 'Categories', _id: 'root'}} 
               data={productCategories === undefined? []: productCategories}  selected={selected} 
               onSelect={onSelect} 
               onAdd={onAdd} 
               onDelete={onDelete}
            />
         </div>
      </Feature>
   )
   
}

export default ProductCategories;




