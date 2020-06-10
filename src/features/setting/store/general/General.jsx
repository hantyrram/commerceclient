import React, { useState,useEffect, useRef } from 'react';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import {Test} from 'components/AddressForm';
import useApiRequest from 'api/useApiRequest';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import './General.css';
import useAppState from 'appstore/useAppState';
import Feature from 'components/Feature';
import FeatureContextMenu from 'components/FeatureContextMenu';

let storebasicSettingValidator = (values)=>{
   let error = {};
   if(!values.storeName || values.storeName.length < 2){
      error.storeName = 'Store Name Must be greater than 2 characters';
   }

   if(!values.defaultCurrency || values.defaultCurrency.length === 0){
      error.defaultCurrency = 'Default Currencty is required';
   }

   return Object.getOwnPropertyNames(error).length > 0? error: null;
}

function AddressSetting({data}){
   let { dispatch } = useAppState();

   const onSubmit = (formdata)=>{
      console.log(formdata);
   }

   return(
      <Test data={data} onSubmit={onSubmit}/>
   )
}

let StorebasicSettingSettingContextContent = ()=>{
   const SETTING_NAME = 'StoreSetting.Basic';
   let { getAppState ,dispatch } = useAppState();
   let fetchStoreSettings = useApiRequest('STORESETTING_LIST',dispatch);
   let updateBasicSetting = useApiRequest('STORESETTING$BASIC_EDIT',dispatch);
   let fetchCountries = useApiRequest('UTIL$EXTDATA$COUNTRY_LIST',dispatch,({responseData})=>{
      return responseData;
   });

   let fetchCities = useApiRequest('UTIL$EXTDATA$COUNTRYCITY_LIST',dispatch,({responseData})=>{
      return responseData;
   });
   
   let fetchStates = useApiRequest('UTIL$EXTDATA$COUNTRYSTATES_LIST',dispatch,({responseData})=>{
      return responseData;
   });
   
   let { storeSettings } = getAppState();
   let { countries, states, cities} = getAppState();
   
   let store_basic_setting = (storeSettings || []).find( setting => setting.name === SETTING_NAME) || {};

   let onSubmitCallback = ({ values,changedValues })=>{
      updateBasicSetting({params: {settingname: SETTING_NAME }, payload: changedValues});
   }
   let { values: basicSetting, errors, onChange, onSubmit } = useForm({
         initialValues: store_basic_setting.value || {}, onSubmitCallback });
         
   useEffect(()=>{
      fetchStoreSettings();
   },[]);

   useEffect(()=>{
      fetchCountries();  
   },[]);

   useEffect(()=>{
      fetchStates({params: { country: basicSetting.country }});     
   },[basicSetting.country]);

   useEffect(()=>{
      fetchCities({params: { state: basicSetting.state }});     
   },[basicSetting.state]);

   return(
      <div className="feature-context">
         <div className="feature-context-header-section">
            Store Basic Setting
         </div>
         <div className="feature-context-main-section">
         <form action="" className="grid-form" onSubmit={onSubmit}>         
               <div className="form-control">
                  <label for="" className="form-control-label">Store Name</label>
                  <input 
                     type="text" 
                     name="storeName" 
                     placeholder="Input One" 
                     class="form-control-input" 
                     value={basicSetting.storeName}
                     onChange={onChange}
                     />
                  {errors && <span class="form-input-error">{errors.storeName}</span>}
               </div>
               <div className="form-control">
                  <label for="" className="form-control-label">Currency</label>
                  <input 
                     type="text" 
                     name="defaultCurrency" 
                     placeholder="Input One"  
                     className="form-control-input" 
                     value={basicSetting.defaultCurrency}
                     onChange={onChange}
                     />
                  {errors && <span class="form-input-error">{errors.defaultCurrency}</span>}
               </div>               
               <div className="form-control">
                  <label htmlFor="country"  className="form-control-label">Country</label>
                  <select className="form-control-input"  name="country" id="country" value={basicSetting.country} onChange={onChange}>
                        {
                           (countries || []).map(c => {
                              return (
                                 <option value={c.name}>{c.name}</option>
                              )
                           })
                        }
                     </select>
               </div>
              {
                 states[basicSetting.country]?
                  <div className="form-control">
                     <label htmlFor="state"  className="form-control-label">State</label>
                     <select className="form-control-input" name="state" id="state" value={basicSetting.state} onChange={onChange}>
                           {
                              (states[basicSetting.country] || []).map(c => {
                                 return (
                                    <option value={c.state_name}>{c.state_name}</option>
                                 )
                              })
                           }
                        </select>
                  </div>
                  :null
              }
               {
                  cities && cities[basicSetting.state]? 
                  <div className="form-control">
                     <label htmlFor="city"  className="form-control-label">City</label>
                     <select className="form-control-input"  name="city" id="city" value={basicSetting.city} onChange={onChange}>
                           {
                              cities[basicSetting.state].map(c => {
                                 return (
                                    <option value={c.city_name}>{c.city_name}</option>
                                 )
                              })
                           }
                        </select>
                  </div>
                  :null
               }            
               <div className="form-control">
                  <label for="" className="form-control-label">Zip Code</label>
                  <input 
                     type="text" 
                     name="zipcode" 
                     class="form-control-input" 
                     value={basicSetting.zipcode}
                     onChange={onChange}
                     />
                  {errors && <span className="form-input-error">{errors.zipcode}</span>}
               </div>
               <div className="form-control">
                  <label for="" className="form-control-label">Email</label>
                  <input 
                     type="email" 
                     name="email" 
                     className="form-control-input" 
                     value={basicSetting.email}
                     onChange={onChange}
                     />
                  {errors && <span className="form-input-error">{errors.email}</span>}
               </div>
               <div className="form-control">
                  <label for="" className="form-control-label">Contact No:</label>
                  <input 
                     type="contactno" 
                     name="contactno" 
                     className="form-control-input" 
                     value={basicSetting.contactno}
                     onChange={onChange}
                     />
                  {errors && <span className="form-input-error">{errors.contactno}</span>}
               </div>
               <div className="form-control-action">
                  <Button type="submit" >Submit</Button>
               </div>         
         </form>
         </div>
      </div>      
   )
}

let AddressSettingContextContent = ()=>{
   return(
      <div className="feature-context">
          <div className="feature-context-header-section">
            Store Address
         </div>
         <div className="feature-context-main-section">
            <AddressSetting />
         </div>
      </div>
   )
}

let Basic = ({ data }) => {

   let { dispatch } = useAppState();

   let updateSetting = useApiRequest('SETTING$STORE$GENERAL_EDIT',dispatch);

   const onSubmitCallback = ()=>{};

   let { values, errors, onChange, onSubmit }  = useForm({initialValues: data, onSubmitCallback});


   return(
      <form action="" className="grid-form" onSubmit={onSubmit}>
         <div className="form-control">
            <label htmlFor="storeName" className="form-control-label">Store Name</label>
            <input 
               type="text" 
               name="storeName" 
               placeholder="Input One" 
               class="form-control-input" 
               value={values.storeName}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.storeName}</span>}
         </div>
         <div className="form-control">
            <label htmlFor="customerSupportEmail" className="form-control-label">Customer Support Email</label>
            <input 
               type="email" 
               name="customerSupportEmail" 
               placeholder="Input One" 
               class="form-control-input" 
               value={values.customerSupportEmail}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.customerSupportEmail}</span>}
         </div>
         <div className="form-control">
            <label htmlFor="customerSupportHotline" className="form-control-label">Customer Support Hotline</label>
            <input 
               type="text" 
               name="customerSupportHotline" 
               placeholder="Input One" 
               class="form-control-input" 
               value={values.customerSupportHotline}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.customerSupportHotline}</span>}
         </div>
      </form>
   )
}


let Currency = () => {

}

function General(props){

   let { getAppState } = useAppState();
   let { settings } = getAppState();
   let store = settings.store || {} ;
   let general = store.general || {};
   let address = general.address || {};
   let currency = general.currency || {};

   return(
      <Router>
         <Feature title="General" >
               <section className="feature-context-wrapper-main-section" >
                  <Switch>               
                     <Route exact path="/settings/store/general" render={(props)=><Basic data={general}/>}/>
                     <Route exact path="/settings/store/general/address" render={(props)=><AddressSetting data={address}/>}/>
                     <Route exact path="/settings/store/general/currencies"  component={()=>'Currencies'}/>
                  </Switch>
               </section>          
               
               <section className="feature-context-wrapper-menu-section" >
                  <FeatureContextMenu links={
                     [
                        { to: `/settings/store/general`, label: 'Basic' },
                        { to: `/settings/store/general/address`, label: 'Address' },
                        { to: `/settings/store/general/currency`, label: 'Currency' },
                     ]
                  } />
               </section>         
          </Feature> 
       </Router>
   )
}

export default General;






