//handles state of the form
import React,{useState,useEffect} from 'react';

/**
 * @callback TypeDefs~validate - A function that contains validation logic of a given form.
 * @param {Object} values - The current values of a form to validate.
 */


/**
 * Hook to handle form states, and validation.
 * @param {Object} initialValues - The initial values of the form's state.
 * @param {function} onSubmitCallback - The function that will be called when the onSubmit function is invoked.
 * @param {TypeDefs~validate} validate - The validate function
 */
export default (initialValues,onSubmitCallback,validate)=>{

   let [values,setValues] = useState(initialValues);
   let [errors,setErrors] = useState();

   let onChange = (e)=>{
      setValues({...values, [e.target.name]: e.target.value});
   }

   let onSubmit = (e)=>{
      e.preventDefault();
      if(validate){
         let err = validate(values);
         if(err){
            setErrors(err);
            return; //don't call onSubmitCallback
         }
         setErrors(null); 
      }
      onSubmitCallback(values);
   }

   

   return {values,onChange,onSubmit,errors};
}