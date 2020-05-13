import React,{useEffect} from 'react';
import feature from '../feature';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import FeatureContextMenu from 'components/FeatureContextMenu';
import ShippingZones from './ShippingZones';
import ShippingOrigin from './ShippingOrigin';
import ShippingClasses from './ShippingClasses';

/**
 * Select Country Or City RegionType: city, country
 */
function ShippingMethod({}){
   const SETTING_NAME = 'StoreSetting.Shipping.ShippingMethod';
   let { getAppState } = useAppState();
   let { storeSettings } = getAppState();
   let shippingMethod = storeSettings.find(s=>s.name === SETTING_NAME);
   return(
      // <AddressForm />
      JSON.stringify(shippingMethod || {})
   )
}

function Index(){
   let { dispatch } = useAppState();
   let fetchStoreSettings = useApiRequest('STORESETTING_LIST',dispatch);
   useEffect(()=>{
      //prefetch so routes relative to this route does not have to re-fetch store setting on refresh
      fetchStoreSettings();
   },[]);
      return(      
      <Router>
         <div className="feature-context-wrapper" >
            <section className="feature-context-wrapper-main-section" >
               <Switch>               
                  <Route path="/storesettings/shipping/shippingorigin" component={ShippingOrigin} />
                  <Route path="/storesettings/shipping/shippingzones" component={ShippingZones}/>
                  <Route path="/storesettings/shipping/shippingmethods" component={()=>'Shipping Methods'}/>
                  <Route path="/storesettings/shipping/shippingclasses"  component={ShippingClasses}/>
               </Switch>
            </section>
            <section className="feature-context-wrapper-menu-section" >
               <FeatureContextMenu 
                  links = {
                     [
                        {to: '/storesettings/shipping/shippingorigin', label: 'Shipping Origin'},
                        {to: '/storesettings/shipping/shippingzones', label: 'Shipping Zone'},
                        {to: '/storesettings/shipping/shippingmethods', label: 'Shipping Methods'},
                        {to: '/storesettings/shipping/shippingclasses', label: 'Shipping Classes'}
                     ]
                  }
               />
            </section>           
         </div>            
      </Router>
      
   )
} 

export default feature(Index, { title : 'Shipping' });










