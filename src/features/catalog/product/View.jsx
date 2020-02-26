import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import useAppStore from 'hooks/useAppStore';
import feature from '../../feature';
import ProductForm from './components/ProductForm';
import ProductMenu from './components/ProductMenu';
import PricingForm from './components/PricingForm';
import ProductInventoryForm from './components/ProductInventoryForm';

import {
   useProduct_Update,
   useProduct_FetchAll
} from 'actions/Product';



// so We can wrap with inline div and pass product
const withProduct = (ProductFeature,product,onSubmit,otherProps)=>{
   return (props)=>{
      return(
         <div style={{display:'inline-block',minWidth: '70%'}}>
            <ProductFeature product={product} onSubmit={onSubmit} {...props} {...otherProps}/>
         </div>
      )
   }
}


function View(props){
   
   // console.log(props.location.state.product);

   console.log(props.location);
   console.log(props.match);
   let getProducts = useProduct_FetchAll();

   // let [product,setProduct] = useState(Object.assign({},props.location.state.product));
   let { getAppState } = useAppStore();

   let initialValue;

   if(getAppState().products){
      let productName = props.match.params.slug.replace(/\-/g,' ');
      initialValue = getAppState().products.find(p=> p.name === productName);
   }

   let [product,setProduct] = useState(initialValue);
   
   let updateProduct = useProduct_Update();

  

   const onProductUpdate = (p)=>{
      (async function(){
         // let updatedProduct = await updateProduct({_id:product._id, price: p});
         // setProduct({...product,updatedProduct});
         updateProduct({_id:product._id, ...p});
      })()
   };

   const onPriceSubmit = (p)=>{
      (async function(){
         // let updatedProduct = await updateProduct({_id:product._id, price: p});
         // setProduct({...product,updatedProduct});
         updateProduct({_id:product._id, price: p});
      })()
   };

   const onProductInventorySubmit = (inventory)=>{
      (async function(){
         // let updatedProduct = await updateProduct({_id:product._id, price: p});
         // setProduct({...product,updatedProduct});
         updateProduct({_id: product._id, inventory});
      })()
   };


   // useEffect(()=>{
   //    if(!getAppState().products){ //try fetching products once
   //       getProducts();

   //    }
   // },[]);

   
   
 
   return(
      //if ok,save on product,cancel don;t save
      <Router>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:''}}>
            <Switch>               
               <Route exact path="/catalog/products/:slug" component={withProduct(ProductForm,product,onProductUpdate,{productCategories :getAppState().productCategories})}/>
               <Route exact path="/catalog/products/:slug/pricing" component={withProduct(PricingForm,product,onPriceSubmit)}/>
               <Route exact path="/catalog/products/:slug/inventory"  component={withProduct(ProductInventoryForm,product,onProductInventorySubmit)}/>
            </Switch>
            <div style={{display:'flex',minWidth:'30%',justifyContent:'center'}}>
               <ProductMenu product={product}/>
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



