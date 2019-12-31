import React,{useState, useEffect, useRef}from 'react';
import Dialog from '@material-ui/core/Dialog';
import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { product_FetchAll_Nok } from 'actions/action_creators/product';

export default ({product,onSubmit})=>{
   const OUT_OF_STOCK_OPTIONS = {
      DoNotDisplay: 'DoNotDisplay',
      DisplayAndAllowOrders: 'DisplayAndAllowOrders',
      DisplayButDontAllowOrders:'DisplayButDontAllowOrders'
   }
   let [inventory,setInventory] = useState(product.inventory || {inStock: false, outOfStockOption: OUT_OF_STOCK_OPTIONS.DoNotDisplay});
   let [quantity,setQuantity] = useState(inventory.quantity);
   let outOfStockRef = useRef();
   let inStockRef = useRef();
   const onChange = (e)=>{
      
      let value = e.target.value;
      if(e.target.name === 'inStock'){
         value = e.target.value === "true"? true : false;
         if(!value){
            setQuantity(0); //set 0 for out of stock
         }else{
            setQuantity(inventory.quantity);
         }
      }
     
      setInventory({...inventory, [e.target.name]:value});
      
   }

   const submitHandler = (e)=>{
      e.preventDefault();
      onSubmit({...inventory,quantity});
   }

   useEffect(()=>{
     if(inventory.inStock){
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
      <form id="product-inventory-edit" action="#" onSubmit={submitHandler}>   
            <h3>Inventory Of : {product.name}</h3>
            <div className="form-input-control" style={{maxWidth:"50%"}}>
               <label htmlFor="InStock" >Stock Status</label>
               <span style={{display:'flex'}}>
                  <input ref={inStockRef} type="radio" name="inStock" id="inventory-instock"  value={true} onChange={onChange} /> In Stock                  
               </span>
               <span style={{display:'flex'}}>
                  <input ref={outOfStockRef} type="radio" name="inStock" id="inventory-outofstock" value={false} onChange={onChange} /> Out Of Stock                 
               </span>               
            </div >
            {
               inventory.inStock ? 
               <React.Fragment>
                     <div className="form-input-control">
                        <label htmlFor="quantity">Available Quantity</label>
                        <input type="number" name="quantity" id="inventory-quantity" value={inventory.quantity} min="1" onChange={onChange} />                  
                        <label className="form-control field-description">The current available quantity </label>
                     </div>
                     <div className="form-input-control">
                        <label htmlFor="alertLevel">Alert Level</label>
                        <input type="number" name="alertLevel" id="inventory-alertlevel" value={inventory.alertLevel} onChange={onChange}/>                  
                        <label className="form-control field-description">The minimum number of quantity to trigger alert</label>
                     </div>
               </React.Fragment>
               :null
            }
        
            <div className="form-input-control" style={{maxWidth:"50%"}}>
               <label htmlFor="outOfStockOption" >Out Of Stock Options</label>
               <span style={{display:'flex'}}>
                  <input type="radio" name="outOfStockOption" id="inventory-outofstockoption"  value={OUT_OF_STOCK_OPTIONS.DisplayAndAllowOrders} onChange={onChange} /> Display Product and Allow Orders                
               </span>
               <span style={{display:'flex'}}>
                  <input  type="radio" name="outOfStockOption" id="inventory-outofstockoption" value={OUT_OF_STOCK_OPTIONS.DisplayButDontAllowOrders} onChange={onChange} /> Display But Don't Allow Orders
               </span>       
               <span style={{display:'flex'}}>
                  <input  type="radio" name="outOfStockOption" id="inventory-outofstockoption" value={OUT_OF_STOCK_OPTIONS.DoNotDisplay} onChange={onChange} /> Don't Display          
               </span>            
            </div >
            <Button type="submit" variant="contained">Save</Button>
            
      </form>
            
   )
}