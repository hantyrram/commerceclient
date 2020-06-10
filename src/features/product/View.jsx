import React, {useEffect,useState} from 'react';
import useAppState from 'appstore/useAppState';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import FeatureContextMenu from 'components/FeatureContextMenu';
import feature from 'features/feature';
import { 
   ProductForm,PricingForm,ProductInventoryForm,ProductShippingForm
} from './forms';
import ViewProductImages from './ViewProductImages';
import useApiRequest from 'api/useApiRequest';
import {emit} from 'actionEvent';
import Feature from 'components/Feature';
import { ViewProducts } from './featureaction';

function View({match,history,location}){
   let { getAppState,dispatch } = useAppState();
   let findProduct = useApiRequest('SEARCH_EXEC',dispatch);
   let slug = match.params.slug;
   let product = getAppState().products.find(p=> p.slug === slug);
   console.log('Slug',slug);
   console.log('Viewing product',getAppState().products);
   useEffect(()=>{
      (async ()=>{
         try {
            //this is a remedy of the refresh problem,instead of having a product state,get the
            //search result from appstore instead.
            //SEARCH_EXEC_OK, identify the resourceType, then add it on the appstore
            let {resource} = await findProduct({query: `resource=product&key=slug&slug=${slug}`});   
            // setProduct(resource[0]);
            //dispatch SEARCH_EXEC here, 
            //always get the product from appstore
         } catch (error) {
            console.log(error);            
         }
         
      })()
      
   },[]);

 
   return(
      //if ok,save on product,cancel don;t save
      <Router>
         {
            product ? 

         <Feature 
            title="Product"
            actions={
               [ ViewProducts ]
            }
            >
            <div className="feature-context-wrapper" >
               <section className="feature-context-wrapper-main-section" >
               <Switch>               
                  {/* <Route exact path="/catalog/products/:slug" component={withProduct(ProductForm,product,onProductUpdate,{productCategories :getAppState().productCategories})}/> */}
                  <Route exact path="/catalog/products/:slug" render={() => <ProductForm product={product} />}/>
                  <Route exact path="/catalog/products/:slug/basic" render={() => <ProductForm product={product} />}/>
                  <Route exact path="/catalog/products/:slug/pricing" render={()=> <PricingForm product={product} /> } />
                  <Route exact path="/catalog/products/:slug/inventory"  render={()=> <ProductInventoryForm product={product} /> }/>
                  <Route exact path="/catalog/products/:slug/shipping" render={()=><ProductShippingForm product={product}/>} />              
                  <Route exact path="/catalog/products/:slug/images" render={()=><ViewProductImages product={product}/>} />              
               </Switch>
               </section>
               <section className="feature-context-wrapper-menu-section" >
                  <FeatureContextMenu links={
                     [
                        { to: `/catalog/products/${slug}/basic`, label: 'Basic' },
                        { to: `/catalog/products/${slug}/pricing`, label: 'Pricing' },
                        { to: `/catalog/products/${slug}/inventory`, label: 'Inventory' },
                        { to: `/catalog/products/${slug}/shipping`, label: 'Shipping' },
                        { to: `/catalog/products/${slug}/images`, label: 'Images' }

                     ]
                  } />
               </section>
            </div>
         </Feature>
         
            :null
         }
      </Router>     
   )
}

export default View;

