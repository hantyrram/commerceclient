import React from 'react';
import Button from '@material-ui/core/Button';
import useForm from 'hooks/useForm';
import useAppState from 'appstore/useAppState';
import useApiRequest from 'api/useApiRequest';
import feature from 'features/feature';
//role.name = 35 chars max 3 chars min required
//role.label = 40 chars max 
//role.description = 60 chars max

let validate = (values)=>{
   // let error = {};

   if(!values.name) return { name : 'Role name is required.' }; // error


   if(!(/^[a-zA-Z]{3,35}/.test(values.name)) ) return {name: 'Role name can only contain [a-z A-Z -] and be 3-35 in length.'}; //error

   return null;
}

function Create(){
   
   let { dispatch } = useAppState();
   let createRole = useApiRequest('ROLE_CREATE',dispatch);
   let onSubmitCB = (formVal) => {
      console.log(formVal);
      // createRole({payload: role});
   }
      
   let { values: role, onChange, onSubmit, errors } = useForm({},onSubmitCB,validate);
  
   return(
      <form action="" class="grid-form" onSubmit={onSubmit}>         
         <div class="form-control">
            <label htmlFor="name" class="form-control-label">Role Name</label>
            <input 
               type="text" 
               name="name" 
               placeholder="Enter Role Name e.g. administrator" 
               class="form-control-input" 
               value={role.name}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.name}</span>}
         </div>
         <div class="form-control">
            <label htmlFor="label" class="form-control-label">Role Label</label>
            <input 
               type="text" 
               name="label" 
               class="form-control-input" 
               value={role.label}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.label}</span>}
         </div>
         <div class="form-control">
            <label htmlFor="description" class="form-control-label">Role Description</label>
            <input 
               type="text" 
               name="description" 
               class="form-control-input" 
               value={role.description}
               onChange={onChange}
               />
            {errors && <span class="form-input-error">{errors.defaultCurrency}</span>}
         </div>
         <div class="form-control-actions ">
            <Button className="form-control-action" type="submit" >Submit</Button>
         </div>         
      </form>
   )
   
}

export default feature(Create,{title: 'Create New Role'})
