import React,{useState, useEffect}from 'react';
import Dialog from '@material-ui/core/Dialog';
import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { product_FetchAll_Nok } from 'actions/action_creators/product';

export default ({product,onSubmit})=>{
   
   let [price,setPrice] = useState(product.price || {});

   const onChange = (e)=>{
      setPrice({...price, [e.target.name]:e.target.value});
   }

   const submitHandler = (e)=>{
      e.preventDefault();
      onSubmit(price);
   }

   return(
      <form id="product-price-edit" action="#" onSubmit={submitHandler}>   
            <h3>Price For : {product.name}</h3>
            <div className="form-input-control" style={{maxWidth:"50%"}}>
               <label htmlFor="regular">Regular Price</label>
               <input type="text" name="regular" id="price-regular" value={price.regular} onChange={onChange} />                  
            </div >
            <div className="form-input-control">
               <label htmlFor="discounted">Discounted Price</label>
               <input type="text" name="discounted" id="price-discounted" value={price.discounted} onChange={onChange}/>                  
               <label className="form-control field-description">Will be shown as the current price if set </label>
            </div>
            <Button type="submit" variant="contained">Set Price</Button>
            
      </form>
            
   )
}