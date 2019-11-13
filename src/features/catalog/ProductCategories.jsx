import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import ActiveTable from 'components/ActiveTable';
import feature from '../feature';
import axios from 'axios';
import SingleDepthDataTreeDiv from 'components/SingleDepthDataTreeDiv';
import useProductCategory_Create from 'actions/useProductCategory_Create';

function ProductCategories({history}){
   
   let [productCategories,setProductCategories] = useState(null);
   let createCategory = useProductCategory_Create();

   useEffect(()=>{
      (async ()=>{
         try {
            let {data} = await axios.get(`/apiv1/catalog/productcategories`);
            console.log(data);
            for(let e of data.resource){
               console.log(e);
            }
            if(data.ok){
               setProductCategories(data.resource);
            }
         } catch (error) {
            console.log(error);
         }
      })()
   },[]);


   function onSelect(selected){
      console.log(selected);
   }

   function onAdd(category){
      
      (async ()=>{
         try {
            if(category.parent === null){
               delete category.parent;
            }
            if(category.parent){
               category.parent = category.parent._id;
            }
            let data = await createCategory(category);
            
            if(data){
               setProductCategories([...productCategories,data]);
            }
         } catch (error) {
            console.log(error);
         }
      })()
   }

   return(
      !productCategories || productCategories.length === 0 ? 'No Product Categories' : 
      <div style={{minWidth: "100%",border:"1px solid grey"}}>
         <SingleDepthDataTreeDiv data={productCategories} rootName="Categories" onSelect={onSelect} onAdd={onAdd}/>
      </div>
   )
   
}

export default feature(ProductCategories,{
   title: 'Product Categories',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/productcategories/create">New Product Category</FeatureShortcutLink>
   ]
})




