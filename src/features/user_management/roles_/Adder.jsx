import React, { useState,useEffect } from 'react';
import EForm from '../../../comps/EBread/EForm';
import RoleUISchema from './UISchema';
import {
   role_add as createRole,
} from '../../../apis';



function Adder(mlh){

   const onSaveHandler = (formData)=>{
      (async ()=>{
         try {
            let artifact = await createRole(formData);
            console.log(artifact);
            mlh.history.replace(artifact.data.href,{entity: artifact.data.entity});
         } catch (error) {
            
         }
      })()
   }


   return(
      <EForm type="adder" uischema={RoleUISchema}  saveButtonCaption="Create New Role" onSave={onSaveHandler}/>
   )
}


Adder.propTypes = {

}

export default Adder;

