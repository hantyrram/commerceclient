import React from 'react';
import useAppState from 'appstore/useAppState';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import FeatureContextMenu from 'components/FeatureContextMenu';
import feature from 'features/feature';
import { 
   ProductForm,PricingForm,ProductInventoryForm,ProductShippingForm
} from './forms';

function View(props){
   let { getAppState } = useAppState();
   let { products } = getAppState();
   // let productName = props.match.params.slug.replace(/\-/g,' ');
   let slug = props.match.params.slug;
   let product = products.find(p=> p.slug === slug);
 
   return(
      //if ok,save on product,cancel don;t save
      <Router>
         <div className="feature-context-wrapper" >
            <section className="feature-context-wrapper-main-section" >
            <Switch>               
               {/* <Route exact path="/catalog/products/:slug" component={withProduct(ProductForm,product,onProductUpdate,{productCategories :getAppState().productCategories})}/> */}
               <Route exact path="/catalog/products/:slug" render={() => <ProductForm product={product} />}/>
               <Route exact path="/catalog/products/:slug/pricing" render={()=> <PricingForm product={product} /> } />
               <Route exact path="/catalog/products/:slug/inventory"  render={()=> <ProductInventoryForm product={product} /> }/>
               <Route exact path="/catalog/products/:slug/shipping" render={()=><ProductShippingForm product={product}/>} />              
            </Switch>
            </section>
            <section className="feature-context-wrapper-menu-section" >
               <FeatureContextMenu links={
                  [
                     { to: `/catalog/products/${product.slug}/`, label: 'Basic' },
                     { to: `/catalog/products/${product.slug}/pricing`, label: 'Pricing' },
                     { to: `/catalog/products/${product.slug}/inventory`, label: 'Inventory' },
                     { to: `/catalog/products/${product.slug}/shipping`, label: 'Shipping' }
                  ]
               } />
            </section>
         </div>
      </Router>     
   )
}


export default feature(View,{
   title: `Viewing Product`,
   links: [
      { path : '/catalog/products', label: 'View Products' },
      { path : '/catalog/products', label: 'Add New Product' }

   ]
 });