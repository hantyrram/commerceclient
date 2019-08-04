import React, { useState} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Styled from 'styled-components';

const FormTitle = Styled.div`
   // border-bottom: 1px solid #979595;
   font-size: 1.5em;
   font-weight: bold;
   font-style: italic;
   color: #bd9696;
   padding-bottom: .5em;
   margin-bottom: 1em;
`
const Form = Styled.form`
   background-color: white;
   border: 1px solid #d6cdcd;
   color: #595555;
   padding: 1em;
   font-family: arial;
   font-size: .9em;
   display: flex;
   flex-direction: column;
   justify-content: center;
   & input[readOnly] {
      background-color:#f5efef
   }
`
const FormControl = Styled.div`
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   margin: .5em;
`

const FormControlLabel = Styled.div`
  width: 30%;
`
const FormControlInput = Styled.div`
  width: 70%;
`

const inputBorder= '1px solid #ccd4d7';

const Input = Styled.input`
   padding-left: .5em;
   padding-right: .5em;
   height: ${props=>props.height || '2em'};
   width: ${props=> props.width};
   background-color: ${props=>props.readOnly ? "#f5efef": "white"};
   border : ${props=>props.readOnly ? "none": inputBorder};
`
const Label = Styled.label`
   &:after {
      ${props => props.required? `content: " *";`:""}
      color: red;
   }
   
`

const Select = Styled.select`
   height: ${props=>props.height || '30px;'}
   width: ${props=> props.width}
   border : ${props=>props.readOnly ? "none": inputBorder};
`

const FormActionControl = Styled(FormControlInput)`
   text-align:right;
   width: 100%;
`
/**
 * EFormRead supports the Read functionality of BREAD.
 * @constructor
 * @param {Object} props - React.props
 * @param {Object} props.uischema - The uischema that describes the elements of the form.
 * @param {Entity} [props.Entity] - The Entity that is being presented by the Form.
 * @param {Entity} props.entity - The entity instance/object that is being presented by the Form.
 */
export default function EForm(props){

 const [entity,setEntity] = useState(props.entity ? Object.assign({},props.entity): {});
 
 if(!props.uischema) return "No Schema";

 const changeHandler = e => {
  setEntity(Object.assign(entity,{[e.target.name]:e.target.value}));
 }

 const renderElements = ()=>{
  let elements = [];
  for(let key of Object.keys(props.uischema)){
   //if prop contains the current key,use that as the component.
   //This allows the use of component for specific Field.
   if(props[key]){
    let Element = props[key];
           
    elements.push(
          <>
           <FormControl className="eform-inputgroup">
            <FormControlLabel htmlFor={key} {...props.uischema[key].labelAttributes}>{key.replace(/^[a-z]/,key.charAt(0).toUpperCase())}</FormControlLabel>
            <FormControlInput>
               <Element />
            </FormControlInput>
           </FormControl>
           
          </>
           );
    continue;
   }

   let element;
   let attributes;
   if(props.type === 'adder' || !props.type){
    //skip readOnly fields on Add
    if(props.uischema[key].attributes && props.uischema[key].attributes.readOnly) continue; 
    
    element = props.uischema[key];
    attributes = { ...element.attributes, onChange:changeHandler, defaultValue: element.attributes.defaultValue || ""};
    
   }else{
    element = props.uischema[key]; //input field
    let value = entity && entity[key]? entity[key] : null;
    if(!value) continue; //skip creating input fields for property that has no value
    attributes = { ...element.attributes }; //add the changeHandler prop as additional attribute
    //the reason value is checked is value won't exist on type 'adder';
    if(props.type === 'editor') {
     attributes.onChange = changeHandler; //add changeHandler handler if editor
     attributes.defaultValue = ""; //clear by default, to clear previous value
     if(value) attributes.defaultValue = value;
    }
    if(props.type === 'reader'){
     attributes.value = ""; //clear by default, to clear previous value
     if(value) attributes.value = value; //makes readOnly
     attributes.readOnly = true;
    }
   //  transform on none zero length value && if transform is available on uischema
    if(String(attributes.value).length > 0 && props.uischema[key].transform){
     if(attributes.value){
      attributes.value = props.uischema[key].transform(attributes.value);
     }
     if(attributes.defaultValue){
      attributes.defaultValue = props.uischema[key].transform(attributes.defaultValue);
     }
    }
   }

    let children = null;
  
    //for select input element, add options as children
   //  if(element.el === "select" || (element.attributes && element.attributes.type === "select")){
   //   if(element.options && element.options.length > 0){
   //    children = element.options.map((option,index) => <option key={index} value={option.value}>{option.text}</option>)
   //   }
   //  }

    let Element;
    let computedFontSize = Number(window.getComputedStyle(window.document.body).fontSize.replace(/px/,''));
   //  let width = null;
    
   //  if(element.attributes.maxLength){
   //    width = computedFontSize * element.attributes.maxLength;
   //  }

    switch(element.el){
       case 'select':{
         let computedWidth = computedFontSize * (element.attributes.maxLength || 1); // || 1 if maxlength is undefined
         computedWidth += 'px';
         if(props.type === 'reader'){
            //get the value of the entity vt = {value,text}
            element.options = element.options.filter(vt=> vt.value === entity[key]);
         }
         Element = <Select {...attributes} width={computedWidth} disabled= {props.type === 'reader' ? true:false } >
            {
               
               element.options && element.options.length > 0 ? 
                  element.options.map((option,index) => <option key={index} value={option.value}>{option.text}</option>) 
               : null
            }
          </Select>
       }break;
       default : // 'input'
         Element = <Input {...attributes} width = {(computedFontSize * (attributes.maxLength || 1) / 2) + 'px'} />;
         
         if(element.el.attributes && element.el.attributes.type){//type specified
            switch(element.el.attributes.type){
               case 'date':{
                  let computedHeight = (computedFontSize * 2) + 'px';
                  // width = {attributes.maxLength + 'em'}
                  Element = <Input {...attributes}  height={computedHeight} />
               }break;
               
               default: 
                  let computedWidth = attributes.maxLength ? { width: ((computedFontSize * attributes.maxLength / 2) + 'px') } : null;
                  Element = <Input {...attributes} {...computedWidth} />
            }
         }
         // else{//default input
         //    // length of 1 can fit 2 characters(computedFontSize) hence / 2
         //    Element = <Input {...attributes} width = {(computedFontSize * attributes.maxLength / 2) + 'px'} />
         // }
      //  break;
      //  default : {
      //    Element = <Input {...attributes} width = {attributes.maxLength + 'em'} />
      // }
    }
    elements.push(<FormControl>
            { 
               element.label ? 
                  <FormControlLabel>
                     <Label htmlFor={key} required={element.attributes.required} {...element.labelAttributes}>{element.label}</Label> 
                  </FormControlLabel>
               : null 
            }
            {/* { React.createElement(element.el, attributes, children) } */}
            <FormControlInput>
               {Element}
            </FormControlInput>
           </FormControl>);
  } //end for

  return elements;
 }
 
 return(
   <Form action="" onSubmit={e=>e.preventDefault()}>
      <FormTitle>{props.title}</FormTitle>
      {renderElements()}
      <FormActionControl>
         {props.actions ?props.actions(entity).map(a=>a) : null }
      </FormActionControl>
   </Form>
 )
}

EForm.propTypes = {
 
 /**
  * The UI Schema
  */
 uischema: PropTypes.object.isRequired,

 /**
  * A function that returns an array of Action components e.g. Button
  * @param {Object} entity The entity handled by the form.
  * @return {Array} Array of components e.g. Buttons.
  */
 actions: PropTypes.func

}

