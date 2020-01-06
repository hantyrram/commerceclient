import React,{useState, useEffect}from 'react';
import Dialog from '@material-ui/core/Dialog';
import SCategory from 'components/SCategory';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import axios from '../../../axios';
import useStateContext from 'hooks/useStateContext';
import { useGetCountries } from 'actions/useHelpers';

export default ({address, countries, onChange})=>{
  
   let {
      country,
      state,
      city,
      municipality,
      islandGroup,
      bldgOrHouseNo,
      street,
   } = address || {};

   return(
      <form id="address" action="#" onSubmit={()=>{}} style={{minWidth: "70%", display:"flex", flexDirection:"column", justifyContent:'space-around'}}>   
         <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>Country</div>
            <div style={{flex:"2"}}>
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
         {/* <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>State</div>
            <div style={{flex:"2"}}>
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
         <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>Island Group</div>
            <div style={{flex:"2"}}>
               <select name="islandGroup" id="islandGroup" value={islandGroup}>
                  <option value='luzon'>Luzon</option>
                  <option value='visayas'>Visayas</option>
                  <option value='mindanao'>Mindanao</option>
               </select>
            </div>
         </div>
         <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>City</div>
               <div style={{flex:"2"}}>
                  <input type="text" name="city"/>
               </div>
         </div>
         <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>Municipality</div>
               <div style={{flex:"2"}}>
                  <input type="text" name="municipality"/>
               </div>
         </div> */}
         <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap'}}>
            <div style={{flex:"1"}}>Address</div>
            <div style={{flex:"2"}}>
               <input type="text"/>
            </div>
         </div>
         <div style={{display:'flex',flexBasis:'row', flexWrap:'nowrap',justifyContent:'right'}}>            
            <Button type="submit" variant="contained">Save</Button> 
         </div>
         
      </form>
            
   )
}