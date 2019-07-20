import React,{useState,forwardRef} from 'react';
import EBrowser from '../../../comps/EBread/EBrowser';
import EAdder from '../../../comps/EBread/EAdder';
import EReader from '../../../comps/EBread/EReader';
import EEditor from '../../../comps/EBread/EEditor';
import PermissionUISchema from '../../uischemas/Permission';
import FeatureTitle from '../../../comps/FeatureTitle';
import AddButton from '../../../comps/EBread/AddButton';


/**
 * The component used to read and present a Role entity.
 * @typedef {Function} Roles.Reader
 * 
 */
export default mlh => {

   let role = mlh.location.state.entity;

       //onAdd must wait for the button click handler 
   return(
     <React.Fragment>
     <EReader 
      identifier="name"
      UISchema={PermissionUISchema} 
      entity={role} 
      onDelete={()=>{}} 
     />
     
    </React.Fragment>
    
    )
}