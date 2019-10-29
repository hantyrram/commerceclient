import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import ActiveTable from 'components/ActiveTable';
import feature from '../feature';
import axios from 'axios';
import SingleDepthDataTree from 'components/SingleDepthDataTree';

function ProductCategories({history}){
   
   let [productCategories,setProductCategories] = useState(null);

   useEffect(()=>{
      (async ()=>{
         try {
            let {data} = await axios.get(`/apiv1/catalog/productcategories`);
            if(data.ok){
               setProductCategories(data.resource);
            }
         } catch (error) {
            console.log(error);
         }
      })()
   },[]);

   useEffect(()=>{

      let categories = [
         {name: "Clothing"},
         {name: "Pants", parent: "Clothing"},
         {name: "Skirts", parent: "Clothing"},
         {name: "Collectibles"},
         {name: "Gaming Accessories"},
         {name: "Audio Devices",parent: "Gaming Accessories"},
         {name: "Mini Skirt",parent: "Skirts"},
      ]

     
   },[])

   const onRowClick = (rowData)=>{
      history.replace(`/productcategories/${rowData._id}`, {state: rowData});
   }

   const columnHeaders = [
      { name: 'Category Name' },
      { parent: 'Parent Category' }
   ]
   return(
      !productCategories || productCategories.length === 0 ? 'No Product Categories' : 
      // <ActiveTable 
      //    key={'e1'}
      //    data={productCategories} 
      //    columnHeaders={columnHeaders}
      //    hidden={['_id']}
      //    onRowClick={onRowClick}
      // />
      <div style={{minWidth: "100%",border:"1px solid grey"}}>
         <SingleDepthDataTree data={productCategories} rootName="Categories" />
      </div>
   )
   
}

export default feature(ProductCategories,{
   title: 'Product Categories',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/productcategories/create">New Product Category</FeatureShortcutLink>
   ]
})




