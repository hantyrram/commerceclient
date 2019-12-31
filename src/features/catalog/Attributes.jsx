import React, { useContext,useEffect, useState } from 'react';
import StateContext from 'contexts/StateContext';
import feature from '../feature';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ActiveTable from 'components/ActiveTable';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useStateContext from '../../hooks/useStateContext';


import {
   useAttribute_Create
} from 'actions/useAttribute';

function Attributes({history}){
   
   let [openAttributeDialog,setOpenAttributeDialog] = useState(false);
   let [activeAttribute,setActiveAttribute] = useState({});
   let { getStore } = useStateContext();
   const createAttribute = useAttribute_Create();

   const addNewAttributeClickHandler = (e)=>{
      setActiveAttribute({});
      setOpenAttributeDialog(true);
   }

   const onActiveAttributeChange = (e)=>{
      setActiveAttribute({...activeAttribute,[e.target.name]:e.target.value});
   }

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

   const cancelSave = (e)=>{
      setActiveAttribute({});
      setOpenAttributeDialog(false);
   }

   const clickAttribute = (attribute)=>{
      return (e) => {
         e.preventDefault();
         setActiveAttribute(attribute);
         setOpenAttributeDialog(true);
      }
   }
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
                  <h5>Values</h5>
               </div>
            </div>
            {
               getStore().attributes.map( a => {
                  return(
                     <div className="flextable-row" style={{display:'flex',justifyContent:'space-between'}}>
                        <div className="flextable-cell" style={{flex:1}}>
                           <span><a href="" onClick={clickAttribute(a)}>{a.name}</a> </span><br/>
                           <span style={{fontSize:'.8em',fontStyle:'italic'}}>{a.description}</span>
                        </div>
                        <div className="flextable-cell" style={{flex:2}}>
                           <Chip label="Value 1" size="small"/>                 
                           <Button size="small" color="primary"><AddCircleIcon /></Button>
                        </div>
                     </div>
                  )
               })
            }
         </div>
   

         <Dialog open={openAttributeDialog} fullWidth >
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
      </div>
      
   )
   
}

export default feature(Attributes,{
   title: 'Attributes'
})




