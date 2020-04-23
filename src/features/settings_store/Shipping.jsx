import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import feature from '../feature';
import FeatureContextMenu  from 'components/FeatureContextMenu';
import useForm from 'hooks/useForm';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import './Shipping.css';
import {FlatRateShipping,FreeShipping,LocalPickUp,ShippingClass} from 'modules/Shipping';

function validateShippingZone(values){
   let errors = {}
   if(values.country === 'Philippines' && !values.islandGroup){
      errors.islandGroup = 'Value is required.'
   }

   if(!values.zoneName || values.zoneName.length === 0){
      errors.zoneName = 'Zone name required.'
   }

   return Object.getOwnPropertyNames(errors).length> 0? errors: null;
}

function ShippingZone(){
   const STORE_SHIPPINGZONE_SETTING = 'StoreSetting.ShippingZone';
   let { getAppState, dispatch } = useAppState();
   let fetchCountryList = useApiRequest('UTIL$EXTDATA$COUNTRY_LIST',dispatch, ({responseData}) => responseData);
   let addShippingZone = useApiRequest('STORESETTING$SHIPPINGZONE_ADD',dispatch);
   let fetchShippingZoneSetting = useApiRequest('STORESETTING$SHIPPINGZONE_READ',dispatch);
   let { countries, storeSettings } = getAppState();
   let shippingZone = storeSettings.find(setting=> setting.name === STORE_SHIPPINGZONE_SETTING) || {};

   const chooseRegionSubmitCallback = ({values,changedValues})=>{
      console.log(changedValues);
      addShippingZone({payload: values});
   };
   
   const initForm = { 
      initialValues: shippingZone, 
      onSubmitCallback: chooseRegionSubmitCallback, 
      validate: validateShippingZone
   }

   let { values,onSubmit,onChange,errors } 
      = useForm(initForm);

  

   useEffect(()=>{
      fetchCountryList();
      fetchShippingZoneSetting();
   },[]);

   useEffect(()=>{
      if(values.country !== 'Philippines'){
         delete values['islandGroup'];
      }
   });

   return(
      <div>         
         <form action="" className="grid-form" onSubmit={onSubmit}>
            <div className="form-control">
               <label htmlFor="zoneName"  className="form-control-label">Zone Name</label>
               <input name="zoneName" className="form-control-input" onChange={onChange} value={values.zoneName}/>
            </div>
            <div className="form-control">
               <label htmlFor="country"  className="form-control-label">Choose Region</label>
               <select name="country" className="form-control-input" id="shipping-zone-country" onChange={onChange} value={values.country}>
                  {
                     countries.map((c)=><option>{c.name}</option>)
                  }
               </select>
            </div>
            
            {
               values.country === 'Philippines' ? 
               <div className="form-control">
                  <label htmlFor="islandGroup">Choose Island Group</label>
                  <select name="islandGroup" className="form-control-input" id="" onChange={onChange} value={values.islandGroup}>
                     <option value="luzon">Luzon</option>
                     <option value="visayas">Visayas</option>
                     <option value="mindanao">Mindanao</option>
                  </select>
                  <div className="form-input-error">{errors && errors.islandGroup}</div>
               </div>
               : null
            }
            <div className="form-control-action">
               <Button type="submit">Add Zone</Button>
            </div>
            
         </form>

         <div>
            { 
               shippingZone && shippingZone.value ? 
               <table>
                  <thead>
                     <th>Zone Name</th>
                     <th>Region</th>
                  </thead>
                  <tbody>
                     {
                        shippingZone.value.map(sz => {
                           return (
                              <tr>
                                 <td>{sz.zoneName}</td>
                                 <td>{sz.country}</td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
                  </table>
               :null
            }
            
         </div>
      </div>
   )
}

function Shipping({match,location}){
   // //get the shipping zones
   let { getAppState, dispatch } = useAppState();
   let { settings } = getAppState();
   let fetchSettings = useApiRequest('SETTING_READ',dispatch);

   useEffect(()=>{
      fetchSettings();
   },[])

   // let  { storeSettings : {
   //          shipping }
   //  } = getAppState().storeSettings || { storeSettings: { } } ;
    
   //if no shipping zones display an info about setting up the shipping zones
   //shipping zone is a country to ship to
   //    Set The Origin Of Shipping, version 1 is single origin 
   //    get the complete address. e.g. country,state,provice,city,zip code latitude and longitude
   //    use the rest api for countries                  
   // </p>
   // <p>
   //    <code>
   //       upon setting the origin, we can now identify the Domestic Zone
   //    </code>
   // </p>
   return(
   <Router basename="/settings/store/shipping">
      <div id="feature-shipping">
      <section className="context-main">
            <Route path='/shipping-zone' component={ShippingZone}/>
            <Route path='/shipping-class' component={()=>`Shipping class Here`}/>
            <Route path='/shipping-methods' component={()=>`Shipping methods Here`}/>
            
      </section>
      <section className="context-menu">
         <FeatureContextMenu 
            links = {
               [
                  {to: '/shipping-zone', label: 'Shipping Zone'},
                  {to: '/shipping-class', label: 'Shipping Classes'},
                  {to: '/shipping-methods', label: 'Shipping Methods'}
               ]
            }
         />
      </section>
     </div>
   </Router>
   )
}


export default feature(Shipping,{
   title: 'Shipping',
   // shortcutLinks: [
   //    <FeatureShortcutLink to="/catalog/products">Shipping Products</FeatureShortcutLink>
   // ]
})



