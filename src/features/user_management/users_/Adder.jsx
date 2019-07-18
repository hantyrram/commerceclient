import React, { useState,useEffect } from 'react';
import UserUiSchema from './UserUiSchema';
import EForm from '../../../comps/EBread/EForm';
import {
   user_add as generateUser,
} from '../../../apis';



function Adder(mlh){

   const GENERATE_USER = 'Generate User For Employee';

   const [user,setUser] = useState(null);
   const [modifiedUiSchema,setModifiedUiSchema] = useState(UserUiSchema);
   
   
   useEffect(()=>{
      let newSchema = Object.assign({},modifiedUiSchema);
      for(let uiSchemaProp of Object.keys(newSchema)){
         
         if(uiSchemaProp === '_id'){
            continue;
         }

         delete newSchema[uiSchemaProp];
      }
   
      newSchema._id.label = 'Enter Employee Id';
      
      setModifiedUiSchema(newSchema);
   },[]);

   const onSaveHandler = (formData)=>{
      (async ()=>{
         try {
            let artifact = await generateUser(formData._id);
            console.log(artifact);
            mlh.history.replace(artifact.data.href,{entity: artifact.data.entity});
         } catch (error) {
            
         }
      })()
   }


   return(
      <EForm uischema={modifiedUiSchema} entity={user} type="adder" identifier="_id" saveButtonCaption={GENERATE_USER} onSave={onSaveHandler}/>
   )
}


Adder.propTypes = {

}

export default Adder;

