
import React from 'react';
import Button from '@material-ui/core/Button';
/**
 * @param {Array} props.countries - List of countries using RESTCountries api format. Source of the 
 * @param {Object} props.states - Array of states of the selected Country.
 * @param {Object} props.data - The current data value.
 * @param {function} props.onChange - Input change handler.
 */
export default function Address({data,countries,states,onChange,onSubmit,readOnly}){

   let {
      country,
      phlIslandGroup,
      state,
      zipcode,
      city,
      street,
      municipality,
      bldgHouseNo
   } = data || {}

   const defaultSubmitHandler = (e)=>{
      e.preventDefault();
      if(!onSubmit){
         console.warn('onSubmit is undefined');
         return;
      }
      onSubmit(e);
   }

   return(
      <form id="data" action="#" onSubmit={defaultSubmitHandler}>   
         <h3>Store Address</h3>
         <hr/>
         <div className="form-input-control form-input-control-inline">
            <label htmlFor="country">Country</label>
            <select  name="country" id="country" value={country} onChange={onChange}>
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
            country === 'Philippines' ?
               <div className="form-input-control">
                  <label htmlFor="phlIslandGroup">Island Group</label>
                  <select name="phlIslandGroup" id="phlIslandGroup" value={phlIslandGroup}>
                        <option value='luzon'>Luzon</option>
                        <option value='visayas'>Visayas</option>
                        <option value='mindanao'>Mindanao</option>
                     </select>
               </div>
            :null
         }
         {
            states && states.length !== 0 ? 
               <div className="form-input-control">
                  <label htmlFor="state">State</label>
                  <select name="state" id="state" value={state}>
                        {
                           states.map(c => {
                              return (
                                 <option value={c.state_name}>{c.state_name}</option>
                              )
                           })
                        }  
                     </select>
               </div>
            : null
         }
         <div className="form-input-control">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" name="zipcode" value={zipcode} onChange={onChange}/>
         </div>
         <div className="form-input-control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" value={city} onChange={onChange}/>
         </div>
         <div className="form-input-control">
            <label htmlFor="municipality">Municipality</label>
            <input type="text" name="municipality" value={municipality} onChange={onChange}/>
         </div>
         <div className="form-input-control">
            <label htmlFor="municipality">Street</label>
            <input type="text" name="municipality" value={street} onChange={onChange}/>
         </div>
         <div className="form-input-control">
            <label htmlFor="bldgHouseNo">Building / House No.</label>
            <input type="text" name="bldgHouseNo" value={bldgHouseNo} onChange={onChange}/>
         </div>
         <Button type="submit" variant="contained" >Save</Button> 
      </form>
   )
}