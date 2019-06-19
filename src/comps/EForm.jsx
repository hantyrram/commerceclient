import React, { Component, useState,useEffect} from 'react';
import './styles/eform.css';


/**
 * An Object that describes the elements of the form. This Object is the basis of the construction of the Entity Form.
 * @typedef {Object} UISchema
 * @property {Object} @name <name> - Property names are the field names.
 * @property {string} @name <name>.el - The html element name, e.g. "input".
 * @property {string} @name <name>.label - The label of the field.
 * @property {Object} @name <name>.attributes - The elements' html attributes.
 * @property {Array} @name [<name>.options] - The options of the "select" el. Only required if the <name>.el = "select".
 */

/**
 * Entity Form or EForm is a component that provides dynamic UI for single Entity.
 * @constructor
 * @param {Object} props - React.props
 * @param {Object} props.UISchema - The UISchema that describes the elements of the form.
 * @param {Entity} props.Entity - The Entity that is being presented by the Form.
 * 
 */
function EForm(props){
 // render(){
  //get uischema
  // console.log(props.entity);
  const [entity,setEntity] = useState(props.entity);

  let { UISchema,onChange } = props;

  useEffect(()=>{
   if(entity._id !== props.entity._id){
    setEntity(props.entity);
   }
  });

  console.log(entity);
  return(
   
   <div id="eform-container" className="eform boxed">
    {
     Object.keys(props.UISchema).map( uiSchemaProp => { // key is the name of the property e.g. { username: {} } k = username
      
      let element = UISchema[uiSchemaProp]; //input

      let value = entity && entity[uiSchemaProp]? entity[uiSchemaProp] : null;

      let attributes = { ...element.attributes, onChange }; //add the onChange prop as additional attribute

      if (value) attributes.defaultValue = value;

      console.log(value);

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
   </div>
   
  )
 // }
}



export default EForm;


