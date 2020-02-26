import React,{useState}from 'react';
import Dialog from '@material-ui/core/Dialog';
import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

export default ({onSubmit, data = {} ,onChange})=>{

   return(
      <form id="product-add" action="#" onSubmit={()=>{}}>   
    
      <div className="form-input-control">
         <label htmlFor="name">Store Name</label>
         <input type="text" name="name" id="product-name" value={data.storeName} onChange={onChange}/>                  
         <label className="form-control field-description">The display name of the product</label>
      </div>
     
      </form>
            
   )
}