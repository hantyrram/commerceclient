import React,{useState}from 'react';
import Dialog from '@material-ui/core/Dialog';
import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

export default ({onSubmit,productCategories,mode,product})=>{
   
  

   return(
      <form id="product-add" action="#" onSubmit={()=>{}}>   
         <p>
            Logo Here
         </p>
         <div className="form-input-control" style={{maxWidth:"50%"}}>
            <label htmlFor="type">Store Name</label>
            <input type="text" name="storeName" id="storename" minLength="1"/>                  
         </div >
         <Button type="submit" variant="contained">Save</Button> 
      </form>
            
   )
}