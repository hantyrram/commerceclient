import React, { useEffect, useState,useRef } from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import { CategoryTree } from '../productcategory/components';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {makeStyles} from '@material-ui/core';
import useForm from 'hooks/useForm';

const useChipStyle = makeStyles({
   root: {
      width: "fit-content",
      marginLeft: "1em"
   }
})

export function ProductForm({ product = {} }){
   const chipClasses = useChipStyle();
   let { getAppState, dispatch } = useAppState();
   let { productCategories } = getAppState();
   let fetchProductCategories = useApiRequest('PRODUCTCATEGORY_LIST',dispatch);
   let updateProduct = useApiRequest('PRODUCT_UPDATE',dispatch);
   let addProduct = useApiRequest('PRODUCT_ADD',dispatch);
   let categoryRef = useRef();

   const onSubmitCallback = ({values,changedValues})=>{
      if(!product._id){
         addProduct({payload: changedValues });
         return;
      }
      updateProduct({ 
         params: { productId: product._id },
         payload: changedValues 
      })
   }

   let {values, onChange, onSubmit, errors,changedValues,setFormFieldValue} = useForm({initialValues: product, onSubmitCallback });
   
   let [selectedCategory,setSelectedCategory] = useState({_id:'root'});
   let [openSelectCategoryDialog,setOpenSelectCategoryDialog] = useState(false);

   const categoriesOnSelectHandler = s => {
      
      setSelectedCategory(s);
   }
   const selectCategoryModalTriggerHandler = (e)=>{
      e.preventDefault();
      setOpenSelectCategoryDialog(true);
   }

   const selectCategoryModalOkHandler = (e) => {
      if(selectedCategory._id !== 'root'){
         values.category = selectedCategory;
         values.category_id = selectedCategory._id;
         changedValues.category_id = selectedCategory._id;
         setOpenSelectCategoryDialog(false);
      }
   }

   const selectCategoryModalCancelHandler = (e) => {
      setOpenSelectCategoryDialog(false);
   }

   const productNameChangeHandler = e => {
      setFormFieldValue({ name: e.target.value, slug: e.target.value.replace(/\s/g,'-')})
   }

   const removeCategory = ()=>{
      // setProduct(Object.assign({...p},{category:null}));
      values.category = null;
   }

   useEffect(()=>{
      fetchProductCategories();
   },[])

   return(
     
      <div className="feature-context">
         <div className="feature-context-title">
            Basic Product Info
         </div>
         <form id="product-add" action="#" onSubmit={onSubmit} className="grid-form">   
            <div className="form-control">
               <span>
                  <a id="selectcategory-dialog-trigger" href="#" onClick={selectCategoryModalTriggerHandler} >
                     {values.category? 'Change Product Category': 'Select Product Category'}
                  </a>
               </span>
               {/* <span> */}
                  {/* using hidden input element to be able to utilize onChange of useForm */}
                  {/* Chip is used as some kind of proxy for the ui */}
                  <input ref={categoryRef} type="hidden" name={values.category} className="form-control-input"/> 
                  {
                      values.category ? 
                        <Chip size="small" className={chipClasses.root} label={values.category.name} onDelete={removeCategory} /> 
                     : null
                  }
               {/* </span> */}
               
            </div>   
            <div className="form-control">
               <label htmlFor="name" className="required">Product Name</label>
               <input type="text" name="name" id="product-name" value={values.name} onChange={productNameChangeHandler} minLength="4" className="form-control-input large" required/>                  
               <label className="field-description">The display name of the product</label>
            </div>
            <div className="form-control">
               <label htmlFor="type" className="required">Product Type</label>
               <select name="type" id="product-type" value={values.type} onChange={onChange} className="form-control-input">
                  <option value="standard">Standard</option>
                  <option value="bundled">Bundled</option>
               </select>
            </div >
            
            <div className="form-control">
               <label htmlFor="name" className="required">Slug</label>
               <input type="text" name="slug" id="product-slug" 
                  // value={values.slug || values.name.replace(/\s/g,'-')} 
                  value={values.slug} 
                  onChange={onChange} minLength="4" 
                  className="form-control-input"
               />                  
               <label className="field-description">URL friendly name</label>
            </div>
            {/* <div className="form-control">
               <label htmlFor="slug">Slug</label>
               <input type="text" name="slug" id="product-slug" value={p.slug} onChange={onChange} minLength="4"/>                  
               <label className="field-description">The display name of the product</label>
            </div> */}
            {/* <div className="form-control">
               <label htmlFor="itemCondition">Item Condition</label>
               <select name="itemCondition" id="product-stockstatus" value={values.itemCondition} onChange={onChange} className="form-control-input">
                  <option value="new">New</option>
                  <option value="used">Used</option>
               </select>
            </div> */}
            
            <div className="form-control">
               <label htmlFor="description">Product Description</label>
               <textarea style={{minHeight:"10em",maxWidth:"100%"}}type="text" 
                  name="description" id="product-description" value={values.description} onChange={onChange} className="form-control-input"/>
               <label className="field-description">This information will be displayed alongside the product on the customers screen.</label>
            </div>      
            {/* <div className="form-control">
               <label htmlFor="ean">EAN / Barcode</label>
               <input type="text" name="ean" value={product.ean} onChange={onChange} />
            </div> */}
            {/* <div className="form-control">
               <label htmlFor="upc">UPC (Universal Product Code)</label>
               <input type="text" name="upc" value={product.upc} onChange={onChange} />
            </div> */}
            <div className="form-control">
               <label htmlFor="netCost" className="required">Product Acquisition Cost</label>
               <input type="text" name="netCost" value={values.netCost} onChange={onChange} className="form-control-input"/>
               <label className="field-description">The cost of acquiring the product</label>
            </div>      
            
            <div className="form-control-action">
               <Button type="submit" variant="contained" color="primary">Save Product</Button>
            </div>
            {/* Dialog Triggered by #selectcategory-dialog-trigger */}
            <Dialog open={openSelectCategoryDialog} fullWidth >
               <DialogTitle>Choose Product Category</DialogTitle>
               <DialogContent>
                  <CategoryTree category={{name: 'Categories', _id: 'root'}} 
                     data={productCategories === undefined? []: productCategories}  selected={selectedCategory} 
                     onSelect={categoriesOnSelectHandler} 
                  />
               </DialogContent>
               <DialogActions>
                  <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={selectCategoryModalCancelHandler}>Cancel</Button>
                  <Button variant="contained" color="primary"  onClick={selectCategoryModalOkHandler}>Ok</Button>
               </DialogActions>
            </Dialog>
      </form>
      </div>
   )
}

export function PricingForm({ product }){

   let {dispatch} = useAppState();
   
   let updateProductPrice = useApiRequest('PRODUCT_UPDATE',dispatch);
   
   const onSubmitCallback = ({values,changedValues})=>{
      updateProductPrice({
            params: {productId: product._id}, 
            payload: { price: changedValues }
      });
   };

   let {values,onSubmit,onChange,errors} = useForm({initialValues: product.price || {}, onSubmitCallback});


   return(
      <div className="feature-context">
         <div className="feature-context-title">
         Pricing : {product.name}
         </div>
         <form id="product-price-edit" action="#" onSubmit={onSubmit} className="grid-form">   
               <div className="form-control">
                  <label htmlFor="regular">Regular Price</label>
                  <input type="text" name="regular" id="price-regular" value={values.regular} onChange={onChange} />                  
               </div >
               <div className="form-control">
                  <label htmlFor="discounted">Discounted Price</label>
                  <input type="text" name="discounted" id="price-discounted" value={values.discounted} onChange={onChange}/>                  
                  <label className="field-description">Will be shown as the current price if set </label>
               </div>
               <Button type="submit" variant="contained">Set Price</Button>
               
         </form>
      </div>

            
   )
}

export function ProductInventoryForm({ product }){

   const OUT_OF_STOCK_OPTIONS = {
      DoNotDisplay: 'DoNotDisplay',
      DisplayAndAllowOrders: 'DisplayAndAllowOrders',
      DisplayButDontAllowOrders:'DisplayButDontAllowOrders'
   }

   const IN_STOCK = 'inStock';
   const OUT_OF_STOCK = 'outOfStock';

   let {dispatch} = useAppState();
   
   let updateInventory = useApiRequest('PRODUCT_UPDATE',dispatch);

   let initialValues = { ...product.inventory };

   if(!product.inventory){
      initialValues.inStock = false;
      initialValues.outOfStockOption = OUT_OF_STOCK_OPTIONS.DoNotDisplay;
   }

   //used to remember the last value of the quantity field, so that it value is set when instock and outofstock radio buttons
   //are toggled.
   let [quantityCache, setQuantityCache] = useState(initialValues.quantity || 0);
   let [stockStatus,setStockStatus] = useState(initialValues.quantity > 0? IN_STOCK : OUT_OF_STOCK); //set inStock if quantiy is > 0

   const onSubmitCallback = ({values,changedValues})=>{
      updateInventory({
            params: {productId: product._id}, 
            payload: { inventory: changedValues }
      });
   };

   let {values: inventory,onSubmit,onChange,errors,setFormFieldValue} = useForm({initialValues, onSubmitCallback});
   

   let outOfStockRef = useRef({});
   let inStockRef = useRef({});

   const inStockChangeHandler = (e)=>{
      console.log(`${e.target.name}`, e.target.value);
      console.log(`Quantity Cache`,quantityCache);
      if(e.target.value === IN_STOCK){
         setFormFieldValue({quantity: quantityCache}); //return quantityCache
         setStockStatus(IN_STOCK);
         
      }else{
         setFormFieldValue({quantity: 0});
         setStockStatus(OUT_OF_STOCK);
         // inventory.quantity = 0;
      }
   }

   useEffect(()=>{
     //set checked radio buttons on load.
     if(stockStatus === IN_STOCK){
         inStockRef.current.checked = true;
     }else{
         outOfStockRef.current.checked = true;
     }
     //get the input out of stockoption
     let ooso = document.getElementsByName("outOfStockOption");
     for(let node of ooso){
        if(node.value === inventory.outOfStockOption){
           node.checked = true;
        }else{
           node.checked = false;
        }
     }

   },[])

   
   return(
      <div className="feature-context">
         <div className="feature-context-title">
            Inventory : {product.name}
         </div>
         <form id="product-inventory-edit" action="#" onSubmit={onSubmit} className="grid-form">   
            <div className="form-control" >
               <label htmlFor="InStock" >Stock Status</label>
               <div className="form-control-input">
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input ref={outOfStockRef} type="radio" name="stockStatus" 
                        id="inventory-outofstock" value={OUT_OF_STOCK} onChange={inStockChangeHandler} /> Out Of Stock                 
                  </span>
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input ref={inStockRef} type="radio" name="stockStatus" 
                        id="inventory-instock"  value={IN_STOCK} onChange={inStockChangeHandler} /> In Stock                  
                  </span>
                  
               </div>
            </div >
            {
               stockStatus === IN_STOCK ? 
               <React.Fragment>
                     <div className="form-control">
                        <label htmlFor="quantity">Available Quantity</label>
                           <input type="number" name="quantity" id="inventory-quantity" 
                              value={inventory.quantity} min="1" onChange={onChange} className="form-control-input"/>                  
                        <label className="field-description">The current available quantity </label>
                     </div>
                     <div className="form-control">
                        <label htmlFor="alertLevel">Alert Level</label>
                        <input type="number" name="alertLevel" id="inventory-alertlevel" 
                           value={inventory.alertLevel} onChange={onChange} className="form-control-input"/>                  
                        <label className="field-description">The minimum number of quantity to trigger alert</label>
                     </div>
               </React.Fragment>
               :null
            }

              {/* <div style={{"display": stockStatus === IN_STOCK? 'block': 'none'}}>
                     <div className="form-control">
                        <label htmlFor="quantity">Available Quantity</label>
                        <input type="number" name="quantity" id="inventory-quantity" value={inventory.quantity} min="1" onChange={onChange} />                  
                        <label className="field-description">The current available quantity </label>
                     </div>
                     <div className="form-control">
                        <label htmlFor="alertLevel">Alert Level</label>
                        <input type="number" name="alertLevel" id="inventory-alertlevel" value={inventory.alertLevel} onChange={onChange}/>                  
                        <label className="field-description">The minimum number of quantity to trigger alert</label>
                     </div>
               </div> */}
        
            <div className="form-control" >
               <label htmlFor="outOfStockOption" >Out Of Stock Options</label>
               <div className="form-control-input">
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input type="radio" name="outOfStockOption" id="inventory-outofstockoption"  value={OUT_OF_STOCK_OPTIONS.DisplayAndAllowOrders} onChange={onChange} /> Display Product and Allow Orders                
                  </span>
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input type="radio" name="outOfStockOption" id="inventory-outofstockoption" value={OUT_OF_STOCK_OPTIONS.DisplayButDontAllowOrders} onChange={onChange} /> Display But Don't Allow Orders
                  </span>
                  <span style={{display: "flex",alignItems:"center"}}>
                     <input type="radio" name="outOfStockOption" id="inventory-outofstockoption" value={OUT_OF_STOCK_OPTIONS.DoNotDisplay} onChange={onChange} /> Don't Display          
                  </span>
               </div>
            </div >
            <div className="form-control-action">
               <Button type="submit" variant="contained">Save</Button>
            </div>
      </form>
      </div>
     
            
   )
}

export function ProductShippingForm({product}){

   let { values: shipping, onChange, onSubmit, onSubmitCallback } = useForm({ initialValues: product.shipping || {}});

   //get product weight
   //product dimension
   //get product heigth
   //get product length
   //get product width
   
   //shipping_label e.g. perishable,oversized

   //how to calculate the cost?

   return(
      <div className="feature-context">
         <div className="feature-context-title">
            Shipping : {product.name}
         </div>
         <form action="" onSubmit={onSubmit} className="grid-form">
            <div className="form-control">
               <label htmlFor="regular">Product Weight</label>
               <input type="text" name="productWeight" id="price-regular" value={shipping.productWeight} onChange={onChange} />                  
            </div >
            <h4>Dimension</h4>
            <div className="form-control">
               <label htmlFor="regular">Product Height</label>
               <input type="text" name="productHeight" id="price-regular" value={shipping.productWeight} onChange={onChange} />                  
            </div >
            <div className="form-control">
               <label htmlFor="regular">Product Length</label>
               <input type="text" name="productLength" id="price-regular" value={shipping.productLength} onChange={onChange} />                  
            </div >
            <div className="form-control">
               <label htmlFor="regular">Product Width</label>
               <input type="text" name="productWidth" id="price-regular" value={shipping.productWidth} onChange={onChange} />                  
            </div >
         </form>
      </div>
   )
}