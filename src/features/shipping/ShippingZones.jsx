import React, { useEffect,useState  } from 'react';

import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import ActiveTable from 'components/ActiveTable';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AddIcon from '@material-ui/icons/Add';
import useForm from 'hooks/useForm';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import shippingMethods from './shippingMethods';
import Form from 'components/Form';


function AddShippingMethodDialog({open,cancelHandler,confirmHandler}){
 
   const { 
      values, 
      errors, 
      onChange,
      setFormFieldValue
   } = useForm({ 
         initialValues: { 
            // shippingMethodName: "FLAT_RATE_SHIPPING",
            // title: shippingMethods.find(sm=>sm._name === "FLAT_RATE_SHIPPING").defaultTitle 
         }
      });

   const confirmClickHandler = e =>{
      confirmHandler(values);
   }

   return(
      <Dialog open={open} fullWidth >
         <DialogTitle>Add Shipping Method</DialogTitle>
         <DialogContent>
            <Form action="">
               <div className="form-control">
                  <label htmlFor="_name">Select Shipping Method</label>
                  <select  name="_name" id="_name" 
                     value={values._name}  className="form-control-input" onChange={onChange}>
                        {
                           shippingMethods.map(sm => <option value={sm._name}>{sm.defaultTitle}</option> )
                        }
                     </select>
                     <span className="form-input-error">{errors && errors._name}</span>
               </div>
               <div className="form-control">
                  <label htmlFor="title">Title</label>
                  <input type="text" name="title" value={values.title} 
                     onChange={onChange} className="form-control-input"/>
                  <span className="form-input-error">{errors && errors.title}</span>
               </div>
               <div className="form-control">
                  <label htmlFor="description">Description</label>
                  <input type="text" name="description" value={values.description} onChange={onChange} className="form-control-input"/>
                  <span className="form-input-error">{errors && errors.description}</span>
               </div>
               <div className="form-control">
                  <label htmlFor="cost">Cost</label>
                  <input type="text" name="cost" value={values.cost } 
                     onChange={onChange} className="form-control-input" defaultValue={0}/>
                  <span className="form-input-error">{errors && errors.cost}</span>
               </div>
            </Form>
         </DialogContent>
         <DialogActions>
            <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={cancelHandler}>Cancel</Button>
            <Button variant="contained" color="primary"  onClick={confirmClickHandler}>Ok</Button>
         </DialogActions>
         {/* <div className="actions-container button-actions-container" style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
            <Button variant="contained" color="secondary" style={{marginRight:'1em'}} onClick={selectCategoryModalCancelHandler}>Cancel</Button>
            <Button variant="contained" color="primary"  onClick={selectCategoryModalOkHandler}>Ok</Button>
         </div> */}
      
      </Dialog>
   )
}

export function ShippingZoneForm(props){
   let { data } = props;
   const useAddShippingBtnStyle = makeStyles({
      root:{
         textTransform:"none",
         fontWeight:"unset",
         lineHeight:"unset",
         margin: "1em",
         '&:hover':{
            fontWeight:600
         }
      },
      contained: {
         backgroundColor:"#f3d1db",
         color: "#444344"
      }
    });
  
   const addShippingBtnStyle = useAddShippingBtnStyle();
   let {dispatch} = useAppState();

   const NOT_SPECIFIED = 'Not Specified';
   
   //Support for philippines now, get countries from state, on next version.
   const countries = [{name: 'Philippines'}]; 
   const islandGroups = ['Luzon','Visayas','Mindanao'];
   const [psgc,setPsgc] = useState({});
   const [openAddShippingMethodDialog,setOpenAddShippingMethodDialog] = useState(false);
   const [closeForm,setCloseForm] = useState(false);

   //region type identifies the specifity of the zone's location, e.g. if both phlIslandGroup & province 
   //has values, regionType is equal to province since it is more specific, this helps in identifying,
   //the rates of shipping methods

   const fetchPSGC = useApiRequest('UTIL$EXTDATA$PSGC_READ', dispatch, ({responseData})=> responseData);
   const addShippingZone = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE_ADD',dispatch);
   const updateShippingZone = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE_EDIT',dispatch);
   const addShippingMethod = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_ADD',dispatch)
   const deleteShippingMethod = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE$SHIPPINGMETHOD_DELETE',dispatch);

   const validate = (formData)=>{
      let errors = {};
      if(!formData.zoneName) errors.zoneName = 'Zone Name Required';
      return Object.keys(errors).length > 0 ? errors: null ;
   }

   const initialValues = {
      country:'Philippines', regionType: 'country',...data
   }

   const onSubmitCallback = ({values,changedValues})=>{
      console.log(`data on onSubmit Callback`,data);
      // if(data._id && Object.keys(data).length > 0){ //must be non empty object to peform edit
      if(data && data._id){ //must be non empty object to peform edit
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
      setFormFieldValue(initialValues);
   }

   let {values, onChange ,onSubmit,errors,changedValues, setFormFieldValue} = useForm({ 
      initialValues,
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

   const addShippingMethodHandler = shippingMethod => {
      setOpenAddShippingMethodDialog(false);
      addShippingMethod({
            params: { shippingZoneId: data._id},
            payload: shippingMethod
      })
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
   },[ data && data._id])



   return(
      // <Form action="" onSubmit = {onSubmit} className="grid-form padded bordered">
      <Form action="" closeable onClose={props.onClose} onSubmit={onSubmit} title="Shipping Zone">
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
            //don't display on Add
            data && data._id ? 
               <React.Fragment>
                  <h5>Shipping Methods</h5>
                  <hr/>
                  <div style={{minWidth:"100%",textAlign:"center",border: ".5px solid var(--border-and-line-color)"}}>
                     <ActiveTable 
                        columnHeaders={
                           [
                              { title: 'Shipping Method Title' },
                              { enabled: 'Enabled' },
                              { description: 'Description' }
                           ]
                        }
                        data={data.shippingMethods}
                        showHeadersOnNoData
                        onRowDelete = { shippingMethod => {
                           deleteShippingMethod({
                                 params: { shippingZoneId: data._id, _name: shippingMethod._name } 
                           })
                        } }

                     />
                     <Button size="small" startIcon={<AddIcon />} 
                        variant="contained" classes={{...addShippingBtnStyle}} onClick={()=>setOpenAddShippingMethodDialog(true)}>
                        Add Shipping Method
                     </Button>   
                  </div>
               </React.Fragment>
            : null
         }

         
         
         <div className="form-control-action">
            <Button type="submit" variant="contained" disabled={Object.keys(changedValues).length > 0 ? false: true}>
               Save
            </Button> 
         </div>
         <AddShippingMethodDialog open={openAddShippingMethodDialog} 
            cancelHandler={()=>setOpenAddShippingMethodDialog(false)}
            confirmHandler={addShippingMethodHandler}
         />
      </Form>
   )
}


export default function ShippingZones(props){
   
   const useFormCloseBtnStyle = makeStyles({
      root: {
         fontWeight:"unset",
         lineHeight:"unset",
         textTransform:"unset",
         "&hover": {
            hover: {
               fontWeight: 600
            }
         }
      },
      outlined: {
       borderBottom: "none",
       borderColor:"var(--border-and-line-color)"
   
      }
    });
 
    const useAddShippingZoneBtnStyle = makeStyles({
      root: {
         fontWeight:"unset",
         lineHeight:"unset",
         textTransform:"unset",
         "&hover": {
            hover: {
               fontWeight: 600
            }
         }
      }
   })
   

   const { getAppState,dispatch } = useAppState();
   const { shippingZones } = getAppState();
   const [selectedShippingZone,setSelectedShippingZone] = useState(null);
   const getShippingZones = useApiRequest('STORESETTING$SHIPPING$SHIPPINGZONE_LIST',dispatch);
   const deleteShippingZone = useApiRequest("STORESETTING$SHIPPING$SHIPPINGZONE_DELETE",dispatch);
   const formCloseBtnClasses = useFormCloseBtnStyle();
   const formAddShippingBtnClasses = useAddShippingZoneBtnStyle();
   
   useEffect(()=>{//fetch shipping zones 
      getShippingZones();
   },[]);

   return(
      <div id="shippingzones-context" className="feature-context">
         <div className="feature-context-title">
            Shipping Zones
            {/* <div style={{minWidth: "100%",textAlign:"left"}}>
               
            </div> */}
            <Button size="small" color="primary" 
               variant="contained" classes={formAddShippingBtnClasses} 
                  startIcon={<AddIcon />} 
                     onClick={
                           e => {
                              if(selectedShippingZone === null){ //form not visible
                                 setSelectedShippingZone({});//display
                              }else{
                                 setSelectedShippingZone(null);//toggle hide
                              }
                           } 
                        }>
                  Add Shipping Zone
            </Button>
         </div>
         
         {
            selectedShippingZone !== null?
            <div>
               <div style={{minWidth: "100%",textAlign:"right"}}>
                  <Button 
                     startIcon={<CloseOutlinedIcon fontSize="small" color="secondary"/>} 
                        variant="outlined" classes={{...formCloseBtnClasses}} 
                           onClick={
                              e => {
                                 setSelectedShippingZone(null);//toggle hide
                              }
                            }>
                     close
                  </Button>
               </div>
               {/* always retrieve the data from shippingZones, in order to retrieve the fresh data
                  e.g. in order to get the updated shipping methods of the shipping zone 
               */}
               <ShippingZoneForm 
                     data={shippingZones.find(sz=> sz._id === selectedShippingZone._id)}
                     onClose={ e => setSelectedShippingZone(null) }
               />
            </div>
            :null
         }
         <br />
         <ActiveTable 
               columnHeaders={
                  [
                     {zoneName: 'Zone Name'},
                     {region: 'Region'}, //ui generated data
                     {regionType: 'Region Type'},
                  ]
               }
               hidden={['_id','country','phlIslandGroup','province']}
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

               onRowClick = { rowdata => setSelectedShippingZone(rowdata) }
               onRowDelete = { rowdata => deleteShippingZone({ params: { _id: rowdata._id } }) }
            />
      </div>
   )
}