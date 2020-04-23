import React, { useEffect,useState  } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddIcon from '@material-ui/icons/Add';
import {PhilippinesAddressForm} from 'components/AddressForm';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import FeatureContextMenu from 'components/FeatureContextMenu';
import ActiveTable from 'components/ActiveTable';
import { ShippingZoneForm } from './forms';

import {makeStyles} from '@material-ui/core/styles';



function ShippingOrigin(){
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


function ShippingZones(){

   const useFormCloseBtnStyle = makeStyles({
      outlined: {
       borderBottom: "none"
      }
    });
    
  
   const { getAppState,dispatch } = useAppState();
   const { shippingZones } = getAppState();
   
   const [displayShippingForm,setDisplayShippingForm] = useState(false);
   const [selectedShippingZone,setSelectedShippingZone] = useState(null);
   const getShippingZones = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE_LIST',dispatch);
   const formCloseBtnClasses = useFormCloseBtnStyle();
   

   //+ button Add New Shipping Zone
   const addShippingClickHandler = ()=>{
      if(selectedShippingZone === null){ //form not visible
         setSelectedShippingZone({});//display
      }else{
         setSelectedShippingZone(null);//toggle hide
      }
   }

   const onFormClose = () => {
      setSelectedShippingZone(null);//toggle hide
   }

   const onRowClick = data => {
      console.log(data);
      setSelectedShippingZone(data);
   }

   useEffect(()=>{//fetch shipping zones 
      getShippingZones();
   },[]);

   
   return(
      <div id="shippingzones-context" className="feature-context">
         <div className="feature-context-title">
            Shipping Zones
         </div>
         <div style={{minWidth: "100%",textAlign:"right"}}>
            <Button startIcon={<AddIcon />} onClick={addShippingClickHandler}>Add Shipping Zone</Button>
         </div>
         {
            selectedShippingZone !== null?
            <div>
               <div style={{minWidth: "100%",textAlign:"right"}}>
                  
                  <Button startIcon={<CloseOutlinedIcon fontSize="small" color="secondary"/>} 
                     variant="outlined" className={formCloseBtnClasses.outlined} onClick={onFormClose}>
                     close
                  </Button>
               </div>
               <ShippingZoneForm data={selectedShippingZone}/>
             
            </div>
            :null
         }
         <br />
         <div style={{textAlign:"center"}}>
            <ActiveTable 
               columnHeaders={
                  [
                     {zoneName: 'Zone Name'},
                     {region: 'Region'}, //ui generated data
                     {regionType: 'Region Type'},
                  ]
               }
               hidden={
                  [
                     '_id','country','phlIslandGroup','province'
                  ]
               }
               data={
                  shippingZones.map( s => {
                     let region = s.country;
                     if(s.phlIslandGroup){
                        region += `, ${s.phlIslandGroup}`;
                     }
                     if(s.province){
                        region += `, ${s.province}`;
                     }
                     return { ...s, region} //region = concat of country,phlIslandGroup,province
                  })
               } 

               onRowClick = { onRowClick }
            />
         </div>
      </div>
   )
}

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

function ShippingClass({}){
   const SETTING_NAME = 'StoreSetting.Shipping.ShippingClass';
   let { getAppState } = useAppState();
   let { storeSettings } = getAppState();
   let shippingClass = storeSettings.find(s=>s.name === SETTING_NAME);
   return(
      // <AddressForm />
      JSON.stringify(shippingClass || {})
   )
}

export default ()=>{

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
                  <Route exact path="/storesettings/shipping/shippingorigin" component={ShippingOrigin} />
                  <Route exact path="/storesettings/shipping/shippingzones" component={ShippingZones}/>
                  <Route exact path="/storesettings/shipping/shippingmethods" component={()=>'Shipping Methods'}/>
                  <Route exact path="/storesettings/shipping/shippingclasses"  component={()=>'Shipping Classes'}/>
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








