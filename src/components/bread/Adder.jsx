import React, { Component } from 'react';
import Form from '../styled_elements/Form';
import Button from '../styled_elements/Button';
/**
 * Form used to add an Entity. Has a Save button. Requires onSubmit props to handle form submittion.
 * @param {object} props = {
 *  schema = REQUIRED, defines the input fields of the form.
 *  onSubmit = REQUIRED, A function that will handle the onSumbit event of the form.
 *  onChange = REQUIRED, A function that will handle the onChange events of the input elements.
 *  entity = [optional], the data to be displayed by the form by default.
 * }
 */
export default (props)=>{
  return(
    <Form action="" onSubmit={props.onSubmit}>
      {props.title?<div id="form-title">{props.title}</div>:null}
      <div>
       {
        Object.getOwnPropertyNames(props.schema).map((fieldName,i)=>{
         return (
          <div key={i} className="row">
           <div className="col s8 offset-s2" style={{zIndex:3}}>
             <label htmlFor={fieldName}>{fieldName.replace(fieldName[0],fieldName[0].toUpperCase())}</label> 
             <input id={fieldName} type="text" name={fieldName} onChange={props.onChange} defaultValue={props.entity?props.entity[fieldName]||'':''}/>
             {/* change the first letter to upperchase */}
           </div>
          </div>
         )
        })
       }
      </div>
     <div className="form-action-wrapper">
      <Button primary name="save">Save</Button>
     </div>
    </Form>
  )
}


class Adder extends React.Component{
  constructor(){
    super();
    this.state = {}
  }

  onChange(){}
  
  render(){
    return(
      <Form action="" onSubmit={props.onSubmit}>
        {props.title?<div id="form-title">{props.title}</div>:null}
        <div>
        {
          Object.getOwnPropertyNames(props.schema).map((fieldName,i)=>{
          return (
            <div key={i} className="row">
            <div className="col s8 offset-s2" style={{zIndex:3}}>
              <label htmlFor={fieldName}>{fieldName.replace(fieldName[0],fieldName[0].toUpperCase())}</label> 
              <input id={fieldName} type="text" name={fieldName} onChange={props.onChange} defaultValue={props.entity?props.entity[fieldName]||'':''}/>
              {/* change the first letter to upperchase */}
            </div>
            </div>
          )
          })
        }
        </div>
      <div className="form-action-wrapper">
        <Button primary name="save">Save</Button>
      </div>
      </Form>
    )
  }
}
  
  