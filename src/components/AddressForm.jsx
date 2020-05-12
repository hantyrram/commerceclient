
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';


/**
 * @param {Array} props.countries - List of countries using RESTCountries api format. Source of the 
 * @param {Object} props.states - Array of states of the selected Country.
 * @param {Object} props.data - The current data value.
 * @param {function} props.onChange - Input change handler.
 */
export default function Address({data,onSubmit,readOnly, validator}){
   let { getAppState,dispatch } = useAppState();
   let { countries,states,cities } = getAppState();
   let [ psgc, setPsgc] = useState({}); //used for PH only
   let [formState,setFormState] = useState({ country : 'Philippines', phlIslandGroup:'luzon'});
   let [errors, setErrors] = useState();
   let fetchCountries = useApiRequest('UTIL$EXTDATA$COUNTRY_LIST',dispatch, ({responseData})=> responseData);
   let fetchStates = useApiRequest('UTIL$EXTDATA$COUNTRYSTATE_LIST',dispatch, ({responseData})=> responseData);
   let fetchCities = useApiRequest('UTIL$EXTDATA$COUNTRYCITY_LIST',dispatch, ({responseData})=> responseData);
   let fetchPSGC = useApiRequest('UTIL$EXTDATA$PSGC_READ', dispatch, ({responseData})=> responseData);
   

   const defaultSubmitHandler = (e)=>{
      e.preventDefault();
      if(!onSubmit){
         console.warn('AddressForm has no submit handler.');
         return;
      }

      if(validator && typeof(validator) === 'function'){
         let err = validator(formState);
         
         if(Object.keys(err || {}).length >0){
            setErrors(err);
            return;
         }
         
      }

      onSubmit(formState);
      
   }

   const onCountryChange = e => {
      console.log(e.target.value);
      setFormState({...formState, [e.target.name]: e.target.value});
   }

   const onChange = e => {
      setFormState({...formState, [e.target.name]: e.target.value});
   }

   // useEffect(()=>{
   //    fetchCountries();
   // },[]);

   useEffect(()=>{//fetch provinces once, based on phlIslandGroup
      (async ()=>{
         console.log('Fetching Provinces of ',formState.phlIslandGroup);
         let provinces = await fetchPSGC({query: `islandgroup=${formState.phlIslandGroup}&geolevel=prov`});//add query BUT useApiRequest does not yet support queries         
         let municipalities;
         console.log(provinces);
         if(formState.province){
            console.log('Fetching municipalities');
            municipalities = await fetchPSGC({query: `prov=${formState.province}&geolevel=mun`});//add query BUT useApiRequest does not yet support queries         
            setPsgc({...psgc, provinces, municipalities});
            return;
         }
         setPsgc({...psgc, provinces});
      })()
   },[]);

   useEffect(()=>{
      if(data){
         setFormState({...data});
      }
   },[Object.keys(data)]);


   // useEffect(()=>{
   //    if( formState.country !== 'Philippines'){
   //       fetchStates(
   //          {params : {country : formState.country }}
   //       );
   //    }

   // },[formState.country]);


   // useEffect(()=>{
   //    (async ()=>{
   //       console.log('Fetching Provinces of ',formState.phlIslandGroup);
   //       let psgcData = await fetchPSGC({query: `islandgroup=${formState.phlIslandGroup}&geolevel=prov`});//add query BUT useApiRequest does not yet support queries         
   //       setPsgc({...psgc, provinces: psgcData});
   //    })()
   // },[formState.phlIslandGroup]);

   // useEffect(()=>{
   //   if(formState.province){//fetch only if there is already a value for province
   //       (async ()=>{
   //          console.log('Fetching Municipalities of ',formState.province);
   //          let psgcData = await fetchPSGC({query: `prov=${formState.province}&geolevel=mun`});//add query BUT useApiRequest does not yet support queries
   //          setPsgc({...psgc,municipalities: psgcData});
            
   //       })()
   //   }
   // },[formState.province]);

   

   return(
      <form id="data" action="#" onSubmit={defaultSubmitHandler} className="grid-form" >   
         <div className="form-control">
            <label htmlFor="country">Country</label>
            {JSON.stringify(psgc)}
            <select  name="country" id="country" 
               value={formState.country}  className="form-control-input" onChange={onChange}>
                  {/* hardcode Philippines, fix this, MUST always come from countries */}
                  {/* {
                     (countries).map(c => <option value={c.name}>{c.name}</option> )
                     
                  } */}
                  <option value="Philippines">Philippines</option>
            </select>
            <span className="form-input-error">{errors && errors.country}</span>
         </div>
         {

            formState.country === 'Philippines' ?
               <div className="form-control">
                  <label htmlFor="phlIslandGroup">Island Group</label>
                  <select name="phlIslandGroup" id="phlIslandGroup" 
                     value={formState.phlIslandGroup} className="form-control-input" onChange={onChange}>
                        <option value='luzon'>Luzon</option>
                        <option value='visayas'>Visayas</option>
                        <option value='mindanao'>Mindanao</option>
                  </select>
                  <span className="form-input-error">{errors && errors.phlIslandGroup}</span>
               </div>
            :null
         }
         {
             formState.country === 'Philippines'  ?
             <div className="form-control">
                  <label htmlFor="province">Province</label>
                  <select name="province" id="province" 
                     value={formState.province} className="form-control-input" onChange={onChange}>
                     {
                     (psgc.provinces || []).map( e => <option value={e.Name} >{e.Name}</option>)
                     }         
                  </select>
                  <span className="form-input-error">{errors && errors.province}</span>
             </div>
            :null
         }
         {
             formState.country === 'Philippines'  ?
             <div className="form-control">
                  <label htmlFor="municipality">Municipality</label>
                  <select name="municipality" id="municipality" 
                     value={formState.municipality} className="form-control-input" onChange={onChange}>
                     {
                        (psgc.municipalities || []).map( e => <option value={e.Name}>{e.Name}</option>)
                     }         
                  </select>
                  <span className="form-input-error">{errors && errors.municipality}</span>
             </div>
            :null
         }
         {
            console.log(states && states[formState.country] && states[formState.country].length > 0)
         }
         {
            states && states[formState.country] && states[formState.country].length > 0? 
               <div className="form-control">
                  <label htmlFor="state">State</label>
                  <select name="state" id="state" value={formState.state} className="form-control-input">
                        {
                           states[formState.country].map(c => {
                              return (
                                 <option value={c.state_name}>{c.state_name}</option>
                              )
                           })
                        }  
                     </select>
               </div>
            : null
         }
         <div className="form-control">
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" name="zipCode" value={formState.zipCode} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.zipCode}</span>
         </div>
         <div className="form-control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" value={formState.city} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.city}</span>
         </div>
        
         <div className="form-control">
            <label htmlFor="street">Street</label>
            <input type="text" name="street" value={formState.street} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.street}</span>
         </div>
         <div className="form-control">
            <label htmlFor="bldgHouseNo">Building / House No.</label>
            <input type="text" name="bldgHouseNo" value={formState.bldgHouseNo} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.bldgHouseNo}</span>
         </div>
         <div className="form-control-action">
            <Button type="submit" variant="contained" >Save</Button> 
         </div>
         
      </form>
   )
}

export function PhilippinesAddressForm({data,onSubmit,readOnly, validator}){
   let { dispatch } = useAppState();
   let [ psgc, setPsgc] = useState({}); //used for PH only
   let [ provinces, setProvinces ] = useState([]);
   let [ municipalities, setMunicipalities] = useState([]);
   let [formState,setFormState] = useState({ country : 'Philippines', phlIslandGroup:'luzon', ...data});
   let [errors, setErrors] = useState();
   let fetchPSGC = useApiRequest('UTIL$EXTDATA$PSGC_READ', null, ({responseData})=>{
      return responseData;
   });
   

   const defaultSubmitHandler = (e)=>{
      e.preventDefault();
      if(!onSubmit){
         console.warn('AddressForm has no submit handler.');
         return;
      }

      if(validator && typeof(validator) === 'function'){
         let err = validator(formState);
         
         if(Object.keys(err || {}).length >0){
            setErrors(err);
            return;
         }
         
      }

      onSubmit(formState);
      
   }

   const onCountryChange = e => {
      console.log(e.target.value);
      setFormState({...formState, [e.target.name]: e.target.value});
   }

   const onChange = e => {
      setFormState({...formState, [e.target.name]: e.target.value});
   }

   const onReset = e => {
      setFormState({ country : 'Philippines', phlIslandGroup:'luzon', ...data});
   }

  
   useEffect(()=>{//fetch provinces once, based on phlIslandGroup
      (async ()=>{
         console.log('Fetching Provinces of ',formState.phlIslandGroup);
         let provinces = await fetchPSGC({query: `islandgroup=${formState.phlIslandGroup}&geolevel=prov`});//add query BUT useApiRequest does not yet support queries         
         console.log(provinces);
         setProvinces(provinces);
      })()
   },[]);

   useEffect(()=>{
      if(province){
         (async ()=>{
            let municipalities = await fetchPSGC({query: `prov=${formState.province}&geolevel=mun`});//add query BUT useApiRequest does not yet support queries         
            setMunicipalities(municipalities);
         })()
      }
   },[]);

   useEffect(()=>{
      setFormState({...data});
   },[data]);


   useEffect(()=>{
      (async ()=>{
         let provinces = await fetchPSGC({query: `islandgroup=${formState.phlIslandGroup}&geolevel=prov`});//add query BUT useApiRequest does not yet support queries         
         setProvinces(provinces);
      })()
   },[formState.phlIslandGroup]);

   useEffect(()=>{
      setMunicipalities([]);
   },[formState.phlIslandGroup]);

   useEffect(()=>{
     if(formState.province){//fetch only if there is already a value for province
         (async ()=>{
            console.log('Fetching Municipalities of ',formState.province);
            let municipalities = await fetchPSGC({query: `prov=${formState.province}&geolevel=mun`});//add query BUT useApiRequest does not yet support queries
            setMunicipalities(municipalities);
         })()
     }
   },[formState.province]);

   

   return(
      <form id="data" action="#" onSubmit={defaultSubmitHandler} className="grid-form" >   
         <div className="form-control">
            <label htmlFor="country">Country</label>
            <select  name="country" id="country" 
               value={formState.country}  className="form-control-input" onChange={onChange}>
                  {/* hardcode Philippines, fix this, MUST always come from countries */}
                  {/* {
                     (countries).map(c => <option value={c.name}>{c.name}</option> )
                     
                  } */}
                  <option value="Philippines">Philippines</option>
            </select>
            <span className="form-input-error">{errors && errors.country}</span>
         </div>
         {

            formState.country === 'Philippines' ?
               <div className="form-control">
                  <label htmlFor="phlIslandGroup">Island Group</label>
                  <select name="phlIslandGroup" id="phlIslandGroup" 
                     value={formState.phlIslandGroup} className="form-control-input" onChange={onChange}>
                        <option value='luzon'>Luzon</option>
                        <option value='visayas'>Visayas</option>
                        <option value='mindanao'>Mindanao</option>
                  </select>
                  <span className="form-input-error">{errors && errors.phlIslandGroup}</span>
               </div>
            :null
         }
         {
             formState.country === 'Philippines'  ?
             <div className="form-control">
                  <label htmlFor="province">Province</label>
                  <select name="province" id="province" 
                     value={formState.province} className="form-control-input" onChange={onChange}>
                     {
                        provinces.map( (e,i) => <option key={i} value={e.Name} >{e.Name}</option>)
                     }         
                  </select>
                  <span className="form-input-error">{errors && errors.province}</span>
             </div>
            :null
         }
         {
             formState.country === 'Philippines'  ?
             <div className="form-control">
                  <label htmlFor="municipality">Municipality</label>
                  <select name="municipality" id="municipality" 
                     value={formState.municipality} className="form-control-input" onChange={onChange}>
                     {
                        municipalities.map((e,i) => <option key={i} value={e.Name}>{e.Name}</option>)
                     }         
                  </select>
                  <span className="form-input-error">{errors && errors.municipality}</span>
             </div>
            :null
         }
         <div className="form-control">
            <label htmlFor="zipCode">Zip Code</label>
            <input type="text" name="zipCode" value={formState.zipCode} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.zipCode}</span>
         </div>
         <div className="form-control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" value={formState.city} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.city}</span>
         </div>
        
         <div className="form-control">
            <label htmlFor="street">Street</label>
            <input type="text" name="street" value={formState.street} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.street}</span>
         </div>
         <div className="form-control">
            <label htmlFor="bldgHouseNo">Building / House No.</label>
            <input type="text" name="bldgHouseNo" value={formState.bldgHouseNo} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.bldgHouseNo}</span>
         </div>
         <div className="form-control-action">
            <Button type="button" variant="contained"  color="secondary" onClick={onReset}>Reset</Button>
            <Button type="submit" variant="contained" >Save</Button> 
         </div>
         
      </form>
   )
}