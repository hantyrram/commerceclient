import React, { useState, useEffect } from 'react';

export default function EBreadForm(props){

 let [entity,setEntity] = useState(props.entity); 
 let { UISchema,onChange} = props;
 
 useEffect(_=>{
  if(entity._id !== props.entity._id){
   setEntity(props.entity);
  }
 },[]);

 function onSaveClickHandler(entity,e){
  props.onSave(entity);
 }

 function onDeleteClickHandler(entity,e){
  props.onDelete(entity);
 }

 function onSubmit(e){
  e.preventDefault();
 }

 return(
  <div id="eform-container" className="eform boxed">
   <form action="" onSubmit={onSubmit}>
   {
     Object.keys(props.UISchema).map( uiSchemaProp => { // key is the name of the property e.g. { username: {} } k = username
      let element = UISchema[uiSchemaProp];
      let value = entity && entity[uiSchemaProp]? entity[uiSchemaProp] : null;

      let attributes = { ...element.attributes, onChange }; //add the onChange prop as additional attribute
      let dummy = value ? attributes.defaultValue = value: null;

      let children = null;
      //for select input element, add options as children
      if(element.el === "select" || (element.attributes && element.attributes.type === "select")){
       if(element.options && element.options.length > 0){
        children = element.options.map((option,index) => <option key={index} value={option.value}>{option.text}</option>)
       }
      }
      return <div className="eform-inputgroup">
              { element.label ? <label htmlFor={uiSchemaProp}>{element.label}</label> : null }
              { React.createElement(element.el, attributes, children) }
             </div>      
     })
    }
    {props.onSave? <button className="action-button" id="eformread-save" onClick={onSaveClickHandler.bind(entity)}>Save</button> :null}
    {props.onDelete? <button className="action-button" id="eformread-delete" onClick={onDeleteClickHandler.bind(entity)}>Delete</button> :null}
   </form>
    
   </div>
   
 )
}
