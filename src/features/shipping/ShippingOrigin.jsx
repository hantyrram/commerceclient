import React from 'react';
import {PhilippinesAddressForm} from 'components/AddressForm';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';

export default function ShippingOrigin(){
   const SETTING_NAME = 'StoreSetting.Shipping.ShippingOrigin';   
   let { getAppState,dispatch } = useAppState();
   let { storeSettings } = getAppState();
   let updateShippingOrigin = useApiRequest('STORESETTING$SHIPPING$SHIPPINGORIGIN_EDIT',dispatch);
   let shippingOriginSetting = storeSettings.find( s => s.name === SETTING_NAME);

   console.log(storeSettings);
   console.log(shippingOriginSetting);
   return(
      <div className="feature-context">
         <div className="feature-context-title">Shipping Origin</div>
         <PhilippinesAddressForm 
            data={shippingOriginSetting && shippingOriginSetting.value}
            onSubmit = {(address)=>{
               console.log('Submitting Address', address);
               updateShippingOrigin({payload: address});
            }}
            validator = {
               (formData)=>{
                  let error = {};
                  if(!formData.country){
                     error.country = 'Country is required.'
                  }
                  if(formData.country === 'Philippines' && !formData.phlIslandGroup){
                     error.phlIslandGroup = 'IslandGroup is required.'
                  }
                  if(formData.country === 'Philippines' && !formData.province){
                     error.province = 'Province is required.'
                  }
                  
                  if(!formData.municipality){
                     error.municipality = 'Municipality is required.'
                  }

                  if(!formData.street){
                     error.street = 'Street is required.'
                  }
                  
                  if(!formData.zipCode){
                     error.zipCode = 'Zipcode is required.'
                  }

                  if(Object.keys(error).length > 0){
                     return error;
                  }
                  return null;
               }
            }

         />
      </div>
      
   )
}