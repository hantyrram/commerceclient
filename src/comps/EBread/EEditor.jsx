import React, { Component } from 'react';
import EForm from './EForm';

export default function EEditor(props){
 //if there is a
 return(
  <EForm type="editor" 
   identifier={props.identifier}
   entity={props.entity} 
   UISchema={props.UISchema} 
   onSave={props.onSave} onDelete={props.onDelete}
  />
 )

}