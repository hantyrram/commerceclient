import React, { useState,useEffect, useRef } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import feature from '../feature';
import GeneralSettingMenu from './components/GeneralSettingMenu';
import GeneralSettingBasicForm from './components/GeneralSettingBasicForm';
import AddressForm from './components/AddressForm';

import { useGetCountries ,useGetStates } from 'actions/Util$ExtData$Country';
import useAppStore from 'hooks/useAppStore';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import './General.css';

let storeBasicValidator = (values)=>{
   let error = {};
   if(!values.storeName || values.storeName.length < 2){
      error.storeName = 'Store Name Must be greater than 2 characters';
   }

   if(!values.defaultCurrency || values.defaultCurrency.length === 0){
      error.defaultCurrency = 'Default Currencty is required';
   }

   return Object.getOwnPropertyNames(error).length > 0? error: null;
}

function AddressSetting(props){
   let { getStore } = useStateContext();
   let getListOfCountries = useGetCountries();
   let getCountryStates = useGetStates();

   let { storeSettings,countries,states } = getStore();
   
   let {
      storeAddress,
   } = storeSettings || {}

   let [address,setAddress] = useState(storeAddress || { country: '' });

   useEffect(()=>{
      if(!countries){
         getListOfCountries();
      }
   },[]);

   const onAddressChange = (e)=>{
      setAddress({...address,[e.target.name]: e.target.value})      
   }

   useEffect(()=>{      
      if(!states || !states[address.country]){
         getCountryStates(address.country);       
      }
   },[address.country]);

   const onAddressSubmit = ()=>{
      console.log(address);
   }

   return(
      <AddressForm countries={countries} states={states[address.country]} 
         data={address} onChange={onAddressChange} onSubmit={onAddressSubmit}/>
   )
}

function StoreBasicSetting(props){

   let onSubmitCallback = () => {
      //dispatch action
      console.log('Submitting Form');
   }

   
   let {values,onChange,onSubmit,errors} = useForm({},onSubmitCallback,storeBasicValidator);

 
   return(
      <form action="" class="grid-form" onSubmit={onSubmit}>         
         <div class="form-control">
            <label for="" class="form-control-label">Store Name</label>
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
         <div class="form-control">
            <label for="" class="form-control-label">Currency</label>
            <input 
               type="text" 
               name="defaultCurrency" 
               placeholder="Input One"  
               class="form-control-input" 
               value={values.defaultCurrency}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.defaultCurrency}</span>}
         </div>
         <div class="form-control-actions ">
            <Button className="form-control-action" type="submit" >Submit</Button>
         </div>         
      </form>
   )
}

let StoreBasicSettingContextContent = ()=>{
   return(
      <div className="feature-context">
         <div className="feature-context-header-section">
            Store Basic Setting
         </div>
         <div className="feature-context-main-section">
            <StoreBasicSetting />
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

function General(props){
    return(
      <Router>
         <div className="feature">
            <div className="feature-header">Store General Setting</div>
            <div className="feature-content">               
               <Switch>               
                  <Route exact path="/settings/store" component={StoreBasicSettingContextContent}/>
                  <Route exact path="/settings/store/general/address" component={AddressSettingContextContent}/>
                  <Route exact path="/settings/store/general/currencies"  component={()=>'Currencies'}/>
               </Switch>
               <div style={{display:'flex',minWidth:'30%',justifyContent:'center'}}>
                  <GeneralSettingMenu />
               </div>
               
            </div>
            
          </div> 
       </Router>
     

   )
}



// export default feature(General,{
//    title: 'General Store Setting',
//    // shortcutLinks: [
//    //    <FeatureShortcutLink to="/catalog/products">Shipping Products</FeatureShortcutLink>
//    // ]
// })

export default General;






