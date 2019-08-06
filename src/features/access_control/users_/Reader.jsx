import React,{useState,forwardRef} from 'react';
import EReader from '../../../comps/EBread/EReader';
import UserUiSchema from './UserUiSchema';

import {
} from '../../../apis';


/**
 * The component used to read and present a entity entity.
 * @typedef {Function} Roles.Reader
 * 
 */
export default mlh => {

   let entity;

   if(mlh.location.state.entity){
      entity = mlh.location.state.entity;
   }

   //onAdd must wait for the button click handler 
   return(
     <React.Fragment>
     <EReader 
      identifier="_id"
      uischema={UserUiSchema} 
      entity={entity} 
      onDelete={()=>{}} 
      
     />
     
    </React.Fragment>
    
    )
}