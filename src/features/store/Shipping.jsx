import React, { useState,useEffect, useContext } from 'react';
import FeatureShortcutLink from 'components/FeatureShortcutLink';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import StateContext from 'contexts/StateContext';
import feature from '../feature';



function Shipping(props){
   return(
      <form id="product-add" action="#" >   
            <div className="form-input-control form-input-control-inline">
               <h4>Shipping Origin</h4>
               <hr/>
               <div className="form-input-control" style={{maxWidth:"50%"}}>
               <label htmlFor="type">Product Type</label>
               <select name="type" id="product-type" value={p.type} onChange={onChange}>
                  <option value="standard">Standard</option>
                  <option value="bundled">Bundled</option>
                  </select>
               </div >
               <p>
                  Set The Origin Of Shipping, version 1 is single origin 
                  get the complete address. e.g. country,state,provice,city,zip code latitude and longitude
                  use the rest api for countries                  
               </p>
               <p>
                  <code>
                     upon setting the origin, we can now identify the Domestic Zone
                  </code>
               </p>
            </div>   
      </form>      
   )
}


export default feature(Shipping,{
   title: 'Shipping',
   // shortcutLinks: [
   //    <FeatureShortcutLink to="/catalog/products">Shipping Products</FeatureShortcutLink>
   // ]
})



