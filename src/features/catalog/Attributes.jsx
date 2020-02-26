import React, { useContext,useEffect, useState } from 'react';

import feature from '../feature';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopOver from '@material-ui/core/Popover';
import useApiRequest from 'api/useApiRequest';
import useAppState from 'appstore/useAppState';


function AddTermContextMenu({onAddTermClick}){

   let [anchorEl,setAnchorEl] = useState(null);

   const triggerClickHandler = (e)=>{
      setAnchorEl(e.currentTarget);
   }

   const handleClose = e => {
      setAnchorEl(null);
   }

   const addTermClickHandler = e =>{
      setAnchorEl(null);
      onAddTermClick();
   }
   return (
      <React.Fragment>
         <Chip label="..." size="small" onClick={triggerClickHandler}/>
         <PopOver
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical:'bottom',
               horizontal: 'left'
            }}
         >
            <Button size="small" onClick={addTermClickHandler}>Add Term</Button>
         </PopOver>
      </React.Fragment>
   )
}

function Attributes({history}){
   
   let { getAppState,dispatch } = useAppState();
   let [openAttributeDialog,setOpenAttributeDialog] = useState(false);
   let [openAttributeAddTermDialog,setOpenAttributeAddTermDialog] = useState(false);
   let [activeAttribute,setActiveAttribute] = useState({});
   let [activeAttributeTerm,setActiveAttributeTerm] = useState(null);
   
   const addTermOnBeforeDispatch = ({requestParams,responseData})=>{
      return {_id: requestParams.productattributeId, terms: [responseData.resource]}
   }

   
   const deleteTermOnBeforeDispatch = ({requestParams,requestPayload})=>{
      console.log(requestPayload);
      return {_id: requestParams.productattributeId, terms: [requestPayload.term]}
   }

   const fetchAttributes = useApiRequest('PRODUCTATTRIBUTE_LIST',dispatch);   
   const createAttribute = useApiRequest('PRODUCTATTRIBUTE_CREATE',dispatch);
   const addTerm = useApiRequest('PRODUCTATTRIBUTE$TERMS_ADD',dispatch,addTermOnBeforeDispatch);
   const deleteTerm = useApiRequest('PRODUCTATTRIBUTE$TERMS_REMOVE',dispatch,deleteTermOnBeforeDispatch);

   const addNewAttributeClickHandler = (e)=>{
      setActiveAttribute({});
      setOpenAttributeDialog(true);
   }

   const onActiveAttributeChange = (e)=>{
      setActiveAttribute({...activeAttribute,[e.target.name]:e.target.value});
   }

   //Save Attribute
   const saveAttribute = (e)=>{
      console.log('Adding',activeAttribute);
      if(!activeAttribute._id){
         //immature validation don't save on undefined name
         activeAttribute.name && activeAttribute.name.length > 3 ?createAttribute(activeAttribute): null;
      }else{
         //updateAttribute
         console.log('Updating',activeAttribute);
      }
      setOpenAttributeDialog(false);
   }

   //Cancel Attribute Save
   const cancelSave = (e)=>{
      setActiveAttribute({});
      setOpenAttributeDialog(false);
   }

   //Attribute Link was clicked
   const clickAttribute = (attribute)=>{
      return (e) => {
         e.preventDefault();
         setActiveAttribute(attribute);
         setOpenAttributeDialog(true);
      }
   }

   //ADD TERM context menu was clicked,open dialog
   const onAddTermClick = (attribute)=>{
      return (e) => {
         setActiveAttribute(attribute);
         setActiveAttributeTerm(null);//always reset term field
         setOpenAttributeAddTermDialog(true);
      }
   }

   

   useEffect(()=>{
      fetchAttributes();
   },[])

   return(
      <div>
         <div>
            <Button size="small" color="primary" onClick={addNewAttributeClickHandler}>Add New Attribute</Button>
         </div>
         <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column'}}>
           <div className="flextable-row" style={{display:'flex',justifyContent:'space-between'}}>
               <div className="flextable-cell" style={{flex:1}}>
                  <h5>Attribute</h5>
               </div>
               <div className="flextable-cell" style={{flex:2}}>
                  <h5>Terms</h5>
               </div>
            </div>
            {
               getAppState().attributes.map( a => {
                  return(
                     <div className="flextable-row" style={{display:'flex',justifyContent:'space-between',borderBottom: '1px solid #cec5c5'}}>
                        <div className="flextable-cell" style={{flex:1}}>
                           <span><a href="" onClick={clickAttribute(a)}>{a.name}</a> </span><br/>
                           <span style={{fontSize:'.8em',fontStyle:'italic'}}>{a.description}</span>
                        </div>
                        <div className="flextable-cell" style={{flex:2}}>
                           {
                              (a.terms || []).map( t => 
                                 <Chip label={t} size="medium" onDelete={ () => {
                                       deleteTerm(
                                             {
                                                params: {productattributeId: a._id},
                                                payload: {term: t}
                                             }
                                       )
                                       // deleteTerm(a._id,t); //attribute._id,term
                                    } 
                                 }/> 
                                 
                              )
                           }                
                           
                           <AddTermContextMenu onAddTermClick={onAddTermClick(a)}/>
                           
                        </div>
                     </div>
                  )
               })
            }
         </div>
   
         {/* add attribute dialog */}
         <Dialog id="attribute-add-dialog" open={openAttributeDialog} fullWidth >
            <DialogTitle>Add New Attribute</DialogTitle>
            <DialogContent>
               <div className="form-input-control">
                  <label htmlFor="name">Attribute Name</label>
                     <input type="text" name="name" id="attribute-name" value={activeAttribute.name} onChange={onActiveAttributeChange} minLength="4"/>                  
                  <label className="form-control field-description">The name of the attribute e.g. color</label>
               </div>
               <div className="form-input-control">
                  <label htmlFor="description">Description</label>
                     <input type="text" name="description" id="attribute-description" value={activeAttribute.description} onChange={onActiveAttributeChange} minLength="4"/>                  
                  <label className="form-control field-description">The description of the Attribute</label>
               </div>
            </DialogContent>            
            <DialogActions>
               <Button variant="contained" color="secondary" onClick={cancelSave}>Cancel</Button>
               <Button variant="contained" color="primary"  onClick={saveAttribute}>Ok</Button>
            </DialogActions>
         </Dialog>

            {/* add term dialog */}
          <Dialog id="attribute-addterm-dialog" open={openAttributeAddTermDialog} fullWidth >
            <DialogTitle>New Term</DialogTitle>
            <DialogContent>
               <div className="form-input-control">
                  <label htmlFor="name">Term Name</label>
                     <input type="text" name="term" id="attribute-term" value={activeAttributeTerm} 
                        onChange={(e)=>setActiveAttributeTerm(e.target.value)} minLength="4"/>                  
                  <label className="form-control field-description">The name of the attribute e.g. color</label>
               </div>               
            </DialogContent>            
            <DialogActions>
               <Button variant="contained" color="secondary" 
                  onClick={()=>{
                     setActiveAttributeTerm(null);
                     setOpenAttributeAddTermDialog(false); 
                  }}> Cancel </Button>

               <Button variant="contained" color="primary"  
                  onClick={ e => {
                     addTerm(activeAttribute._id,activeAttributeTerm);
                     addTerm({
                        params: {productattributeId: activeAttribute._id},
                        payload: {term: activeAttributeTerm}
                     })
                     setOpenAttributeAddTermDialog(false); 
                  } } > Ok </Button>
                  
               
            </DialogActions>
         </Dialog>
      </div>
      
   )
   
}

export default feature(Attributes,{
   title: 'Attributes'
})




