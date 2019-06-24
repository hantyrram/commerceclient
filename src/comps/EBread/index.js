import React, { useState, useReducer, useEffect} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import EntityBrowser from './EntityBrowser';
import EForm from './EForm';
import EAdder from './EAdder';
import EEditor from './EEditor';
import EReader from './EReader';
import './styles/eform.css';
import PropTypes from 'prop-types';


export default function EBread(props) {
 
 const IDENTIFIER = props.identifier || "_id"; //use _id as default entity identifier,some entity does not have _id

 const {history} = props;

 //payload = entity
 //state = entities
 const [state, dispatch] = useReducer(function(state,action){
  
  switch(action.type){
   case 'save': return [action.payload,...state];
   
   case 'browse': return [...state, ...action.payload];

   case 'delete': {
    if(state.length > 0){
     let i = state.findIndex( entity=> entity[IDENTIFIER] === action.payload[IDENTIFIER] );
     if(i !== -1){
      state.splice(i,1);
     }
    }
    return [...state]; 
   }

   default : return state;
  }
 },[]);


 useEffect(()=>{
  // if(JSON.stringify(props.entities) !== JSON.stringify(entities)){
  //  setEntities(props.entities); 
  // }
  dispatch({type:'browse',payload: props.entities});
 },[props.entities]);

 //middleware, we still have to delegate this to higher order component, used only on currently managed entities
 const onSave = (entity) => {
  console.log('Saving Entity',entity);
  dispatch({type:'save', payload:entity});
  //???delegate to feature props.onSave();
 }

 //middleware, we still have to delegate this to higher order component, used only on currently managed entities
 const onDelete = (entity)=>{
  console.log('Deleting Entity',entity);
  dispatch({type:'delete',payload:entity});
  //???delegate to feature, props.onDelete(entity);
 }

 const onRead = entity =>history.push(`${props.readerPath.replace(":identifier",entity[IDENTIFIER])}`,{entity});
 const onEdit = entity => history.push(`${props.editorPath.replace(":identifier",entity[IDENTIFIER])}`,{entity});

 const reader = mlh => 
 <EReader 
  identifier={IDENTIFIER} 
  UISchema={props.UISchema} 
  entity={mlh.location.state.entity} 
  editorPath={props.editorPath} 
  onDelete={onDelete} 
 />

 const editor = mlh => 
  <EEditor 
   UISchema={props.UISchema} 
   entity={mlh.location.state.entity} 
   onSave={onSave} onDelete={onDelete} 
  /> 

 const adder = mlh => <EAdder UISchema={props.UISchema} onSave={onSave} />

 return(
  <div className="ebread boxed">
      <Switch>
       <Route path={props.adderPath} exact render={ adder }/> 
       <Route path={props.editorPath} exact render={ editor}/> 
       <Route path={props.readerPath} exact render={ reader}/>    
      </Switch>
      <Route path={props.browserPath} render={()=> 
       <EntityBrowser 
         title="Users"
         identifier={IDENTIFIER}
         UISchema={props.UISchema} 
         entities={state}  
         onEdit={onEdit} 
         onDelete={onDelete} 
         readPath={props.readerPath} 
         editPath={props.editorPath}
         onRead={onRead} 
       /> } />      
  </div>
 )
}
