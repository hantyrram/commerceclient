import React from 'react';
import useAppState from 'appstore/useAppState';


export default function ShippingClass({}){
   const SETTING_NAME = 'StoreSetting.Shipping.ShippingClass';
   let { getAppState } = useAppState();
   let { storeSettings } = getAppState();
   let shippingClass = storeSettings.find(s=>s.name === SETTING_NAME);
   return(
      // <AddressForm />
      JSON.stringify(shippingClass || {})
   )
}