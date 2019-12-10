import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import feature from '../feature';
import SCategory from 'components/SCategory';
import useProductCategory_Create from 'actions/useProductCategory_Create';
import useProductCategory_Delete from 'actions/useProductCategory_Delete';
import useProductCategory_Fetch from 'actions/useProductCategory_Fetch';

function ProductCategories({history}){
   
   
   let { getStore } = useContext(StateContext);
   let {productCategories} = getStore();
   let [selected,setSelected] = useState({_id: 'root'});
   let createCategory = useProductCategory_Create();
   let getCategories = useProductCategory_Fetch();
   let deleteCategory = useProductCategory_Delete();

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
         await deleteCategory(category);
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
      
      createCategory(category);
   }

   return(
      // !productCategories || productCategories.length === 0 ? 'No Product Categories' : 
      <div style={{minWidth: "100%",border:"1px solid grey"}}>
         {/* <SingleDepthDataTreeDiv data={productCategories} rootName="Categories" onSelect={onSelect} onAdd={onAdd}/> */}
         <SCategory category={{name: 'Categories', _id: 'root'}} 
            data={productCategories === undefined? []: productCategories}  selected={selected} 
            onSelect={onSelect} 
            onAdd={onAdd} 
            onDelete={onDelete}
         />
      </div>
   )
   
}

export default feature(ProductCategories,{
   title: 'Product Categories',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/productcategories/create">New Product Category</FeatureShortcutLink>
   ]
})




