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
export default ({initialValues,onSubmitCallback,validate})=>{

   let [changedValues,setChangedValues] = useState({});
   let [values,setValues] = useState(initialValues);
   let [errors,setErrors] = useState();
   

   //
   //
   /** Sets form fields values if onChange is not sufficient to update the form field values.
    *  field = {key: value,key2:value} 
    * @typedef {function} useForm~setFormFieldValue
    * @param {Object} field - An object containing with keys equals to the form field name(s)
    * @param {Boolean} [triggerChange=true] - If true, changedValues will be set, else it will bypass 
    * updating changedValues. This is useful when using the form as viewer of ActiveTable's row data,
    * where in setFormFieldValue maybe used to dynamically change the contents of an already displayed
    * form but still able to utilize the correct value of changedValues. Default = true.
    */
   let setFormFieldValue = (field,triggerChange = true)=>{ 
      if(triggerChange == false){
         setValues({...values, ...field});
         return;
      }


      setChangedValues({...changedValues, ...field});
      setValues({...values, ...field});
      
   }

   let onChange = (e)=>{
      setChangedValues({...changedValues,[e.target.name]: e.target.value});
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
      onSubmitCallback({values,changedValues});
   }

   

   //changedValues - The object containing ONLY the fields that has changed
   return {values,onChange,onSubmit,errors,changedValues, setFormFieldValue}; 
   //use setFormFieldValue if you want to change the value of a field that depends on another field's value
   //if onChange is not sufficient, e.g. the value of the property depends on other 
   //input fields use case, Product inventory: where outOfStock changes the quantity property to 0
}