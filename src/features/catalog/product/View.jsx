import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';

import feature from '../../feature';
import ProductForm from './components/ProductForm';
import ProductMenu from './components/ProductMenu';
import PricingForm from './components/PricingForm';

import {
   useProduct_Update
} from 'actions/useProduct';



// so We can wrap with inline div and pass product
const withProduct = (ProductFeature,product,onSubmit)=>{
   return (props)=>{
      return(
         <div style={{display:'inline-block',minWidth: '70%'}}>
            <ProductFeature product={product} onSubmit={onSubmit} {...props}/>
         </div>
      )
   }
}



function View(props){
   
   console.log(props.location.state.product);
   
   let [product,setProduct] = useState(Object.assign({},props.location.state.product));
   let updateProduct = useProduct_Update();
   const onProductUpdate = (p)=>{

      console.log('Updating Product',p);
   }

   const onPriceUpdate = (p)=>{
      (async function(){
         let updatedProduct = await updateProduct({_id:product._id, price: p});
         setProduct({...product,updatedProduct});
      })()
   }
   
   return(
      //if ok,save on product,cancel don;t save
      <Router>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:''}}>
            <Switch>               
               <Route exact path="/catalog/products/:slug" component={withProduct(ProductForm,product,onProductUpdate)}/>
               <Route exact path="/catalog/products/:slug/pricing" component={withProduct(PricingForm,product,onPriceUpdate)}/>
               <Route exact path="/catalog/products/:slug/inventory"  component={withProduct(()=>{return 'inventory'},product)}/>
            </Switch>
            <div style={{display:'flex',minWidth:'30%',justifyContent:'center'}}>
               <ProductMenu product={props.location.state.product}/>
            </div>
      </div>
      </Router>
   )
}


export default feature(View,{
   title: 'Product',
   shortcutLinks: [
      <FeatureShortcutLink to="/catalog/products">View Products</FeatureShortcutLink>
   ]
})



