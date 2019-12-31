/**
 * FetchAlles All Permissions.
 */

import {useContext} from 'react';
import axios from 'axios';
import {
   attribute_Create_Nok,
   attribute_Create_Ok,
   attribute_Create_Pending,
   attribute_Update_Nok,
   attribute_Update_Ok,
   attribute_Update_Pending,
   attribute_FetchAll_Nok,
   attribute_FetchAll_Ok,
   attribute_FetchAll_Pending,
} from './action_creators/attribute';
import StateContext from 'contexts/StateContext';
import { emit } from 'actionEvent';

export const useAttribute_Create = ()=>{
   
   let {dispatch} = useContext(StateContext);

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

export const useAttribute_Update = ()=>{
   
   let {dispatch} = useContext(StateContext);

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



export const useAttribute_FetchAll = ()=>{
   
   let {dispatch} = useContext(StateContext);

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