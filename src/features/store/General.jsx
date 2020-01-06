import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import StateContext from 'contexts/StateContext';
import feature from '../feature';
import axios from '../../axios';
import GeneralSettingMenu from './components/GeneralSettingMenu';
import GeneralSettingBasicForm from './components/GeneralSettingBasicForm';
import GeneralSettingAddressForm from './components/GeneralSettingAddressForm';
import { useGetCountries } from 'actions/useHelpers';
import useStateContext from 'hooks/useStateContext';
import Button from '@material-ui/core/Button';

function AddressSetting({address}){
   let { getStore } = useStateContext();
   let getCountries = useGetCountries();
   let {
      country,
      state,
      city,
      municipality,
      islandGroup,
      bldgOrHouseNo,
      street,
   } = address || {};
   useEffect(()=>{
      getCountries();
   },[]);

   return(
      <form id="address" action="#" onSubmit={()=>{}} style={{minWidth: "70%",gridRowGap:'.5em', display:"grid", justifyContent:'left'}}>   
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>
            <div style={{}}>Country</div>
            <div style={{gridColumnStart:"2",gridColumnEnd:"3"}}>
               <select name="country" id="country" value={country}>
                  {
                     (getStore().countries || []).map(c => {
                        return (
                           <option value={c.alpha3Code}>{c.name}</option>
                        )
                     })
                  }
               </select>
            </div>
         </div>
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>
            <div style={{}}>State</div>
            <div style={{gridColumnStart:"2",gridColumnEnd:"3"}}>
               <select name="state" id="state" value={state}>
                  {
                     (getStore().USStates || []).map(c => {
                        return (
                           <option value={c.alpha3Code}>{c.name}</option>
                        )
                     })
                  }  
               </select>
            </div>
         </div>
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>
            <div style={{flex:"1"}}>Zip Code</div>
            <div style={{flex:"2"}}>
               <input type="text" name="zipcode"/>
            </div>
         </div>
         <div style={{display:'flex', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>Island Group</div>
            <div style={{flex:"2"}}>
               <select name="islandGroup" id="islandGroup" value={islandGroup}>
                  <option value='luzon'>Luzon</option>
                  <option value='visayas'>Visayas</option>
                  <option value='mindanao'>Mindanao</option>
               </select>
            </div>
         </div>
         <div style={{display:'flex', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>City</div>
            <div style={{flex:"2"}}>
               <input type="text" name="city"/>
            </div>
         </div>
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>
            <div style={{}}>Municipality</div>
            <div style={{gridColumnStart:"2",gridColumnEnd:"3"}}>
                  <input type="text" name="municipality"/>
               </div>
         </div>
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>
            <div style={{}}>Street</div>
            <div style={{gridColumnStart:"2",gridColumnEnd:"3"}}>
               <input type="text"/>
            </div>
         </div>
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>
            <div style={{}}>Building / House No.</div>
            <div style={{gridColumnStart:"2",gridColumnEnd:"3"}}>
               <input type="text" name="bldgHouseNo"/>
            </div>
         </div>
         <div style={{display:'grid',gridTemplateColumns:"auto auto auto"}}>        
            <Button type="submit" variant="contained">Save</Button> 
         </div>
         
      </form>
   )
}

function General(props){
   let [setting,setSetting] = useState({});
   let [countries,setCountries] = useState([]);
   //get from store
   const onChange = ()=>{}

    return(
      <Router>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:''}}>
            <Switch>               
               <Route exact path="/settings/store" component={GeneralSettingBasicForm}/>
               <Route exact path="/settings/store/general/address" component={AddressSetting}/>
               <Route exact path="/settings/store/general/currencies"  component={()=>'Currencies'}/>
            </Switch>
            <div style={{display:'flex',minWidth:'30%',justifyContent:'center'}}>
               <GeneralSettingMenu />
            </div>
      </div>
      </Router>
   )
}


export default feature(General,{
   title: 'General Store Setting',
   // shortcutLinks: [
   //    <FeatureShortcutLink to="/catalog/products">Shipping Products</FeatureShortcutLink>
   // ]
})



