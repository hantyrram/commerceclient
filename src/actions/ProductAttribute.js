/**
 * FetchAlles All Permissions.
 */

import useAppStore from 'hooks/useAppStore';
import axios from 'axios';
import {emit} from 'actionEvent';
import types from '../types';

export const attribute_Create_Pending = ()=> ({type: types.ATTRIBUTE_CREATE_PENDING});
export const attribute_Create_Ok = (attribute)=> ({type: types.ATTRIBUTE_CREATE_OK, payload: attribute});
export const attribute_Create_Nok = (error)=> ({type: types.ATTRIBUTE_CREATE_NOK,payload: error});

export const attribute_Update_Pending = ()=> ({type: types.ATTRIBUTE_UPDATE_PENDING});
export const attribute_Update_Ok = (attribute)=> ({type: types.ATTRIBUTE_UPDATE_OK, payload: attribute});
export const attribute_Update_Nok = (error)=> ({type: types.ATTRIBUTE_UPDATE_NOK,payload: error});

export const attribute_FetchAll_Pending = ()=> ({type: types.ATTRIBUTE_FETCHALL_PENDING});
export const attribute_FetchAll_Ok = (attributes)=> ({type: types.ATTRIBUTE_FETCHALL_OK, payload: attributes});
export const attribute_FetchAll_Nok = (error)=> ({type: types.ATTRIBUTE_FETCHALL_NOK,payload: error});

export const attribute_AddTerm_Pending = ()=> ({type: types.ATTRIBUTE_ADDTERM_PENDING});
export const attribute_AddTerm_Ok = (term)=> ({type: types.ATTRIBUTE_ADDTERM_OK, payload: term});
export const attribute_AddTerm_Nok = (error)=> ({type: types.ATTRIBUTE_ADDTERM_NOK,payload: error});

export const attribute_DeleteTerm_Pending = ()=> ({type: types.ATTRIBUTE_DELETETERM_PENDING});
export const attribute_DeleteTerm_Ok = (term)=> ({type: types.ATTRIBUTE_DELETETERM_OK, payload: term});
export const attribute_DeleteTerm_Nok = (error)=> ({type: types.ATTRIBUTE_DELETETERM_NOK,payload: error});

export const useProductAttribute_Create = ()=>{
   
   let {dispatch} = useAppStore();

   return async function(attribute){
      console.log(attribute);
      try {
         dispatch(attribute_Create_Pending());
         let {data} = await axios.post(`/apiv1/catalog/attributes`,attribute);
         console.log(data);
         if(data.ok){
            dispatch(attribute_Create_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(attribute_Create_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export const useProductAttribute_Update = ()=>{
   
   let {dispatch} = useAppstore();

   return async function(attribute){
      try {
         dispatch(attribute_Update_Pending());
         emit('pending','Updating Attribute');
         let {data} = await axios.patch(`/apiv1/catalog/attributes`,attribute);
         console.log(data);
         if(data.ok){
            dispatch(attribute_Update_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(attribute_Update_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export const useProductAttribute_FetchAll = ()=>{
   
   let {dispatch} = useAppstore();

   return async function(attribute){
      console.log(attribute);
      try {
         dispatch(attribute_FetchAll_Pending());
         let {data} = await axios.get(`/apiv1/catalog/attributes`);
         console.log(data);
         if(data.ok){
            dispatch(attribute_FetchAll_Ok(data.resource));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(attribute_FetchAll_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export const useProductAttribute_AddTerm = ()=>{
   
   let {dispatch} = useAppstore();

   /**
    * @param {String} term - The term to add
    */
   return async function(attributeId, term){
      
      try {
         dispatch(attribute_AddTerm_Pending());
         console.log(attributeId);
         let {data} = await axios.patch(`/apiv1/catalog/attributes/${attributeId}/terms`,{ term });
         console.log(data);
         if(data.ok){
            dispatch(attribute_AddTerm_Ok({_id: attributeId, terms: [data.resource]}));
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(attribute_AddTerm_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}

export const useProductAttribute_DeleteTerm = ()=>{
   
   let {dispatch} = useAppstore();

   /**
    * @param {String} term - The term to add
    */
   return async function(attributeId, term){
      
      try {
         dispatch(attribute_DeleteTerm_Pending());
         console.log(attributeId);
         let {data} = await axios.delete(`/apiv1/catalog/attributes/${attributeId}/terms`,{data: {term}});
         console.log(data);
         if(data.ok){
            dispatch(attribute_DeleteTerm_Ok({_id: attributeId, terms: [term]}));//api won't respond with resource,no need
            if(data.message){
               emit('message',data.message);
            }
            return data.resource;
         }
         dispatch(attribute_DeleteTerm_Nok(data.error));
         emit('error',data.error);

      } catch (error) {
         console.log(error);
         dispatch({type:'CLIENT_ERROR',text:'Axios Error!'});
         emit('error',{type:'CLIENT_ERROR',text:'Axios Error!'});
      }
   }
}


