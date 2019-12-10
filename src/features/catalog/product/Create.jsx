import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import {
   useProduct_Create
} from 'actions/useProduct';

import StateContext from 'contexts/StateContext';
import feature from '../../feature';
import Dialog from '@material-ui/core/Dialog';
import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Create(props){
   
   // let createProduct = useProduct_Create();

   let [product,setProduct] = useState({});
   let [openAddRoleDialog,setOpenAddRoleDialog] = useState(false);
   let [selected,setSelected] = useState({_id:'root'});
   let { getStore } = useContext(StateContext);
   let {productCategories} = getStore();
   let createProduct = useProduct_Create();

   const formChangeHandler = (e)=>{
      setProduct({...product, [e.target.name]:e.target.value});
      console.log(product);
   }

   const selectCategoryModalTriggerHandler = (e)=>{
      e.preventDefault();
      setOpenAddRoleDialog(true);
   }

   const selectCategoryModalOkHandler = (e) => {
      if(selected._id !== 'root'){
         setProduct({...product, category: selected});
         setOpenAddRoleDialog(false);
      }
   }

   const selectCategoryModalCancelHandler = (e) => {
      setOpenAddRoleDialog(false);
   }

   const formSubmitHandler = (e)=>{
      e.preventDefault();
      console.log(product);
      createProduct({...product, category: selected._id !== 'root'? selected: null});
   }

   const categoriesOnSelectHandler = s => {
      console.log('Selected',s);
      setSelected(s);
   }

   return(
      //if ok,save on product,cancel don;t save
      <React.Fragment>
         <form id="employeeIdVerify" action="#" onSubmit={formSubmitHandler}>
               <h3>New Product</h3>
               <hr/>
               <div>
                  <a href="#" onClick={selectCategoryModalTriggerHandler}>
                     {product.category? 'Change Product Category': 'Select Product Category'}
                  </a> {product.category? product.category.name: null}
               </div>
               <div className="form-input-control">
                  <label htmlFor="name">Product Name</label>
                  <input type="text" name="name" id="product-name" value={product.name} onChange={formChangeHandler} minLength="2"/>                  
               </div>
               <div className="form-input-control">
                  <label htmlFor="description">Product Description</label>
                  <input type="text" name="description" id="product-description" value={product.description} onChange={formChangeHandler} />
               </div>
               <div className="form-input-control">
                  <label htmlFor="type">Product Type</label>
                  <select name="type" id="product-type" value={product.type} onChange={formChangeHandler}>
                     <option value="standard">Standard</option>
                     <option value="bundled">Bundled</option>
                  </select>
               </div >
               <div className="form-input-control">
                  <label htmlFor="inStock">Stock Status</label>
                  <select name="inStock" id="product-stockstatus" value={product.stockStatus} onChange={formChangeHandler}>
                     <option value={true}>In-Stock</option>
                     <option value={false}>Out Of Stock</option>
                  </select>
               </div>
               <div className="form-input-control">
                  <label htmlFor="inStock">EAN / Barcode</label>
                  <input type="text" name="netCost" value={product.cost} onChange={formChangeHandler} />
               </div>
           
               <div className="form-input-control">
                  <label htmlFor="cost">Net Cost</label>
                  <input type="text" name="netCost" value={product.cost} onChange={formChangeHandler} />
               </div>      
               <button type="submit" >Save Product</button>
         </form>
         <Dialog open={openAddRoleDialog} fullWidth >
            <SCategory category={{name: 'Categories', _id: 'root'}} 
               data={productCategories === undefined? []: productCategories}  selected={selected} 
               onSelect={categoriesOnSelectHandler} 
            />
            <div className="actions-container button-actions-container" style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
               <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={selectCategoryModalCancelHandler}>Cancel</Button>
               <Button variant="contained" color="primary"  onClick={selectCategoryModalOkHandler}>Ok</Button>
            </div>
           
         </Dialog>
      </React.Fragment>
   )
}


export default feature(Create,{
   title: 'Product / Create New',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/products">View Products</FeatureShortcutLink>
   ]
})



