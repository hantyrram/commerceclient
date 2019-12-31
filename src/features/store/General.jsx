import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import StateContext from 'contexts/StateContext';
import feature from '../feature';
import axios from '../../axios';
import GeneralSettingMenu from './components/GeneralSettingMenu';
import GeneralSettingBasicForm from './components/GeneralSettingBasicForm';


function General(props){
   let [setting,setSetting] = useState({});
   let [countries,setCountries] = useState([]);
   //get from store
   const onChange = ()=>{}

   useEffect(()=>{
      (async ()=>{
         let response = await axios('https://restcountries.eu/rest/v2/all');
         console.log(response.data)
         if(response.status === 200){
            setCountries(
               response.data.reduce((acc,el)=>{
                  console.log(acc);
                  let {alpha3code,name,currencies} = el;
                  acc.push({name,alpha3code,currencies});
                  return acc;
               },[])
            )
         }
      })()
   },[]);

   return(
      <Router>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:''}}>
            <Switch>               
               <Route exact path="/settings/store/general" component={GeneralSettingBasicForm}/>
               <Route exact path="/settings/store/general/address" component={()=>'Address'}/>
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



