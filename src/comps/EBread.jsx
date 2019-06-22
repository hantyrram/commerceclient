import React, { useState,useEffect} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import EntityBrowser from './EntityBrowser';
import EFormAdd from './EFormAdd';
import EFormRead from './EFormRead';
import EBreadForm from './EBreadForm';
import './styles/eform.css';
import PropTypes from 'prop-types';
import { jsxAttribute } from '../../node_modules/@babel/types';
import { checkServerIdentity } from 'tls';

/**
 * EFormRead supports the Read functionality of BREAD.
 * @constructor
 * @param {Object} props - React.props
 * @param {Object} props.UISchema - The UISchema that describes the elements of the form.
 * @param {Entity} [props.Entity] - The Entity that is being presented by the Form.
 * @param {Entity} props.entity - The entity instance/object that is being presented by the Form.
 * @param {Number} [props.editorPath] - If 1 the Edit button is enabled.
 * @param {function} [props.onDelete] - If 1 the Delete button is enabled.
 * @param {string} props.identifier - Part of the entity that will be used as identifier. e.g _id
 */
export function EForm(props){

 const IDENTIFIER = props.identifier;

 const [entity,setEntity] = useState(props.entity ? Object.assign({},props.entity): null);

 useEffect(()=> {
  console.log(entity[IDENTIFIER] );
  console.log(props.entity[IDENTIFIER]);
  if(entity[IDENTIFIER] !== props.entity[IDENTIFIER]){
   setEntity(Object.assign({},props.entity));
  }
 },[entity,IDENTIFIER,props.entity]);
 
 if(!props.UISchema) return "No Schema";

 if(!entity) return "No Entity";//this will fail on type = add
 
 const renderEditButton = () => props.editorPath ? <Link className="action-button" to = {{pathname:props.editorPath.replace(":id",IDENTIFIER),state:{entity}}}> Edit </Link> : null;

 const renderDeleteButton = () => props.onDelete ? <button className="action-button"> Delete </button> : null;

 const renderSaveButton = ()=> props.onSave ? <button className="action-button">Save</button>:null;

 const readerActions = ()=> <div className="eform-actions" style={{textAlign:"right"}}>{[renderEditButton(),renderDeleteButton()]}</div>;

 const editorActions = ()=> [renderSaveButton(),renderDeleteButton()];

 const adderActions = () => [renderSaveButton()];

 let renderActions = null;
 //type reader,editor,adder
 switch(props.type){
  case 'reader': 
  renderActions = readerActions;
   break;
  case 'editor':
  renderActions = editorActions;
   break;
  default :
  renderActions = adderActions;
 }

 const onChange = e => console.log('Logging Change', e.target.value);

 return(
  <div id="eform-container" className="eform boxed">
  {
   Object.keys(props.UISchema).map( uiSchemaProp => { // key is the name of the property e.g. { username: {} } k = username
    
    let element = props.UISchema[uiSchemaProp]; //input

    let value = entity && entity[uiSchemaProp]? entity[uiSchemaProp] : null;

    let attributes = { ...element.attributes }; //add the onChange prop as additional attribute

    //the reason value is checked is value won't exist on type 'adder';
    if(props.type === 'editor') {
     attributes.onChange = onChange; //add onChange handler if editor
     if(value) attributes.defaultValue = value;
    }

    if(props.type === 'reader'){
     if(value) attributes.value = value; //makes readOnly
     attributes.readOnly = true;
    }

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
  {renderActions()}
 </div>
 
 )
}


export default function EBread(props) {
 
 const IDENTIFIER = props.identifier || "_id"; //use _id as default entity identifier,some entity does not have _id

 const {match,location,history} = props;

 const [entities,setEntities] = useState(Object.assign([],props.entities)); //pass this up when EBread is wrapped in a Feature, No Need to save state
 const [currentEntity,setCurrentEntity] = useState({});

 // useEffect(()=>{
 //  console.log(JSON.stringify(entities) === JSON.stringify(props.entities));
 // },[])
 const onSave = (entity) => {
  setEntities([...entities,entity]);//update to immediately reflect on entitybrowser
  props.onSave(entity);//delegate
 }


 const onRead = entity =>history.push(`${props.readerPath.replace(":identifier",entity[IDENTIFIER])}`,{entity});
 const onEdit = entity => history.push(`${props.editorPath.replace(":identifier",entity[IDENTIFIER])}`,{entity});
 const reader = mlh => <EForm type="reader" identifier={IDENTIFIER} UISchema={props.UISchema} entity={mlh.location.state.entity} editorPath={props.editorPath} onDelete={props.onDelete}/>
 const editor = mlh => <div> {JSON.stringify(mlh.location.state.entity)} </div>

 return(
  <div className="ebread boxed">
      <Switch>
       <Route path={props.addPath} exact render={mlh=>
        <EFormAdd UISchema={props.UISchema} onSave={onSave} {...mlh}/>} 
       /> 
       <Route path={props.editorPath} exact render={ editor}/> 
       <Route path={props.readerPath} exact render={ reader}/> 
      </Switch>
      <EntityBrowser 
        title="Users"
        identifier={IDENTIFIER}
        UISchema={props.UISchema} 
        entities={props.entities}  
        onEdit={onEdit} 
        onDelete={props.onDelete} 
        readPath={props.readerPath} 
        editPath={props.editorPath}
        addPath={props.addPath} 
        onRead={onRead} 
        />
  </div>
 )
}
