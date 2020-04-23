import React, { useEffect,useState } from 'react';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import useForm from 'hooks/useForm';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';

const useAddShippingBtnStyle = makeStyles({
   contained: {
    backgroundColor:"#c97e95"
   }
 });
export function ShippingZoneForm({data}){
   
   const addShippingBtnStyle = useAddShippingBtnStyle();
   let {dispatch} = useAppState();

   const NOT_SPECIFIED = 'Not Specified';
   
   //Support for philippines now, get countries from state, on next version.
   const countries = [{name: 'Philippines'}]; 
   const islandGroups = ['Luzon','Visayas','Mindanao'];
   const [psgc,setPsgc] = useState({});
   //region type identifies the specifity of the zone's location, e.g. if both phlIslandGroup & province 
   //has values, regionType is equal to province since it is more specific, this helps in identifying,
   //the rates of shipping methods

   let fetchPSGC = useApiRequest('UTIL$EXTDATA$PSGC_READ', dispatch, ({responseData})=> responseData);
   let addShippingZone = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE_ADD',dispatch);
   let updateShippingZone = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE_EDIT',dispatch);


   const validate = (formData)=>{
      let errors = {};
      if(!formData.zoneName) errors.zoneName = 'Zone Name Required';
      return Object.keys(errors).length > 0 ? errors: null ;
   }

   const onSubmitCallback = ({values,changedValues})=>{
      console.log(`data on onSubmit Callback`,data);
      // if(data._id && Object.keys(data).length > 0){ //must be non empty object to peform edit
      if(data._id){ //must be non empty object to peform edit
         //edit submit changedValues
         console.log('Updating',changedValues);
         updateShippingZone({
            params: {
               shippingZoneId: data._id
            },
            payload: changedValues
         })
         
         return;
      }
      //add submit values
      console.log('Adding',values);
      addShippingZone({payload: values});
      
   }

  

   let {values, onChange ,onSubmit,errors,changedValues, setFormFieldValue} = useForm({ 
      initialValues: {country:'Philippines', regionType: 'country',...data},
      onSubmitCallback, 
      validate
   });

   
   const onChangeIntercept = e => {
      if(e.target.name === 'province' && e.target.value !== NOT_SPECIFIED){
         setFormFieldValue({regionType: 'province', province: e.target.value});
         return;
      }
      if(e.target.name === 'phlIslandGroup' && e.target.value !== NOT_SPECIFIED){
         setFormFieldValue({regionType: 'phlIslandGroup', phlIslandGroup: e.target.value, province: null});
      }
   }

   useEffect(()=>{//load the provinces of the island group
      if(values.phlIslandGroup){
         (async ()=>{
            let provinces = await fetchPSGC({query: `islandgroup=${values.phlIslandGroup}&geolevel=prov`});
            setPsgc({...psgc, provinces});
         })()
      }
   },[]);

   useEffect(()=>{//fetch provinces of the selected island group
      if(values.phlIslandGroup){
         (async ()=>{
            let provinces = await fetchPSGC({query: `islandgroup=${values.phlIslandGroup}&geolevel=prov`});
            setPsgc({...psgc, provinces});
         })()
      }
   },[values.phlIslandGroup]);


   useEffect(()=>{
      let newData = { ...data };
      if(!newData.province){
         newData.province = NOT_SPECIFIED;
      }
      if(!newData.phlIslandGroup){
         newData.phlIslandGroup = NOT_SPECIFIED;
      }
      setFormFieldValue(newData);
   },[data._id])

   return(
      <form action="" onSubmit = {onSubmit} className="grid-form">
         <input type="hidden" name="region" value={values.region} onChange={onChangeIntercept}/>
         <input type="hidden" name="regionType" value={values.regionType} onChange={onChangeIntercept}/>
         <div className="form-control">
            <label htmlFor="zoneName">Zone Name</label>
            <input type="text" name="zoneName" value={values.zoneName} onChange={onChange} className="form-control-input"/>
            <span className="form-input-error">{errors && errors.zoneName}</span>
         </div>
         <h5>Region</h5>
         <hr/>
         <div className="form-control">
            <label htmlFor="country">Country</label>
            <select  name="country" id="country" 
               value={values.country}  className="form-control-input" 
                  onChange={onChange}>
                  {
                     (countries || []).map(c => <option value={c.name}>{c.name}</option> )
                  }
               </select>
               <span className="form-input-error">{errors && errors.country}</span>
         </div>
         <div className="form-control">
            <label htmlFor="phlIslandGroup">Island Group</label>
            <select  name="phlIslandGroup" id="phlIslandGroup" 
               value={values.phlIslandGroup}  className="form-control-input" onChange={onChangeIntercept}>
                  <option value={NOT_SPECIFIED}>{NOT_SPECIFIED}</option>
                  {
                     (islandGroups || []).map(c => <option value={c}>{c}</option> )
                  }
               </select>
               <span className="form-input-error">{errors && errors.phlIslandGroup}</span>
         </div>
         <div className="form-control">
            <label htmlFor="province">Province</label>
            <select  name="province" id="province" 
               value={values.province}  className="form-control-input" onChange={onChangeIntercept}>
                  <option value={NOT_SPECIFIED}>{NOT_SPECIFIED}</option>
                  {
                     (psgc.provinces || []).map(c => <option value={c.Name}>{c.Name}</option> )
                  }
               </select>
               <span className="form-input-error">{errors && errors.province}</span>
         </div>
         {
            !values.shippingMethods || values.shippingMethods.length == 0?
               <div style={{minWidth: "100%",textAlign:"center"}}>
                  <Button size="small" startIcon={<AddIcon />} variant="contained" className={addShippingBtnStyle.contained}>
                     Add Shipping Method
                  </Button>   
               </div>
            :null
         }
         <div className="form-control-action">
            <Button type="submit" variant="contained" disabled={Object.keys(changedValues).length > 0 ? false: true}>
               Save
            </Button> 
         </div>
      </form>
   )
}