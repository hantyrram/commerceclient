import React,{useState}from 'react';

import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default ({onSubmit,productCategories,mode,product})=>{
   
   let [p,setProduct] = useState(product || {});
   let [selectedCategory,setSelectedCategory] = useState({_id:'root'});
   let [openSelectCategoryDialog,setOpenSelectCategoryDialog] = useState(false);

   const onChange = (e)=>{
      setProduct({...p, [e.target.name]:e.target.value});
   }

   const submitHandler = (e)=>{
      e.preventDefault();
      onSubmit(p);
   }

   const categoriesOnSelectHandler = s => {
      setSelectedCategory(s);
   }
   const selectCategoryModalTriggerHandler = (e)=>{
      e.preventDefault();
      setOpenSelectCategoryDialog(true);
   }

   const selectCategoryModalOkHandler = (e) => {
      if(selectedCategory._id !== 'root'){
         setProduct({...p, category: selectedCategory});
         setOpenSelectCategoryDialog(false);
      }
   }

   const selectCategoryModalCancelHandler = (e) => {
      setOpenSelectCategoryDialog(false);
   }

   const removeCategory = ()=>{
      setProduct(Object.assign({...p},{category:null}));
   }


   return(
      <form id="product-add" action="#" onSubmit={submitHandler}>   
            <div className="form-input-control form-input-control-inline">
               <span>
                  <a href="#" onClick={selectCategoryModalTriggerHandler} >
                     {p.category? 'Change Product Category': 'Select Product Category'}
                  </a>
               </span>
               <span>
                  {p.category? <Chip size="small" label={p.category.name} onDelete={removeCategory}/> : null}
               </span>
               
            </div>   
            <div className="form-input-control" style={{maxWidth:"50%"}}>
               <label htmlFor="type">Product Type</label>
               <select name="type" id="product-type" value={p.type} onChange={onChange}>
                  <option value="standard">Standard</option>
                  <option value="bundled">Bundled</option>
               </select>
            </div >
            <div className="form-input-control">
               <label htmlFor="name">Product Name</label>
               <input type="text" name="name" id="product-name" value={p.name} onChange={onChange} minLength="4"/>                  
               <label className="form-control field-description">The display name of the product</label>
            </div>
            {/* <div className="form-input-control">
               <label htmlFor="slug">Slug</label>
               <input type="text" name="slug" id="product-slug" value={p.slug} onChange={onChange} minLength="4"/>                  
               <label className="form-control field-description">The display name of the product</label>
            </div> */}
            <div className="form-input-control">
               <label htmlFor="itemCondition">Item Condition</label>
               <select name="itemCondition" id="product-stockstatus" value={p.itemCondition} onChange={onChange}>
                  <option value="new">New</option>
                  <option value="used">Used</option>
               </select>
            </div>
            
            <div className="form-input-control">
               <label htmlFor="description">Product Description</label>
               <textarea style={{minHeight:"10em",maxWidth:"100%"}}type="text" name="description" id="product-description" value={p.description} onChange={onChange} />
               <label className="form-control field-description">This information will be displayed alongside the product on the customers screen.</label>
            </div>      
            {/* <div className="form-input-control">
               <label htmlFor="ean">EAN / Barcode</label>
               <input type="text" name="ean" value={product.ean} onChange={onChange} />
            </div> */}
            {/* <div className="form-input-control">
               <label htmlFor="upc">UPC (Universal Product Code)</label>
               <input type="text" name="upc" value={product.upc} onChange={onChange} />
            </div> */}
            <div className="form-input-control">
               <label htmlFor="netCost">Net Cost</label>
               <input type="text" name="netCost" value={p.netCost} onChange={onChange} />
               <label className="form-control field-description">The cost of acquiring the product</label>
            </div>      
            { mode === "edit" ? <Button type="submit" variant="contained">Save</Button> : <Button type="submit" variant="contained">Save Product</Button> }
            
            <Dialog open={openSelectCategoryDialog} fullWidth >
               <DialogTitle>Choose Product Category</DialogTitle>
               <DialogContent>
                  <SCategory category={{name: 'Categories', _id: 'root'}} 
                     data={productCategories === undefined? []: productCategories}  selected={selectedCategory} 
                     onSelect={categoriesOnSelectHandler} 
                  />
               </DialogContent>
               <DialogActions>
                  <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={selectCategoryModalCancelHandler}>Cancel</Button>
                  <Button variant="contained" color="primary"  onClick={selectCategoryModalOkHandler}>Ok</Button>
               </DialogActions>
               {/* <div className="actions-container button-actions-container" style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                  <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={selectCategoryModalCancelHandler}>Cancel</Button>
                  <Button variant="contained" color="primary"  onClick={selectCategoryModalOkHandler}>Ok</Button>
               </div> */}
            
            </Dialog>
      </form>
            
   )
}